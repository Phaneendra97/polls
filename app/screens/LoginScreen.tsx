import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Modal, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LoginScreenProps } from "../types/navigation";
import { authentication, firestore } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { doc, getDoc } from 'firebase/firestore';

GoogleSignin.configure({
  webClientId: "YOUR_WEB_CLIENT_ID", // From Firebase console
});

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationModalVisible, setVerificationModalVisible] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendDisabled) {
      interval = setInterval(() => {
        setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendDisabled]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(authentication, email, password);
      const user = userCredential.user;
  
      if (user.emailVerified) {
        // Check if user profile exists in Firestore
        const userProfileDocRef = doc(firestore, 'users_profile', user.uid);
        const userProfileDoc = await getDoc(userProfileDocRef);
  
        if (userProfileDoc.exists()) {
          setLoggedInUser(user);
          navigation.navigate('Home');
        } else {
          setLoggedInUser(user);
          navigation.navigate('GettingStarted');
        }
      } else {
        console.log('Email not verified yet.');
        setVerificationModalVisible(true);
      }
    } catch (error: any) {
      console.error('Login Error:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(authentication, email, password);
      if (userCredential.user !== null && authentication.currentUser) {
        await sendEmailVerification(authentication.currentUser);
        setVerificationModalVisible(true);
        setResendDisabled(true);
        setResendCountdown(30);
        startResendCountdown();
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const startResendCountdown = () => {
    setResendDisabled(true);
    let countdown = 30;
    const interval = setInterval(() => {
      countdown--;
      setResendCountdown(countdown);
      if (countdown === 0) {
        clearInterval(interval);
        setResendDisabled(false);
      }
    }, 1000);
  };

  const handleResendVerification = async () => {
    try {
      if (!resendDisabled && authentication.currentUser) {
        await sendEmailVerification(authentication.currentUser);
        startResendCountdown();
      }
    } catch (error) {
      console.error("Resend Verification Error:", error);
    }
  };

  const handleCloseVerificationModal = () => {
    setVerificationModalVisible(false);
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(authentication, googleCredential);
      setLoggedInUser(userCredential.user);
      navigation.navigate("Home");
    } catch (error) {
      // Use type assertion to specify the type of error
      const typedError = error as { code?: string };
  
      if (typedError.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (typedError.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress already");
      } else if (typedError.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available or outdated");
      } else {
        console.error("Google Sign-In Error:", error);
      }
    }
  };
  

  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={[styles.container, windowWidth > 600 && styles.containerWide]}>
      <Text style={styles.title}>Poll Dance</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputRow}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <Button
            compact
            mode="text"
            style={{ alignSelf: "center" }}
            // onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot Password?
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={[styles.button, styles.signInButton]}
          >
            Sign In
          </Button>
          <Button
            mode="outlined"
            onPress={handleSignup}
            style={[styles.button, styles.signUpButton]}
          >
            Sign Up
          </Button>
        </View>
        <View style={styles.googleSignInContainer}>
          <Button
            mode="contained"
            onPress={signInWithGoogle}
            style={[styles.button, styles.googleSignInButton]}
            // icon={() => <Icon name="google" size={20} color="#4285F4" />}
          >
            Continue with Google
          </Button>
        </View>
      </View>

      <Modal
        animationType="slide"
        visible={verificationModalVisible}
        onRequestClose={handleCloseVerificationModal}
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            A verification email has been sent to your email address.
          </Text>
          <Text style={styles.modalText}>
            Please check your email and verify your account.
          </Text>
          <Button
            mode="outlined"
            onPress={handleResendVerification}
            disabled={resendDisabled}
            style={styles.resendButton}
          >
            {resendDisabled
              ? `Resend Verification (${resendCountdown}s)`
              : "Resend Verification"}
          </Button>
          <Button
            mode="contained"
            onPress={handleCloseVerificationModal}
            style={styles.doneButton}
          >
            Done
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  containerWide: {
    paddingHorizontal: "20%",
  },
  title: {
    marginBottom: 72,
    fontWeight: "bold",
    fontSize: 48,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  inputRow: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "transparent",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
  },
  signInButton: {
    backgroundColor: "#007AFF",
    borderWidth: 2,
  },
  signUpButton: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  googleSignInContainer: {
    marginTop: 16,
    width: "100%", // Make the button container full width
  },
  googleSignInButton: {
    width: "100%", // Make the button full width
    borderWidth: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 20,
  },
  modalText: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: "center",
    color: "#000",
  },
  resendButton: {
    marginBottom: 16,
  },
  doneButton: {
    width: "50%",
    marginTop: 16,
  },
});

export default LoginScreen;
