import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MarketScreen = ({ navigation, route }) => {
  const player = route.params.player;
  const onPurchase = route.params.onPurchase;
  const roles = route.params.roles;
  const currentPlayerIndex=route.params.currentPlayerIndex;
  const actions=route.params.actions;
const robberyOccurred=route.params.robberyOccurred;
  const availableRoles = [
    { name: 'Hırsız', cost: 30 },
    { name: 'Katil', cost: 30 },
    { name: 'Gariban', cost: 30 },
  ];

  const otherItems = [
    { name: 'Ticket', cost: 100 },
    { name: 'Maymuncuk', cost: 10 },
    { name: 'Sargı Bezi', cost: 10 },
    { name: 'Kurbağa Sivilcesi', cost: 10 },
    { name: 'Şeker Reçeli', cost: 100 },
  ];
  const allTurnsUsed = roles.every((player) => player.turnCompleted);
  const isLastPlayerTurn = currentPlayerIndex === roles.length - 1;
  const purchaseItem = (item) => {
    if (player.coins >= item.cost) {
      // Make a copy of the player object
      const updatedPlayer = { ...player };
  
      // Update the player's coins
      updatedPlayer.coins -= item.cost;
  
      // Handle specific item effects
      if (updatedPlayer.role === 'Gariban' && availableRoles.includes(item)) {
        updatedPlayer.role = item.name; // Only update the role if purchasing a new role
      }
       if (item.name === 'Maymuncuk') {
        
        updatedPlayer.hasMaymuncuk=true;
        console.log('Updated player after purchasing Maymuncuk:', updatedPlayer);
      }
  
      // Update the roles array with the modified player object
      const updatedRoles = [...roles];
      updatedRoles[roles.findIndex(p => p.name === updatedPlayer.name)] = updatedPlayer;
  
      // Proceed to the next player's turn
      onPurchase(item,updatedPlayer);
      if(isLastPlayerTurn){
        navigation.navigate('Day', { actions, roles:updatedRoles,robberyOccurred,updatedPlayer });
      }
      else{
        navigation.navigate('PlayerTurn', { roles: updatedRoles }); // Pass the updated roles array
      }
      console.log("onPurchase çalıştı.");
      console.log("MarketScreen PlayerTurn screen ' e gönderiyor.")
      
    } else {
      // Handle insufficient funds
    }
  };
  
  
  
  

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Market</Text>
      {player.role === 'Gariban' && availableRoles.map((role, index) => (
        <Button key={index} title={`Buy ${role.name} (${role.cost} coins)`} onPress={() => purchaseItem(role)} />
      ))}
      {otherItems.map((item, index) => (
        <Button key={index} title={`Buy ${item.name} (${item.cost} coins)`} onPress={() => purchaseItem(item)} />
      ))}
    </SafeAreaView>
  );
};

export default MarketScreen;
