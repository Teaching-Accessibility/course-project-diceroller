import React from "react";
import { Text, View } from "react-native";
import ProfileCard from "./ProfileCard";
import { useProfiles } from "./ProfileContext";

export default function Profiles() {
  const { profiles } = useProfiles();
  return (
    <View>
      {profiles ? (
        profiles.map((profile) => <ProfileCard key={profile.id} {...profile} />)
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
