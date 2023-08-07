import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const VotingPhaseScreen = ({ route, navigation }) => {
    const [votes, setVotes] = useState({});
    const roles = route.params.roles;
  
    const castVote = (playerName) => {
      setVotes({ ...votes, [playerName]: (votes[playerName] || 0) + 1 });
    };
  
    const finishVoting = () => {
      // Find the player with the most votes
      const eliminatedPlayer = Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b));
      // Remove the eliminated player from the roles
      const remainingRoles = roles.filter((player) => player.name !== eliminatedPlayer);
      // Navigate to the next phase or screen, passing the remaining roles
      navigation.navigate('NextPhase', { roles: remainingRoles });
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>Voting Phase</Text>
        {roles.map((player, index) => (
          <Button key={index} title={`Vote ${player.name}`} onPress={() => castVote(player.name)} />
        ))}
        <Button title="Finish Voting" onPress={finishVoting} />
      </View>
    );
  };
  
  export default VotingPhaseScreen;
  