import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const OyuncuEkrani = ({navigation}) => {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [roles, setRoles] = useState([]);

  const addPlayer = () => {
    if (playerName.trim() !== '') {
      setPlayers([...players, playerName]);
      setPlayerName('');
    }
  };

  const startGame = () => {
    navigation.navigate('Ready', { players });
  };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Add Players</Text>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, marginRight: 10, padding: 5 }}
          placeholder="Enter player name"
          value={playerName}
          onChangeText={setPlayerName}
        />
        <TouchableOpacity onPress={addPlayer} style={{ padding: 10, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={{ fontSize: 18, marginBottom: 5 }}>{item}</Text>}
      />
      {players.length >= 4 && (
        <Button title="Start Game" onPress={startGame} />
      )}
      {roles.length > 0 && (
        <View>
          <Text style={{ fontSize: 20, marginTop: 20 }}>Assigned Roles:</Text>
          {roles.map((player, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>{player.name}: {player.role}</Text>
              <Button title="Use Ability" onPress={() => useAbility(player.role)} />
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default OyuncuEkrani;
