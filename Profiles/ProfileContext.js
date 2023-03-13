import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

const ProfileContext = createContext();

const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error getting data:", error);
  }
};
const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

const reducer = (state, action) => {
  let profiles;
  switch (action.type) {
    // Initial load
    case "INIT":
      return action.payload;
    case "ADD_PROFILE":
      profiles = [...state, { ...action.payload, history: [], id: uuid() }];
      storeData("profiles", profiles);
      return profiles;
    case "UPDATE_PROFILE":
      // {profile}
      profiles = state.map((profile) =>
        profile.id === action.payload.id ? action.payload : profile
      );
      storeData("profiles", profiles);
      return profiles;
    case "REMOVE_PROFILE":
      profiles = state.filter((profile) => profile.id !== action.payload.id);
      storeData("profiles", profiles);
      return profiles;
    case "HISTORY_PUSH":
      // {roll, profileId}
      profiles = state.map((profile) => {
        if (profile.id === action.payload.profileId) {
          return {
            ...profile,
            history: [...profile.history, { ...action.payload.roll, id: uuid() }],
          };
        } else {
          return profile;
        }
      });
      storeData("profiles", profiles);
      return profiles;
    case "HISTORY_CLEAR":
      // { profileId}
      profiles = state.map((profile) => {
        if (profile.id === action.payload.profileId) {
          return { ...profile, history: [] };
        } else {
          return profile;
        }
      });
      storeData("profiles", profiles);
      return profiles;
    case "ROLL_ADD":
      // {profileId, roll}
      profiles = state.map((profile) => {
        if (profile.id === action.payload.profileId) {
          return {
            ...profile,
            savedRolls: [...profile.savedRolls, { ...action.payload.roll, id: uuid() }],
          };
        } else {
          return profile;
        }
      });
      storeData("profiles", profiles);
      return profiles;
    case "ROLL_UPDATE":
      // {rollId, profileId, roll}
      profiles = state.map((profile) => {
        if (profile.id === action.payload.profileId) {
          return {
            ...profile,
            savedRolls: profile.savedRolls.map((roll) =>
              roll.id === rollId ? action.payload.roll : roll
            ),
          };
        } else {
          return profile;
        }
      });
      storeData("profiles", profiles);
    case "ROLL_REMOVE":
      // {rollId, profileId}
      profiles = state.map((profile) => {
        if (profile.id === action.payload.profileId) {
          return {
            ...profile,
            savedRolls: profile.savedRolls.filter((roll) => roll.id !== action.payload.rollId),
          };
        } else {
          return profile;
        }
      });
      storeData("profiles", profiles);
      return profiles;

    default:
      throw `Unknown profiles action type: ${action.type}`;
  }
};

// Eventually want to set profile at app launch, not have default in here
const defaultProfile = {
  id: "13",
  name: "Test Profile",
  system: "D&D 5e",
  dice: ["d20", "d12", "d10", "d8", "d6", "d4", "d100", "flat"],
  // Create dictionary with functions correlating to the names
  // preRollModifiers: ["Advantage", "Disadvantage", "Exploding"],
  // postRollModifiers: [],
  savedRolls: [
    { id: 1, name: "Light crossbow", dice: "1d20 + 8" },
    { id: 2, name: "Meteor Swarm", dice: "20d6 + 20d6" },
    { id: 3, name: "Dexterity Save", dice: "1d20 + 4" },
  ],
  history: [],
};

export const ProfileContextProvider = ({ children }) => {
  useEffect(() => {
    const initProfiles = async () => {
      // Uncomment, reload, then re-comment below line to update saved defaultProfile
      // await storeData("profiles", [defaultProfile]);
      let profiles = await getData("profiles");
      // If nothing stored, store it
      if (profiles === null) {
        await storeData("profiles", [defaultProfile]);
        profiles = await getData("profiles");
      }
      // currentProfile is a single string of a profile's id
      let currentProfile = await getData("currentProfile");
      if (currentProfile === null) {
        await storeData("currentProfile", defaultProfile.id);
        currentProfile = await getData("currentProfile");
      }
      profilesDispatch({ type: "INIT", payload: profiles });
      setCurrentProfile(currentProfile);
      return profiles;
    };

    initProfiles();
  }, []);

  const [currentProfile, setCurrentProfile] = useState();
  const [profiles, profilesDispatch] = useReducer(reducer, null);
  const profile = profiles?.find((profile) => profile.id === currentProfile);

  const switchCurrentProfile = (id) => {
    if (id !== profile?.id) {
      setCurrentProfile(id);
      storeData("currentProfile", id);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, profilesDispatch, profiles, switchCurrentProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => useContext(ProfileContext);
