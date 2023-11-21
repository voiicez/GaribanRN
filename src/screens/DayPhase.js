import React from 'react';
import { View, Text, Button,SafeAreaView,ImageBackground, Alert } from 'react-native';
import {useEffect,useState} from 'react'; 
import { useSelector } from 'react-redux';
import { setNavigatedFromMarket } from './navigationSlice';
import { useDispatch } from 'react-redux';
import { clearNightEvents } from './gameSlice';
import { addNightEvent } from './gameSlice';

// Inside DayPhaseScreen component
const DayPhaseScreen = ({ route, navigation }) => {
    const actions = route.params.actions;
    const roles = route.params.roles; 
    const dispatch = useDispatch();
    const { robberyOccurred } = route.params;
    const updatedPlayer=route.params.updatedPlayer;
    const navigatedFromMarket = useSelector(state => state.navigation.navigatedFromMarket);
    const nightEvents = useSelector(state => state.game.nightEvents);
    const [updatedRoles, setUpdatedRoles] = useState(roles);
    
    useEffect(() => {
      console.log("Day phase dispatch use effect çalışıyor.");
      dispatch(setNavigatedFromMarket(false));
      return () => {
        dispatch(clearNightEvents());
      };
  }, [dispatch]);

  useEffect(() => {
      const katilCanli=roles.some(player=>player.role==='Katil');
      if(!katilCanli){
        Alert.alert("oyun bitti!");
      }
    
}, []);

useEffect(() => {
  applyActions();
}, []);

const applyActions = () => {
  let tempRoles = [...roles];
  console.log("[DAY PHASE SCREEN] Starting applyActions function");

  // Önce 'save' eylemlerini işle
  actions.filter(action => action.type === 'save').forEach(action => {
    console.log("Processing save action:", action);
    processSaveAction(action, tempRoles);
  });

  // Sonra 'save' dışındaki diğer eylemleri işle
  actions.filter(action => action.type !== 'save').forEach(action => {
    console.log("Processing action:", action);

    switch (action.type) {
      case 'kill':
        processKillAction(action, tempRoles);
        break;
      case 'rob':
        processRobAction(action, tempRoles);
        break;
      default:
        console.log("Unknown action type:", action.type);
    }
  });

  console.log("[DAY PHASE SCREEN] Finished processing all actions. Updated roles:", tempRoles);
  setUpdatedRoles(tempRoles);
  // Update the state or context with the new roles
  // dispatch(updateRoles(tempRoles)); // Example dispatch to update roles in the global state
};

const processRobAction = (action, roles) => {
  const robber = action.player;
  const target = action.target;
  const robbedPlayerIndex = roles.findIndex(p => p.name === target);
  const robbedPlayer = roles[robbedPlayerIndex];
  const stolenCoins = robbedPlayer.coins;
  robbedPlayer.coins = 0;
  robber.coins += stolenCoins;
  roles[robbedPlayerIndex] = robbedPlayer;
  console.log(`${robber.name} robbed ${target}. Stolen coins: ${stolenCoins}`);
  dispatch(addNightEvent("Dün gece bir soygun yaşandı."));
};

const processKillAction = (action, roles) => {
  const killer = action.player;
  const target = action.target;
  const targetIndex = roles.findIndex(p => p.name === target);
  const targetPlayer=roles[targetIndex];
  if (targetIndex !== -1) {
    if(!targetPlayer.hasBuff)
    {  
      roles.splice(targetIndex, 1); 
    console.log(`${killer.name} killed ${target}.`);
    dispatch(addNightEvent("Dün gece bir cinayet işlendi. "+target +" hayatını kaybetti."));
  }else{
    targetPlayer.hasBuff=false;
    console.log(killer.name+" , "+target+" isimli oyuncuyu hedef aldı ama bir doktor onu korumuştu.");
  }
  
  }
  
};

const processSaveAction=(action,roles)=>{
  const target=action.target;
  const targetIndex=roles.findIndex(p=>p.name===target);
  savedPlayer=roles[targetIndex];
  savedPlayer.hasBuff=true;
  console.log(savedPlayer.name+" korundu. "+ savedPlayer.hasBuff);
}


  
  const sabahBackground=require('../assets/images/sabahBackground.png');
  return (
    <ImageBackground source={sabahBackground} resizeMode="center" style={{ flex: 1, backgroundColor: '#bfbebe' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 30 }}>Sabah Oldu</Text>
        </View>
  
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* Conditionally render events or the "nothing happened" message */}
          {nightEvents.length > 0 ? (
            nightEvents.map((event, index) => (
              <Text key={index}>{event}</Text>
            ))
          ) : (
            <Text>Dün Gece Bir Olay Yaşanmadı.</Text>
          )}
        </View>
  
        <View style={{ marginBottom: 20 }}>
          <Button title="Ready" onPress={() => navigation.navigate('CountDown', { actions, roles:updatedRoles, updatedPlayer })} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
  
  };
  
export default DayPhaseScreen;
