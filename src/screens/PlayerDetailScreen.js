import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rolesConfig } from '../conf/rolesConfig';
const PlayerDetailScreen = ({ navigation, route }) => {
  const player = route.params.player;
  const takeAction = route.params.takeAction;
  const passAction = route.params.passAction;
  const nextPlayer = route.params.nextPlayer;
  const roles=route.params.roles;
  const handlePurchase = route.params.handlePurchase;
  const roleConfig = rolesConfig[player.role];

// PlayerDetailScreen
const goToMarket = () => {
  navigation.navigate('Market', { player, onPurchase: nextPlayer,roles });
};



 

return (
  <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 30, marginBottom: 20 }}>{player.name}</Text>
    <Text style={{ fontSize: 20, marginBottom: 20 }}>Role: {roleConfig.displayName}</Text>
    <Text style={{ fontSize: 20, marginBottom: 20 }}>Coin: {player.coins}</Text>
    {roleConfig.canTakeAction && (
      <Button title="Take Action" onPress={() => { navigation.goBack(); takeAction(); }} />
    )}
    <Button title="Pass" onPress={() => { navigation.goBack(); passAction(); }} />
    <Button title="Buy Something" onPress={goToMarket} />
    <Text style={{ fontSize: 16, marginTop: 10 }}>{roleConfig.description}</Text>
  </SafeAreaView>
);

};

export default PlayerDetailScreen;
