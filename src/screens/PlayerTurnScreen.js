import React, { useState,useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rolesConfig } from '../conf/rolesConfig';
import { useSelector } from 'react-redux';
import { setNavigatedFromMarket } from './navigationSlice';

const PlayerTurnScreen = ({ navigation, route }) => {
  const roles = route.params.roles;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [actions, setActions] = useState([]);
  const currentPlayer = roles[currentPlayerIndex];
  const [playersTurnCompleted, setPlayersTurnCompleted] = useState(Array(roles.length).fill(false));
  const [roundEnded, setRoundEnded] = useState(false);
  const navigatedFromMarket = useSelector(state => state.navigation.navigatedFromMarket);
  const [updatedRoles, setUpdatedRoles] = useState(roles);


  const handlePurchase = (item) =>
   {
    console.log("PlayerTurnScreen handlePurchase: Currentplayer ():"+currentPlayerIndex)
    nextPlayer();
  };

  const takeAction = (newAction) => {
    console.log(newAction);
    setActions(prevActions => {
        const updatedActions = [...prevActions, newAction];
        console.log("[PLAYERTURN SCREEN] Updated actions array:", updatedActions);
        if (currentPlayerIndex === roles.length - 1) { // Check if it's the last player
            applyActions(updatedActions);  // Apply the actions immediately
        }
        return updatedActions;
    });
    moveNext();
};
  
  const moveNext = () => {
    if (currentPlayerIndex < roles.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
        endRound();
    }
};  
useEffect(() => {
  if (roundEnded &&!navigatedFromMarket) {
    console.log('[PLAYERTURNSCREEN] navigating to the day screen from player turn screen.');
    
    
    navigation.navigate('Day', { actions, roles: updatedRoles });
    
    setRoundEnded(false); // Reset for the next round
  }
}, [roundEnded, updatedRoles]);


const endRound = () => {
  console.log("[PLAYERTURN SCREEN] endRound is being called for player:", currentPlayer.name);
  applyActions();
  setCurrentPlayerIndex(0);
  setPlayersTurnCompleted(Array(roles.length).fill(false));
  setRoundEnded(true);
  
  
};

  const passAction = () => {
    setActions([...actions, { player: currentPlayer, action: 'passed' }]);
    nextPlayer();
  };

  const nextPlayer = () => {
    console.log("nextPlayer fonksiyonu çalışıyor...");
    const updatedTurnsCompleted = [...playersTurnCompleted];
    updatedTurnsCompleted[currentPlayerIndex] = true;
    setPlayersTurnCompleted(updatedTurnsCompleted);
    if (updatedTurnsCompleted.every(turnCompleted => turnCompleted)) {
        endRound();
    } else {
        moveNext();
    }
};
  
const applyActions = () => {
  let tempRoles = [...updatedRoles];
  console.log("[PLAYERTURN SCREEN] Starting applyActions function");

  for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      console.log("Checking action type for:", action);

      if (action.type === 'rob') {
          console.log("Processing rob action for:", action.player.name);
          const robber = action.player;
          const target = action.target;
          const robbedPlayerIndex = roles.findIndex(p => p.name === target);
          const robbedPlayer = roles[robbedPlayerIndex];
          const stolenCoins = robbedPlayer.coins;
          robbedPlayer.coins = 0;
          robber.coins += stolenCoins;
          tempRoles[robbedPlayerIndex] = robbedPlayer;
          console.log(`${robber.name} robbed ${target}. Stolen coins: ${stolenCoins}`);
      } else if (action.type === 'kill') {
          console.log("Processing kill action for:", action.player.name);
          const killer = action.player;
          const target = action.target;
          tempRoles = tempRoles.filter(p => p.name !== target);
          console.log(`${killer.name} killed ${target}.`);
      } else {
          console.log("Unknown action type:", action.type);
      }
  }

  console.log("[PLAYERTURN SCREEN] Finished processing all actions. Updated roles:", tempRoles);
  setUpdatedRoles(tempRoles);
};






  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{currentPlayer.name}'s Turn</Text>
      <Button title="See The Detail" onPress={() => navigation.navigate('PlayerDetail', { player: currentPlayer, takeAction, passAction,handlePurchase,nextPlayer,roles,currentPlayerIndex,actions,moveNext })} />
    </SafeAreaView>
  );
};

export default PlayerTurnScreen;
