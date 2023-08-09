import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rolesConfig } from '../conf/rolesConfig';
import {useState} from 'react';
import { Picker } from '@react-native-picker/picker';
const PlayerDetailScreen = ({ navigation, route }) => {
  const player = route.params.player;
  const takeAction = route.params.takeAction;
  const passAction = route.params.passAction;
  const nextPlayer = route.params.nextPlayer;
  const roles=route.params.roles;
  const handlePurchase = route.params.handlePurchase;
  const roleConfig = rolesConfig[player.role];
  const currentPlayerIndex=route.params.currentPlayerIndex;
  const actions=route.params.actions;
  const [selectedPlayerToRob, setSelectedPlayerToRob] = useState(null);
  const otherPlayers = roles.filter(p => p.name !== player.name);
  const robberyOccurred=route.params.robberyOccurred;
  const updatedPlayer=route.params.updatedPlayer;

// PlayerDetailScreen
const goToMarket = () => {
  navigation.navigate('Market', { player, onPurchase: handlePurchaseAndTakeAction, roles,currentPlayerIndex,actions,robberyOccurred });
};

const handlePurchaseAndTakeAction = (item) => {
  console.log("PlayerDetailScreen handlePurchse çalışıyor...")
  handlePurchase(item); // Handle the purchase
 
};
console.log('Player in PlayerDetailScreen:', player);
const handleRobAction = () => {
  console.log('Has Maymuncuk:', player.hasMaymuncuk);
  if (selectedPlayerToRob) {
   
    if (player.hasMaymuncuk)
     {
 
 const robbedPlayerIndex = roles.findIndex(p => p.name === selectedPlayerToRob);
 const robbedPlayer = roles[robbedPlayerIndex];
 const stolenCoins = robbedPlayer.coins;
 robbedPlayer.coins = 0;
 player.coins += stolenCoins;
 player.hasMaymuncuk=false;
 const updatedRoles = [...roles];
 updatedRoles[robbedPlayerIndex] = robbedPlayer;
 updatedRoles[currentPlayerIndex] = player;
 console.log(`Someone is Robbed, ${selectedPlayerToRob}. Stolen coins: ${stolenCoins}`);
    } 
    else 
    {
      Alert.alert('Cannot rob without a Maymuncuk.');
    }
  } 
  else 
  {
    Alert.alert('No player selected to rob.');
  }
};
 

return (
  <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 30, marginBottom: 20 }}>{player.name}</Text>
    <Text style={{ fontSize: 20, marginBottom: 20 }}>Role: {roleConfig?.displayName}</Text>
    <Text style={{ fontSize: 20, marginBottom: 20 }}>Coin: {player.coins}</Text>
    {player.role === 'Hırsız' ? (
      <View>
        <Text>Select a player to rob:</Text>
        <Picker
          selectedValue={selectedPlayerToRob}
          onValueChange={(itemValue) => setSelectedPlayerToRob(itemValue)}
        >
          {otherPlayers.map((p, index) => (
            <Picker.Item key={index} label={p.name} value={p.name} />
          ))}
        </Picker>
        <Button title="Rob" onPress={handleRobAction} />
       
      </View>
    ) : (
      player.role !== 'Gariban' && (
        <Button title="Take Action" onPress={() => { navigation.goBack(); takeAction(); }} />
      )
    )}
    <Button title="Pass" onPress={() => { navigation.goBack(); passAction(); }} />
    <Button title="Buy Something" onPress={goToMarket} />
    <Text style={{ fontSize: 16, marginTop: 10 }}>{roleConfig?.description}</Text>
  </SafeAreaView>
);


};

export default PlayerDetailScreen;
