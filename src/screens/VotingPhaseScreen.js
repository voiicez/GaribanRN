import React, { useState } from 'react';
import { View, Text, Button,TouchableOpacity,Image,ScrollView,ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import cardImage from '../assets/images/votingCard.png';
const VotingPhaseScreen = ({ navigation, route }) => {
  const [votes, setVotes] = useState(route.params.roles.map(() => 0));
  const roles = route.params.roles;
  const updatedPlayer = route.params.updatedPlayer;
  const background=require('../assets/images/background.png');
  const castVote = (index) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  };

  const endVoting = () => {
    const maxVotes = Math.max(...votes);
    const eliminatedIndex = votes.indexOf(maxVotes);
    const eliminatedPlayer = roles[eliminatedIndex];
    navigation.navigate('Elimination', { eliminatedPlayer, roles: roles.filter((_, i) => i !== eliminatedIndex), updatedPlayer });
  };

  return (
    <ImageBackground source={background} resizeMode="contain" style={{ flex: 1,backgroundColor:'#bfbebe' }}>
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10,textAlign:'center' }}>Elemek istediğiniz oyuncuyu oylayın.</Text>
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {roles.map((player, index) => (
            <View key={index} style={{ width: '48%', marginBottom: 10, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => castVote(index)} style={{ position: 'relative' }}>
                <Image source={cardImage} style={{ width: 150, height: 150,shadowOpacity:1,shadowRadius:2,shadowColor:"#000" }} />
                <View style={{ position: 'absolute', bottom: 7, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18, color: 'white' }}>{player.name}</Text>
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginTop: 10 }}>{votes[index]}</Text>
            </View>
          ))}
        </View>
        <Button title="End Voting" onPress={endVoting} />
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default VotingPhaseScreen;