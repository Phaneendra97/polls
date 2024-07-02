import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

interface Country {
  code: string;
  name: string;
  dialCode: string;
}

interface CountryPickerProps {
  onSelect: (country: Country) => void;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  // Add more countries as needed
];

const CountryPicker: React.FC<CountryPickerProps> = ({ onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    onSelect(country);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.selectedCountry}>
        <Text>{selectedCountry ? `${selectedCountry.name} (${selectedCountry.dialCode})` : 'Select Country'}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={countries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => handleCountrySelect(item)}
              >
                <Text>{`${item.name} (${item.dialCode})`}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedCountry: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  countryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
});

export default CountryPicker;
