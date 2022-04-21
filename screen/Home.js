import * as React from 'react';
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

