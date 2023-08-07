import React, { useState, useEffect } from 'react';
import { View, Text, Button,SafeAreaView } from 'react-native';

const CountdownScreen = ({ navigation, route }) => {
  const [timeRemaining, setTimeRemaining] = useState(180); // 180 seconds = 3 minutes
  const roles = route.params.roles;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000);

    if (timeRemaining <= 0) {
      clearInterval(timer);
      navigation.navigate('Vote', { roles });
    }

    return () => clearInterval(timer); // Clear the timer when the component is unmounted
  }, [timeRemaining, navigation, roles]);

  const skipCountdown = () => {
    navigation.navigate('Vote', { roles });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Discussion Time</Text>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>{Math.floor(timeRemaining / 60)}:{timeRemaining % 60 < 10 ? '0' : ''}{timeRemaining % 60} remaining</Text>
      <Button title="Skip" onPress={skipCountdown} />
    </SafeAreaView>
  );
};

export default CountdownScreen;
