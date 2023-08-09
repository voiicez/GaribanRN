import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VotingPhaseScreen = ({ navigation, route }) => {
  const [votes, setVotes] = useState(route.params.roles.map(() => 0));
  const roles = route.params.roles;
  const updatedPlayer=route.params.updatedPlayer;
  const castVote = (index) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  };

  const endVoting = () => {
    const maxVotes = Math.max(...votes);
    const eliminatedIndex = votes.indexOf(maxVotes);
    const eliminatedPlayer = roles[eliminatedIndex];
    // Navigate to the elimination screen with the eliminated player
    navigation.navigate('Elimination', { eliminatedPlayer, roles: roles.filter((_, i) => i !== eliminatedIndex),updatedPlayer });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Voting Phase</Text>
      {roles.map((player, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18 }}>{player.name}: {votes[index]} votes</Text>
          <Button title="Vote" onPress={() => castVote(index)} />
        </View>
      ))}
      <Button title="End Voting" onPress={endVoting} />
    </SafeAreaView>
  );
};

export default VotingPhaseScreen;
