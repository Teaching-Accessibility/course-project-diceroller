import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  // Eventually want to set profile at app launch, not have default in here
  const defaultProfile = {
    name: "Test Profile",
    // Create dictionary with functions correlating to the names
    preRollModifiers: ["Advantage", "Disadvantage", "Exploding"],
    postRollModifiers: [],
    savedRolls: [
      { id: 1, name: "Light crossbow", dice: ["1d20 + 8", "1d6 + 4"] },
      { id: 2, name: "Meteor Swarm", dice: ["20d6 fire", "20d6 bludgeoning"] },
      { id: 3, name: "Dexterity Save", dice: "1d20 + 4" },
    ],
    history: [],
  };
  const [profile, setProfile] = useState(defaultProfile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
