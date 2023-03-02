import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import Loading from "../Components/Loading";
import AddProfile from "./AddProfile";
import Profile from "./Profile";
import ProfileCard from "./ProfileCard";
import { useProfiles } from "./ProfileContext";

function ProfilesHome({ profiles, navigation }) {
  const [addProfileOpen, setAddProfileOpen] = useState(false);
  const { profilesDispatch } = useProfiles();

  const handleAddProfile = (newProfile) => {
    profilesDispatch({ type: "ADD_PROFILE", payload: newProfile });
  };

  // TODO: Create modal that opens and the user can add a name and select from a preset

  return (
    <View>
      <AddProfile visible={addProfileOpen} handleAddProfile={handleAddProfile} />
      <Appbar.Header>
        <Appbar.Content title="Profiles" />
        <Appbar.Action
          icon="plus"
          size={30}
          accessibilityLabel="Add Profile"
          accessibilityHint="Add a new dice rolling profile"
        />
      </Appbar.Header>
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
