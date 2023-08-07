import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rolesConfig } from '../conf/rolesConfig';
const PlayerTurnScreen = ({ navigation, route }) => {
  const roles = route.params.roles;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [actions, setActions] = useState([]);
  const currentPlayer = roles[currentPlayerIndex];
  const [chosenPlayerToRob, setChosenPlayerToRob] = useState(null);
  
  const handlePurchase = (item) => {
    // Update the current player's role and coins
    if (roles[currentPlayerIndex].role === 'Gariban' && item.name) {
      roles[currentPlayerIndex].role = item.name;
    }
    roles[currentPlayerIndex].coins -= item.cost; // Use the cost property from the item object

    // Proceed to the next player's turn
    nextPlayer();
  };
  const updatePassiveAbilities = () => {
    roles.forEach((player) => {
      const roleConfig = rolesConfig[player.role];
      if (roleConfig && roleConfig.passiveAbility) {
        roleConfig.passiveAbility(player);
      }
    });
  };
  
  const [chosenPlayerToKill, setChosenPlayerToKill] = useState(null); // Store the chosen player's information

const takeAction = () => {
  const roleConfig = rolesConfig[currentPlayer.role];
  if (roleConfig && roleConfig.activeAbility) {
    roleConfig.activeAbility(currentPlayer, roles, setChosenPlayerToKill); // Trigger the active ability of the player's role
  }
  setActions([...actions, { player: currentPlayer, action: 'took action' }]);
  nextPlayer(); // Proceed to the next player's turn
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
      if(action.player.role="Hırsız")
      console.log("Soydu orospi");
      updatePassiveAbilities();
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
