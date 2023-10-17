import React from 'react';
import { View, Text, Button,SafeAreaView,ImageBackground } from 'react-native';
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


  
  const sabahBackground=require('../assets/images/sabahBackground.png');
  return (
    <ImageBackground source={sabahBackground} resizeMode="center" style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Day Phase</Text>
      
      {/* Conditionally render events or the "nothing happened" message */}
      {nightEvents.length > 0 ? (
        nightEvents.map((event, index) => (
          <Text key={index}>{event}</Text>
        ))
      ) : (
        <Text>Nothing happened last night.</Text>
      )}

      <Button title="Ready" onPress={() => navigation.navigate('CountDown', { actions, roles, updatedPlayer })} />
    </SafeAreaView>
    </ImageBackground>
  );
  };
  
export default DayPhaseScreen;
