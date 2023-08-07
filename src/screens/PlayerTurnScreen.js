import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlayerTurnScreen = ({ navigation, route }) => {
  const roles = route.params.roles;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [actions, setActions] = useState([]);
  const currentPlayer = roles[currentPlayerIndex];
  console.log('Roles:', roles);
  console.log('Current Player Index:', currentPlayerIndex);
  console.log('Current Player:', currentPlayer);

  const handlePurchase = (item) => {
    // Update the current player's role and coins
    if (roles[currentPlayerIndex].role === 'Gariban' && item.name) {
      roles[currentPlayerIndex].role = item.name;
    }
    roles[currentPlayerIndex].coins -= item.cost; // Use the cost property from the item object

    // Proceed to the next player's turn
    nextPlayer();
  };

  const takeAction = () => {
    setActions([...actions, { player: currentPlayer, action: 'took action' }]);
    nextPlayer();
  };

  const passAction = () => {
    setActions([...actions, { player: currentPlayer, action: 'passed' }]);
    nextPlayer();
  };

  const nextPlayer = () => {
    if (currentPlayerIndex < roles.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setCurrentPlayerIndex(0); // Reset the index to 0 for the next night phase
      applyActions(actions);
      navigation.navigate('Day', { actions, roles }); // Navigate to the next phase
    }
  };

 

  const applyActions = (actions) => {
    actions.forEach((action) => {
      console.log(`${action.player.name} (${action.player.role}) ${action.action}.`);
      // Apply the action here (e.g., update the game state based on the action)
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{currentPlayer.name}'s Turn</Text>
      <Button title="See The Detail" onPress={() => navigation.navigate('PlayerDetail', { player: currentPlayer, takeAction, passAction,handlePurchase,nextPlayer,roles })} />
    </SafeAreaView>
  );
};

export default PlayerTurnScreen;
