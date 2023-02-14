import React from 'react';
import {Text, View, Button} from 'react-native';

export default function Home({navigation}) {
  return (
    <View>
      <Text>Home Page</Text>
      <Button
        title="Simple Roller"
        onPress={() => navigation.navigate('Simple Roller')}
      />
      <Button
        title="Advanced Roller"
        onPress={() => navigation.navigate('Advanced Roller')}
      />
      <Button title="History" onPress={() => navigation.navigate('History')} />
      <Button
        title="Profiles"
        onPress={() => navigation.navigate('Profiles')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}
