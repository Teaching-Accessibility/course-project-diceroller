import {createContext, useContext, useState} from 'react';

const ProfileContext = createContext();

export const ProfileContextProvider = ({children}) => {
  // Eventually want to set profile at app launch, not have default in here
  const defaultProfile = {name: 'Test Profile'};
  const [profile, setProfile] = useState(defaultProfile);

  return (
    <ProfileContext.Provider value={{profile, setProfile}}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
