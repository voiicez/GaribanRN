import React from 'react';
import { View, Text, Button,SafeAreaView } from 'react-native';
import {useEffect} from 'react'; 
import { useSelector } from 'react-redux';
import { setNavigatedFromMarket } from './navigationSlice';
import { useDispatch } from 'react-redux';

// Inside DayPhaseScreen component
const DayPhaseScreen = ({ route, navigation }) => {
    const actions = route.params.actions;
    const roles = route.params.roles; 
    const dispatch = useDispatch();
    const { robberyOccurred } = route.params;
    const updatedPlayer=route.params.updatedPlayer;
    const navigatedFromMarket = useSelector(state => state.navigation.navigatedFromMarket);
    useEffect(() => {
      dispatch(setNavigatedFromMarket(false));
  }, [dispatch]);
    console.log(navigatedFromMarket)
    console.log('[DAYPHASE SCREEN] Roles in DayPhaseScreen:', roles);
    console.log('[DAYPHASE SCREEN] Updated Player in DayPhaseScreen:', updatedPlayer);

  
  
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>Day Phase</Text>
        {robberyOccurred ? (
          <Text>A robbery happened last night.</Text>
        ) : (
          <Text>Nothing unusual happened last night.</Text>
        )}
        <Button title="Ready" onPress={() => navigation.navigate('CountDown', { actions,roles,updatedPlayer })} />
      </SafeAreaView>
    );
  };
  
export default DayPhaseScreen;
