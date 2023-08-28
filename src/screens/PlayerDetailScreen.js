import React from 'react';
import { View, Text, Button, Alert,ImageBackground,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { rolesConfig } from '../conf/rolesConfig';
import {useState} from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
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
  const [selectedPlayerToKill, setSelectedPlayerToKill] = useState(null);
  const otherPlayers = roles.filter(p => p.name !== player.name);
  const robberyOccurred=route.params.robberyOccurred;
  const updatedPlayer=route.params.updatedPlayer;
  const [decisions, setDecisions] = useState([]);


// PlayerDetailScreen
const goToMarket = () => {
  navigation.navigate('Market', { player, onPurchase: handlePurchaseAndTakeAction, roles,currentPlayerIndex,actions,robberyOccurred });
};

const handlePurchaseAndTakeAction = (item) => {
  console.log("PlayerDetailScreen handlePurchse çalışıyor...")
  handlePurchase(item); // Handle the purchase
 
};

const hirsizDecision = (selectedPlayerToRob) => {
  if (selectedPlayerToRob) {
    setDecisions(prev => [...prev, { action: 'rob', player: player.name, target: selectedPlayerToRob }]);
    navigation.goBack();
    takeAction();
  } else {
    Alert.alert('Aksiyonu uygulayacak birini seçmelisin.');
  }
};

const cinayetDecision = (selectedPlayerToKill) => {
  if (selectedPlayerToKill) {
    setDecisions(prev => [...prev, { action: 'kill', player: player.name, target: selectedPlayerToKill }]);
    navigation.goBack();
    takeAction();
  } else {
    Alert.alert('Aksiyonu uygulayacak birini seçmelisin.');
  }
};

const executeDecisions = () => {
  decisions.forEach(decision => {
    if (decision.action === 'rob') {
      const robbedPlayer = roles.find(p => p.name === decision.target);
      const hirsizPlayer = roles.find(p => p.name === decision.player);
      hirsizPlayer.coins += robbedPlayer.coins;
      robbedPlayer.coins = 0;
    } else if (decision.action === 'kill') {
      const index = roles.findIndex(p => p.name === decision.target);
      roles.splice(index, 1);
    }
  });
  setDecisions([]); // Clear decisions for the next round
};

const takeActions = (selectedPlayerToRob) => {
  
  if (player.role === 'Hırsız') {
    console.log(selectedPlayerToRob)
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
   navigation.goBack();
   takeAction();
   
   console.log(`Someone is Robbed, ${selectedPlayerToRob}. Stolen coins: ${stolenCoins}`);
      } 
      else 
      {
        Alert.alert('Maymuncuk olmadan soygun yapılamaz.');
        
      }
    } 
    else 
    {
      Alert.alert('Aksiyonu uygulayacak birini seçmelisin.');
    }
  }
  
};

const cinayetAction = (selectedPlayerToKill) => {
  if (selectedPlayerToKill) {
    const updatedRoles = roles.filter(p => p.name !== selectedPlayerToKill);
    // Optionally, you can update the state or any other logic here
    console.log(`${selectedPlayerToKill} has been eliminated.`);
    navigation.goBack();
    takeAction();
  } else {
    Alert.alert('Aksiyonu uygulayacak birini seçmelisin.');
  }
}
  


const hirsizBackground = require('../assets/images/hirsizBg.png');
const garibanBackground = require('../assets/images/garibanBg.jpg');

const renderContent = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.playerName}>{player.name}</Text>
    <Text style={styles.coinText}>{player.coins}</Text>
    <View style={styles.actionContainer}>
      {player.role === 'Hırsız' ? (
       
       <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start',zIndex:10 }}>
       <View> 
         <SelectList
           setSelected={(val) => hirsizDecision(val)}
           data={otherPlayers.map(p => ({ key: p.name, value: p.name }))}
           save="value"
           dropdownStyles={styles.dropdown}
           search={false}
           placeholder='Kurbanı seçin.'
           
         />
       </View>
       
     </View>
          
        
      ) : null} 
       {player.role === 'Katil' ? (
       
       <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start',zIndex:10 }}>
       <View> 
         <SelectList
           setSelected={(val) => cinayetAction(val)}
           data={otherPlayers.map(p => ({ key: p.name, value: p.name }))}
           save="value"
           dropdownStyles={styles.dropdown}
           search={false}
           placeholder='Kurbanı seçin.'
           
         />
       </View>
       
     </View>
          
        
      ) : null} 
        {player.role !== 'Gariban' && player.role==='Hırsız' &&(
          <Button title="Aksiyon Al" onPress={() => { takeActions(selectedPlayerToRob); }} />
        )}
        {player.role !== 'Gariban' && player.role==='Katil' && (
          <Button title="Aksiyon Al" onPress={() => { cinayetAction(selectedPlayerToKill); }} />
        )}
      
      <Button title="Pass" onPress={() => { navigation.goBack(); passAction(); }} />
      <Button title="Buy Something" onPress={goToMarket} />
     
      <Text style={styles.description}>{roleConfig?.description}</Text>
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
    marginTop: 500, // Adjust this value to position the UI elements below the square card
    alignItems: 'center',
    marginBottom:50,
    
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  robTextAbove:{
    fontSize:18,
  },
  dropdown:{
    backgroundColor:'gray',
    alignItems:'center',
    
    
  }
 
});
export default PlayerDetailScreen;
