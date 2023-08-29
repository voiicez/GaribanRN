import React, { useState,useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rolesConfig } from '../conf/rolesConfig';
const PlayerTurnScreen = ({ navigation, route }) => {
  const roles = route.params.roles;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [actions, setActions] = useState([]);
  const currentPlayer = roles[currentPlayerIndex];
  const [playersTurnCompleted, setPlayersTurnCompleted] = useState(Array(roles.length).fill(false));
  
  const [updatedRoles, setUpdatedRoles] = useState(roles);


  const handlePurchase = (item) =>
   {
    console.log("PlayerTurnScreen handlePurchase: Currentplayer ():"+currentPlayerIndex)
    nextPlayer();
  };

  const takeAction = (newAction) => {
    console.log(newAction) //Buraya geliyor
    setActions(prevActions => [...prevActions, newAction]);
    nextPlayer();
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
      console.log("herkes turu tamamladı.");
      //setCurrentPlayerIndex(0); 
      setPlayersTurnCompleted(Array(roles.length).fill(false)); 
      applyActions();
      navigation.navigate('Day', { actions, roles });
    } else {
      if (currentPlayerIndex < roles.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      } else {
        //setCurrentPlayerIndex(0); 
      }
    }
  };
  
  const applyActions = () => {
    let tempRoles = [...updatedRoles];
    actions.forEach(action => {
      if (action.type === 'rob') {
        const robber = action.player;
        const target = action.target;
        const robbedPlayerIndex = roles.findIndex(p => p.name === target);
        const robbedPlayer = roles[robbedPlayerIndex];
        const stolenCoins = robbedPlayer.coins;
        robbedPlayer.coins = 0;
        robber.coins += stolenCoins;
        const updatedRoles = [...roles];
        updatedRoles[robbedPlayerIndex] = robbedPlayer;
        console.log(`${robber.name} robbed ${target}. Stolen coins: ${stolenCoins}`);
      } if (action.type === 'kill') {
        
 const killer=action.player;
 const target=action.target;
       tempRoles = tempRoles.filter(p => p.name !== target);
       console.log(`${killer.name} killed ${target}.`);
      }

      setUpdatedRoles(tempRoles);
    })};



  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{currentPlayer.name}'s Turn</Text>
      <Button title="See The Detail" onPress={() => navigation.navigate('PlayerDetail', { player: currentPlayer, takeAction, passAction,handlePurchase,nextPlayer,roles,currentPlayerIndex,actions })} />
    </SafeAreaView>
  );
};

export default PlayerTurnScreen;
