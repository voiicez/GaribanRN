import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const PlayerTurnScreen = ({ navigation, route }) => {
  const roles = route.params.roles;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [actions, setActions] = useState([]);
  const currentPlayer = roles[currentPlayerIndex];

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{currentPlayer.name}'s Turn</Text>
      <Button title="See The Detail" onPress={() => navigation.navigate('PlayerDetail', { player: currentPlayer, takeAction, passAction })} />
    </View>
  );
};

export default PlayerTurnScreen;
