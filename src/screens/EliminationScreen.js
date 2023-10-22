import React from 'react';
import { View, Text, Button,SafeAreaView, Alert } from 'react-native';

const EliminationScreen = ({ navigation, route }) => {
  const eliminatedPlayer = route.params.eliminatedPlayer;
  const roles = route.params.roles;
  const updatedPlayer=route.params.updatedPlayer;
  const katilCanli=roles.some(player=>player.role==='Katil');

  function handeClick(){
    if(!katilCanli){
      
      navigation.navigate('OyunSonu');
    }else
    {
      navigation.navigate('Night',{roles,updatedPlayer});
    }
  }
  
  

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{eliminatedPlayer.name} elendi! Rolü {eliminatedPlayer.role} idi.</Text>
      <Button title="OK" onPress={handeClick} />
    </SafeAreaView>
  );
};

export default EliminationScreen;
