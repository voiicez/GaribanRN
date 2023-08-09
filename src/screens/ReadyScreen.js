import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
      coins: 30,
    }));

    setRoles(assignedRoles);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Game is Ready!</Text>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Hazır a bastığında oyun başlayacak. Oyun başladıktan sonra telefonu 
      ismi yazan oyuncuya verin.</Text>
      <Button title="Ready" onPress={() => navigation.navigate('Night', { roles })} />
    </SafeAreaView>
  );
};

export default ReadyScreen;
