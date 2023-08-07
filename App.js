import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GirisEkrani from './src/screens/GirisEkrani';
import OyuncuEkrani from './src/screens/OyuncuEkrani';
import ReadyScreen from './src/screens/ReadyScreen';
import NightPhaseScreen from './src/screens/NightPhase';
import PlayerTurnScreen from './src/screens/PlayerTurnScreen';
import DayPhaseScreen from './src/screens/DayPhase';
import VotingPhaseScreen from './src/screens/VotingPhaseScreen';
import PlayerDetailScreen from './src/screens/PlayerDetailScreen';




const Stack = createStackNavigator();

export default function App() {
    return (
     
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Giris">
          <Stack.Screen name="Giris" component={GirisEkrani} />
          <Stack.Screen name="OyuncuEkrani" component={OyuncuEkrani} />
          <Stack.Screen name="Ready" component={ReadyScreen} />
          <Stack.Screen name="Night" component={NightPhaseScreen} />
          <Stack.Screen name="PlayerTurn" component={PlayerTurnScreen} />
          <Stack.Screen name="PlayerDetail" component={PlayerDetailScreen} />
          <Stack.Screen name="Day" component={DayPhaseScreen} />
          <Stack.Screen name="Vote" component={VotingPhaseScreen} />
          
          
          
          
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
  
