import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import Loading from "../Components/Loading";
import Profile from "./Profile";
import ProfileCard from "./ProfileCard";
import { useProfiles } from "./ProfileContext";

function ProfilesHome({ profiles, navigation }) {
  return (
    <View>
      {profiles ? (
        profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            {...profile}
            handlePress={() => navigation.navigate(profile.id)}
          />
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

export default function Profiles() {
  const Stack = createStackNavigator();
  const { profiles } = useProfiles();

  return Boolean(profiles) ? (
    <Stack.Navigator initialRouteName="ProfileDashboard">
      <Stack.Screen name="ProfileDashboard" options={{ headerShown: false }}>
        {({ navigation }) => <ProfilesHome profiles={profiles} navigation={navigation} />}
      </Stack.Screen>
      {profiles.map((profile) => (
        <Stack.Screen key={profile.id} name={profile.id} options={{ title: profile.name }}>
          {() => <Profile profile={profile} />}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  ) : (
    <Loading />
  );
}
