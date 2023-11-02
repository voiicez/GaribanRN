import React from 'react';
import { View, Text, Button,SafeAreaView,ImageBackground, Alert } from 'react-native';
import {useEffect} from 'react'; 
import { useSelector } from 'react-redux';
import { setNavigatedFromMarket } from './navigationSlice';
import { useDispatch } from 'react-redux';
import { clearNightEvents } from './gameSlice';

// Inside DayPhaseScreen component
const DayPhaseScreen = ({ route, navigation }) => {
    const actions = route.params.actions;
    const roles = route.params.roles; 
    const dispatch = useDispatch();
    const { robberyOccurred } = route.params;
    const updatedPlayer=route.params.updatedPlayer;
    const navigatedFromMarket = useSelector(state => state.navigation.navigatedFromMarket);
    const nightEvents = useSelector(state => state.game.nightEvents);
    
    useEffect(() => {
      
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
          <Button title="Ready" onPress={() => navigation.navigate('CountDown', { actions, roles, updatedPlayer })} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
  
  };
  
export default DayPhaseScreen;
