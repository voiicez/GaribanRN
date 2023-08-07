import React from 'react';
import { View, Text, Button,SafeAreaView } from 'react-native';

const NightPhaseScreen = ({ navigation, route }) => {
    const roles = route.params.roles;
  
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>Night Phase</Text>
        <Button title="Ready" onPress={() => navigation.navigate('PlayerTurn', { roles: roles })} />
      </SafeAreaView>
    );
  };
  
export default NightPhaseScreen;
