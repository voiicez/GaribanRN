import React from 'react';
import { View, Text, Button,SafeAreaView } from 'react-native';
import {useEffect} from 'react'; 
// Inside DayPhaseScreen component
const DayPhaseScreen = ({ route, navigation }) => {
    const actions = route.params.actions;
    const roles = route.params.roles; 
    const { robberyOccurred } = route.params;
    const updatedPlayer=route.params.updatedPlayer;

  
  
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
