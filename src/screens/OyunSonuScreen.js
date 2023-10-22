import React from 'react';
import { View, Text, Button,SafeAreaView, Alert } from 'react-native';

const OyunSonuScreen = ({ navigation, route }) => {

  function handeClick(){
   navigation.navigate('Giris');
  }
  
  

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Katil öldü, hırsız kaçamadı. Oyun Garibanların oldu!</Text>
      <Button title="Tekrar" onPress={handeClick} />
    </SafeAreaView>
  );
};

export default OyunSonuScreen;
