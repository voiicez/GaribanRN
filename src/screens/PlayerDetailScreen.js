import React from 'react';
import { View, Text, Button, Alert,ImageBackground,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rolesConfig } from '../conf/rolesConfig';
import {useState} from 'react';
import { Picker } from '@react-native-picker/picker';
import { yellow100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const PlayerDetailScreen = ({ navigation, route }) => {
  const player = route.params.player;
  const takeAction = route.params.takeAction;
  const passAction = route.params.passAction;
  const nextPlayer = route.params.nextPlayer;
  const roles=route.params.roles;
  const handlePurchase = route.params.handlePurchase;
  const roleConfig = rolesConfig[player.role];
  const currentPlayerIndex=route.params.currentPlayerIndex;
  const actions=route.params.actions;
  const [selectedPlayerToRob, setSelectedPlayerToRob] = useState(null);
  const otherPlayers = roles.filter(p => p.name !== player.name);
  const robberyOccurred=route.params.robberyOccurred;
  const updatedPlayer=route.params.updatedPlayer;

// PlayerDetailScreen
const goToMarket = () => {
  navigation.navigate('Market', { player, onPurchase: handlePurchaseAndTakeAction, roles,currentPlayerIndex,actions,robberyOccurred });
};

const handlePurchaseAndTakeAction = (item) => {
  console.log("PlayerDetailScreen handlePurchse çalışıyor...")
  handlePurchase(item); // Handle the purchase
 
};
console.log('Player in PlayerDetailScreen:', player);
const handleRobAction = () => {
  console.log('Has Maymuncuk:', player.hasMaymuncuk);
  if (selectedPlayerToRob) {
   
    if (player.hasMaymuncuk)
     {
 
 const robbedPlayerIndex = roles.findIndex(p => p.name === selectedPlayerToRob);
 const robbedPlayer = roles[robbedPlayerIndex];
 const stolenCoins = robbedPlayer.coins;
 robbedPlayer.coins = 0;
 player.coins += stolenCoins;
 player.hasMaymuncuk=false;
 const updatedRoles = [...roles];
 updatedRoles[robbedPlayerIndex] = robbedPlayer;
 updatedRoles[currentPlayerIndex] = player;
 console.log(`Someone is Robbed, ${selectedPlayerToRob}. Stolen coins: ${stolenCoins}`);
    } 
    else 
    {
      Alert.alert('Cannot rob without a Maymuncuk.');
    }
  } 
  else 
  {
    Alert.alert('No player selected to rob.');
  }
};
const hirsizBackground = require('../assets/images/hirsizBg.png');
const garibanBackground = require('../assets/images/garibanBg.jpg');
const renderContent = () => (
  
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={styles.playerName}>{player.name}</Text>
    <Text style={styles.coinText}>{player.coins}</Text>
    <View style={styles.actionContainer}>
    {player.role === 'Hırsız' ? (
      <View>
        
        <Picker
          selectedValue={selectedPlayerToRob}
          onValueChange={(itemValue) => setSelectedPlayerToRob(itemValue)}
          
        >
          {otherPlayers.map((p, index) => (
            <Picker.Item key={index} label={p.name} value={p.name} />
          ))}
        </Picker>
        <Text>Soymak istediğiniz oyuncuyu listeden seçin.</Text>
        <Button title="Rob" onPress={handleRobAction} />
       
      </View>
    ) : (
      player.role !== 'Gariban' && (
        <Button title="Take Action" onPress={() => { navigation.goBack(); takeAction(); }} />
      )
    )}
    <Button title="Pass" onPress={() => { navigation.goBack(); passAction(); }} />
    <Button title="Buy Something" onPress={goToMarket} />
    <Text style={{ fontSize: 16, marginTop: 10 }}>{roleConfig?.description}</Text>
    </View>
  </SafeAreaView>
  
);
if (player.role === 'Hırsız') {
  return (
    <ImageBackground source={hirsizBackground} resizeMode="contain" style={{ flex: 1 }}>
      {renderContent()}
    </ImageBackground>
  );
} 
if(player.role ==='Gariban'){
  return (
    <ImageBackground source={garibanBackground} resizeMode="contain" style={{ flex: 1 }}>
      {renderContent()}
    </ImageBackground>
  );
}
else {
  return renderContent();
}


};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerName: {
    position:'absolute',
    top:80,
    fontSize: 30,
    marginBottom: 20,
  },
  coinText: {
    position: 'absolute', // Position it absolutely
    top: 135, // Adjust this value to position the coin text inside the circle
    left: 50, // Adjust this value to position the coin text inside the circle
    fontSize: 30,
    
  },
  actionContainer: {
    marginTop: 350, // Adjust this value to position the UI elements below the square card
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
 
});
export default PlayerDetailScreen;
