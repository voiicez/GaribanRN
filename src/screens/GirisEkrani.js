import React, { startTransition, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,SafeAreaView,Image, ImageBackground } from 'react-native';


const GirisEkrani = ({ navigation }) => 
{
  var Sound=require('react-native-sound');


  var whoosh = new Sound('theme.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
  
    // Play the sound with an onEnd callback
    whoosh.setVolume(0.1);
    whoosh.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
  const girisBackground=require('../assets/images/giris.jpg');
  return (
    <ImageBackground source={girisBackground} resizeMode="center" style={{ flex: 1, backgroundColor: '#bfbebe' }}>
    <SafeAreaView style={styles.container}>
      
     
      
      <TouchableOpacity onPress={() => {
        navigation.navigate('OyuncuEkrani');
        //
        }} style={styles.playButton}>
          
        <Text style={styles.playButtonText}>Oyna</Text>
        
      </TouchableOpacity>
      <Text style={styles.description}>Köydeki en zengin gariban olma mücadelesi!</Text>
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom:45
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
