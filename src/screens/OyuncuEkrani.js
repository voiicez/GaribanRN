import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Button,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const OyuncuEkrani = ({navigation}) => {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [roles, setRoles] = useState([]);

  const addPlayer = () => {
    if (playerName.trim() !== '') {
      if (players.includes(playerName)) {
        Alert.alert(
          "İsim Tekrarı", 
          "Bu isim daha önce seçilmiş, lütfen başka bir isim bul.", 
          [
            { text: "Tamam"},
            {
              text: "Bana bir isim bul",
              onPress: () => {
                const newName = getRandomName();
                setPlayerName(newName);
                
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        setPlayers([...players, playerName]);
        setPlayerName('');
      }
    }
};

  const startGame = () => {
    navigation.navigate('Ready', { players });
  };

  const getRandomName = () => {
    const names = ["Turşu", "Lastik", "Fıstık", "Limon", "Fırtına", "Seri Bıçak","Mantıklı","Şah Mat","Kedigöz","Ilık Su","Ürperti","Patates Fındık","Levye","Aşık","Optimus","Üstad","Salamcı","Simit","Deri Kapak","Cesur","Pilot","Sanrı","Lacivert","Kulak","Burun","Fazla","Turuncu","Parşomen","Tohum","Kekik"]; 
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Oyuncu Ekle</Text>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, marginRight: 10, padding: 5 }}
          placeholder="İsim girin..."
          value={playerName}
          onChangeText={setPlayerName}
        />
        <TouchableOpacity onPress={addPlayer} style={{ padding: 10, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>Ekle</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={{ fontSize: 18, marginBottom: 5 }}>{item}</Text>}
      />
      {players.length >= 4 && (
        <Button title="Oyuna Başla" onPress={startGame} />
      )}
    
    </SafeAreaView>
  );
};

export default OyuncuEkrani;
