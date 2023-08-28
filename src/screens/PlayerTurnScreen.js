import React, { useState,useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rolesConfig } from '../conf/rolesConfig';
const PlayerTurnScreen = ({ navigation, route }) => {
  const roles = route.params.roles;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [actions, setActions] = useState([]);
  const currentPlayer = roles[currentPlayerIndex];
  const [chosenPlayerToRob, setChosenPlayerToRob] = useState(null);
  const [playersTurnCompleted, setPlayersTurnCompleted] = useState(Array(roles.length).fill(false));
  const robberyOccurred = actions.some(action => action.type === 'rob');

  const handlePurchase = (item) =>
   {
    console.log("PlayerTurnScreen handlePurchase: Currentplayer ():"+currentPlayerIndex)
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
  const takeAction = () => {
    nextPlayer();
  };
  

  const passAction = () => {
    setActions([...actions, { player: currentPlayer, action: 'passed' }]);
    nextPlayer();
  };

  const nextPlayer = () => {
    console.log("nextPlayer fonksiyonu çalışıyor...");
    // Mark the current player's turn as completed
    const updatedTurnsCompleted = [...playersTurnCompleted];
    updatedTurnsCompleted[currentPlayerIndex] = true;
    setPlayersTurnCompleted(updatedTurnsCompleted);
  
    // Check if all players have completed their turns
    if (updatedTurnsCompleted.every(turnCompleted => turnCompleted)) {
      // All players have taken their turns, end the night phase
      console.log("herkes turu tamamladı.");
      
      setCurrentPlayerIndex(0); // Reset for the next night phase
      setPlayersTurnCompleted(Array(roles.length).fill(false)); // Reset turns completed
      navigation.navigate('Day', { actions, roles,robberyOccurred });
      
    } else {
      if (currentPlayerIndex < roles.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      } else {
        setCurrentPlayerIndex(0); // Reset the index to 0 for the next night phase
      }
    }
  };
  

 



  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{currentPlayer.name}'s Turn</Text>
      <Button title="See The Detail" onPress={() => navigation.navigate('PlayerDetail', { player: currentPlayer, takeAction, passAction,handlePurchase,nextPlayer,roles,currentPlayerIndex,actions,robberyOccurred })} />
    </SafeAreaView>
  );
};

export default PlayerTurnScreen;
