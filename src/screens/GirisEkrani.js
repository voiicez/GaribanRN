import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GirisEkrani = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gariban</Text>
      <Text style={styles.description}>Köydeki en zengin gariban olma mücadelesi!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('OyuncuEkrani')} style={styles.playButton}>
        <Text style={styles.playButtonText}>Oyna</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  playButton: {
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  playButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default GirisEkrani;
