import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { GettingStartedScreenProps } from '../types/navigation';
import CountryPicker from '../utils/shared_components/CountryPicker';
import { authentication, firestore } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

const GettingStartedScreen: React.FC<GettingStartedScreenProps> = ({
  navigation,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<{
    code: string;
    name: string;
    dialCode: string;
  } | null>(null);

  const handleCountrySelect = (country: { code: string; name: string; dialCode: string }) => {
    setSelectedCountry(country);
  };

  const handleNextStep = async () => {
    // Validate inputs here if necessary
    if (firstName.trim() === '' || lastName.trim() === '' || phoneNumber.trim() === '') {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    try {
      // Construct data object to be saved
      const userData = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        dialCode: selectedCountry ? selectedCountry.dialCode : '',
        countryName: selectedCountry ? selectedCountry.name : '',
        email: authentication.currentUser ? authentication.currentUser.email : '',
      };

      // Save data to Firestore under 'users_profile' collection with user UID as document ID
      await setDoc(doc(firestore, 'users_profile', authentication.currentUser!.uid), userData);

      // Navigate to next screen or perform any other action after successful save
      navigation.navigate('Home'); // Replace with your next step screen's name
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save user data. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        {/* First Name */}
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          label="First Name"
          style={styles.input}
          placeholder="Enter your first name"
        />
      </View>
      <View style={styles.inputContainer}>
        {/* Last Name */}
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          label="Last Name"
          style={styles.input}
          placeholder="Enter your last name"
        />
      </View>
      <View style={styles.inputContainer}>
        {/* Country Picker */}
        <View style={{ flex: 1, marginRight: 8 }}>
          <CountryPicker onSelect={handleCountrySelect} />
        </View>
        {/* Phone Number */}
        <TextInput
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
          label="Phone Number"
          style={[styles.input, { flex: 3 }]} // Adjust flex to allocate space
          placeholder="Enter your phone number"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleNextStep}>
          Next
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 24,
    alignSelf: 'center',
    width: '50%', // Adjust width as needed
  },
});

export default GettingStartedScreen;
