import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Modal, Text } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import { LoginScreenProps } from "../types/navigation";
import { authentication } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { loggedInUser, setLoggedInUser } = useAuth(); // Access loggedInUser state and setLoggedInUser function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationModalVisible, setVerificationModalVisible] =
    useState(false);
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
      // Check if user is logged in with correct credentials
      const userCredential = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        setLoggedInUser(user); // Update loggedInUser state in AuthContext
        navigation.navigate("Home");
      } else {
        console.log("Email not verified yet.");
        setVerificationModalVisible(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );
      if (userCredential.user !== null && authentication.currentUser) {
        setLoggedInUser(userCredential.user); // Update loggedInUser state in AuthContext
        await sendEmailVerification(authentication.currentUser);
        setVerificationModalVisible(true);
        setResendDisabled(true); // Disable resend initially when modal opens
        setResendCountdown(30); // Reset countdown
        startResendCountdown(); // Start countdown timer
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const startResendCountdown = () => {
    setResendDisabled(true); // Disable resend button initially
    let countdown = 30;
    const interval = setInterval(() => {
      countdown--;
      setResendCountdown(countdown);
      if (countdown === 0) {
        clearInterval(interval);
        setResendDisabled(false); // Enable resend button after countdown ends
      }
    }, 1000);
  };

  const handleResendVerification = async () => {
    try {
      if (!resendDisabled && authentication.currentUser) {
        await sendEmailVerification(authentication.currentUser);
        startResendCountdown(); // Restart countdown
      }
    } catch (error) {
      console.error("Resend Verification Error:", error);
    }
  };

  const handleCloseVerificationModal = () => {
    setVerificationModalVisible(false);
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
            onPress={() => navigation.navigate("ForgotPassword")}
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
      </View>

      {/* Verification Modal */}
      <Modal
        animationType="slide"
        visible={verificationModalVisible}
        onRequestClose={handleCloseVerificationModal}
        transparent={false} // Ensure modal is not transparent
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
    paddingHorizontal: "20%", // Adjust padding for wide screens
  },
  title: {
    marginBottom: 72,
    fontWeight: "bold",
    fontSize: 48,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400, // Limit width for better readability on wide screens
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
    backgroundColor: "#007AFF", // Adjust colors as needed
    borderWidth: 2,
  },
  signUpButton: {
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Change to the desired background color
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 20,
  },
  modalText: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: "center",
    color: "#000", // Change to the desired text color
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
