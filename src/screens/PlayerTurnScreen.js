import React, { useState,useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rolesConfig } from '../conf/rolesConfig';
import { useSelector } from 'react-redux';
import { setNavigatedFromMarket } from './navigationSlice';
import { useDispatch } from 'react-redux';
import { addNightEvent } from './gameSlice';


const PlayerTurnScreen = ({ navigation, route }) => {
  const roles = route.params.roles;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [actions, setActions] = useState([]);
  const currentPlayer = roles[currentPlayerIndex];
  const [playersTurnCompleted, setPlayersTurnCompleted] = useState(Array(roles.length).fill(false));
  const [roundEnded, setRoundEnded] = useState(false);
  const navigatedFromMarket = useSelector(state => state.navigation.navigatedFromMarket);
  const [updatedRoles, setUpdatedRoles] = useState(roles);
  const dispatch = useDispatch();
  const [hasNavigated, setHasNavigated] = useState(false);



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
  setUpdatedRoles(roles);
  if (roundEnded && !navigatedFromMarket && navigation.isFocused()) {
    console.log('[PLAYERTURNSCREEN] navigating to the day screen from player turn screen.');
    navigation.navigate('Day', { actions, roles: updatedRoles });
    setRoundEnded(false); // Reset for the next round
  }
  else{
    console.log("Round Ended Log:  "+ roundEnded+" navigatedFromMarket Log: " + navigatedFromMarket)
  }
}, [roundEnded, navigatedFromMarket, navigation,roles,updatedRoles]);





const endRound = () => {
  console.log("[PLAYERTURN SCREEN] endRound is being called for player:", currentPlayer.name);
  
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
  //Şimdilik dayPhase' e taşındı.
};






  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{currentPlayer.name}'s Turn</Text>
      <Button title="See The Detail" onPress={() => navigation.navigate('PlayerDetail', { player: currentPlayer, takeAction, passAction,handlePurchase,nextPlayer,roles,currentPlayerIndex,actions,moveNext })} />
    </SafeAreaView>
  );
};

export default PlayerTurnScreen;
