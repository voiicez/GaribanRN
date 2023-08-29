import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MarketScreen = ({ navigation, route }) => {
  const player = route.params.player;
  const onPurchase = route.params.onPurchase;
  const roles = route.params.roles;
  const currentPlayerIndex=route.params.currentPlayerIndex;
  const actions=route.params.actions;

  const availableRoles = [
    { name: 'Doktor', cost: 30 },
    { name: 'Gariban', cost: 30 },
  ];

  const otherItems = [
    { name: 'Ticket', cost: 100 },
    { name: 'Maymuncuk', cost: 10 },
    { name: 'Sargı Bezi', cost: 10 },
    { name: 'Cinayet Aleti', cost: 10 },
    { name: 'Kurbağa Sivilcesi', cost: 10 },
    { name: 'Şeker Reçeli', cost: 100 },
  ];
  const allTurnsUsed = roles.every((player) => player.turnCompleted);
  const isLastPlayerTurn = currentPlayerIndex === roles.length - 1;
  const purchaseItem = (item) => {
    if (player.coins >= item.cost) {
      const updatedPlayer = { ...player };
      updatedPlayer.coins -= item.cost;

      if (updatedPlayer.role === 'Gariban' && availableRoles.includes(item)) {
        updatedPlayer.role = item.name; // Only update the role if purchasing a new role
      }
       if (item.name === 'Maymuncuk') {
        
        updatedPlayer.hasMaymuncuk=true;
        console.log('Updated player after purchasing Maymuncuk:', updatedPlayer);
      }
      if(item.name==='Cinayet Aleti'){
        updatedPlayer.hasCinayetAleti=true;
        console.log("Oo! Birileri bir şeyler peşinde.");
      }
  
      
      const updatedRoles = [...roles];
      updatedRoles[roles.findIndex(p => p.name === updatedPlayer.name)] = updatedPlayer;
  
      
      onPurchase(item,updatedPlayer);
      if(isLastPlayerTurn){
        navigation.navigate('Day', { actions, roles:updatedRoles,updatedPlayer });
      }
      else{
        navigation.navigate('PlayerTurn', { roles: updatedRoles }); // Pass the updated roles array
      }
     
      
    } else {
      Alert.alert("Yeterli paraya sahip değilsin.");
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
