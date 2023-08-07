import React from 'react';
import { View, Text, Button } from 'react-native';

// Inside DayPhaseScreen component
const DayPhaseScreen = ({ route, navigation }) => {
    const actions = route.params.actions;
    const roles = route.params.roles; 
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>Day Phase</Text>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>What happened last night:</Text>
        {actions.map((action, index) => (
          <Text key={index} style={{ fontSize: 18, marginBottom: 5 }}>{action.player.name}</Text>
        ))}
        <Button title="Ready" onPress={() => navigation.navigate('Vote', { actions,roles })} />
      </View>
    );
  };
  
export default DayPhaseScreen;
