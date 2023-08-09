import React from 'react';
import { View, Text, Button,SafeAreaView } from 'react-native';

const EliminationScreen = ({ navigation, route }) => {
  const eliminatedPlayer = route.params.eliminatedPlayer;
  const roles = route.params.roles;
  const updatedPlayer=route.params.updatedPlayer;
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{eliminatedPlayer.name} is eliminated!</Text>
      <Button title="OK" onPress={() => navigation.navigate('Night', { roles,updatedPlayer })} />
    </SafeAreaView>
  );
};

export default EliminationScreen;
