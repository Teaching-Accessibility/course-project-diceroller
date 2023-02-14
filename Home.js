import React from 'react';
import {Text, View, Button} from 'react-native';

const NavigationButton = ({navigation, name}) => {
  // Replace with custom button so that we can increase height
  return (
    <View style={{flex: 1}}>
      <Button
        title={name}
        onPress={() => navigation.navigate(name)}
        style={{height: '100%', width: '100%'}}
      />
    </View>
  );
};

export default function Home({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'column',
        height: '100%',
      }}>
      <NavigationButton navigation={navigation} name="Simple Roller" />
      <NavigationButton navigation={navigation} name="Advanced Roller" />
      <NavigationButton navigation={navigation} name="History" />
      <NavigationButton navigation={navigation} name="Profiles" />
      <NavigationButton navigation={navigation} name="Settings" />
    </View>
  );
}
