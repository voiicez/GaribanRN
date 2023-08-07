import React from 'react';
import { View, Text, Button } from 'react-native';

const PlayerDetailScreen = ({ navigation, route }) => {
  const player = route.params.player;
  const takeAction = route.params.takeAction;
  const passAction = route.params.passAction;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{player.name}</Text>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Role: {player.role}</Text>
      <Button title="Take Action" onPress={() => { navigation.goBack(); takeAction();}} />
      <Button title="Pass" onPress={() => { navigation.goBack();passAction();  }} />
    </View>
  );
};

export default PlayerDetailScreen;
