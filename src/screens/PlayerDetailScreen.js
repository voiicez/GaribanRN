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
  


// PlayerDetailScreen
const goToMarket = () => {
  navigation.navigate('Market', { player, onPurchase: handlePurchaseAndTakeAction, roles,currentPlayerIndex,actions,robberyOccurred });
};

const handlePurchaseAndTakeAction = (item) => {
  console.log("PlayerDetailScreen handlePurchse çalışıyor...")
  handlePurchase(item); // Handle the purchase
 
};


const robAction = (selectedPlayerToRob) => {
 
  if (player.role === 'Hırsız') {

    if (selectedPlayerToRob) {
      
      if (player.hasMaymuncuk)
       {
   
        const newAction = { player: player, type: 'rob', target: selectedPlayerToRob };
        player.hasMaymuncuk=false;
        navigation.goBack();
        takeAction(newAction);
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
    if(player.hasCinayetAleti){
      const newAction = { player: player, type: 'kill', target: selectedPlayerToKill};
        player.hasCinayetAleti=false;
        navigation.goBack();
        takeAction(newAction);
    }else{
      Alert.alert("Cinayet aleti olmadan öldüremezsin!");
    }
   
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
           setSelected={(val) => setSelectedPlayerToRob(val)}
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
           setSelected={(val) => setSelectedPlayerToKill(val)}
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
          <Button title="Aksiyon Al" onPress={() => { robAction(selectedPlayerToRob); }} />
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
