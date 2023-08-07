import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MarketScreen = ({ navigation, route }) => {
  const player = route.params.player;
  const onPurchase = route.params.onPurchase;
  const roles = route.params.roles; // Make sure to receive the roles from the previous screen

  const availableRoles = [
    { name: 'Büyücü', cost: 30 },
    { name: 'Polis', cost: 30 },
    { name: 'Baytar', cost: 30 },
  ];

  const otherItems = [
    { name: 'Ticket', cost: 100 },
    { name: 'Maymuncuk', cost: 10 },
    { name: 'Sargı Bezi', cost: 10 },
    { name: 'Kurbağa Sivilcesi', cost: 10 },
    { name: 'Şeker Reçeli', cost: 100 },
  ];

  const purchaseItem = (item) => {
    if (player.coins >= item.cost) {
      // Update player's coins
      player.coins -= item.cost;
  
      // Handle specific item effects
      if (availableRoles.includes(item)) {
        player.role = item.name;
      } else if (item.name === 'Ticket') {
        // Handle the ticket purchase here (e.g., update player's inventory or apply specific effects)
      }
  
      // Proceed to the next player's turn
      onPurchase(item);
      
      
      console.log('Navigating with roles:', roles);
      navigation.navigate('PlayerTurn', { roles });
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
