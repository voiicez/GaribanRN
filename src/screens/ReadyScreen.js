import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const ReadyScreen = ({ navigation, route }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const players = route.params.players;
    assignRoles(players);
  }, [route.params.players]);

  const assignRoles = (players) => {
    // Define the roles based on the number of players
    const roles = ['Hırsız', 'Katil'];
    while (roles.length < players.length) {
      roles.push('Gariban');
    }

    // Shuffle the roles
    roles.sort(() => Math.random() - 0.5);

    // Shuffle the players
    const shuffledPlayers = [...players];
    shuffledPlayers.sort(() => Math.random() - 0.5);

    // Assign the shuffled roles to the shuffled players
    const assignedRoles = shuffledPlayers.map((player, index) => ({
      name: player,
      role: roles[index],
    }));

    setRoles(assignedRoles);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Game is Ready!</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Introductions and game settings go here.</Text>
      {roles.map((player, index) => (
        <Text key={index} style={{ fontSize: 18, marginBottom: 5 }}>{player.name}: {player.role}</Text>
      ))}
      <Button title="Ready" onPress={() => navigation.navigate('Night', { roles })} />
    </View>
  );
};

export default ReadyScreen;
