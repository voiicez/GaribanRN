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
import EliminationScreen from './src/screens/EliminationScreen';
import CountdownScreen from './src/screens/CountDownScreen';
import MarketScreen from './src/screens/MarketScreen';
import TestScreen from './src/screens/TestScreen';




const Stack = createStackNavigator();

export default function App() {
    return (
     
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Giris">
          <Stack.Screen name="Giris" component={GirisEkrani} />
          <Stack.Screen name="OyuncuEkrani" component={OyuncuEkrani} />
          <Stack.Screen name="Ready" component={ReadyScreen} />
          <Stack.Screen name="Night" component={NightPhaseScreen} options={{ headerShown:false,gestureEnabled:false}} />
          <Stack.Screen name="PlayerTurn" component={PlayerTurnScreen} options={{ headerShown:false,gestureEnabled:false}} />
          <Stack.Screen name="Market" component={MarketScreen} options={{ headerShown:true,gestureEnabled:true}} />
          <Stack.Screen name="PlayerDetail" component={PlayerDetailScreen} options={{ headerShown:false,gestureEnabled:false}} />
          <Stack.Screen name="Day" component={DayPhaseScreen} options={{ headerShown:false,gestureEnabled:false}} />
          <Stack.Screen name="CountDown" component={CountdownScreen} options={{ headerShown:false,gestureEnabled:false}} />
          <Stack.Screen name="Vote" component={VotingPhaseScreen} options={{ headerShown:false,gestureEnabled:false}} />
          <Stack.Screen name="Elimination" component={EliminationScreen} options={{ headerShown:false,gestureEnabled:false}} />
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
  
