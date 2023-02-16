import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import AdvancedRoller from "./AdvancedRoller/AdvancedRoller";
import History from "./History/History";
import Home from "./Home";
import { ProfileContextProvider } from "./Profiles/ProfileContext";
import Profiles from "./Profiles/Profiles";
import Settings from "./Settings/Settings";
import SimpleRoller from "./SimpleRoller/SimpleRoller";

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <ProfileContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Simple Roller" component={SimpleRoller} />
          <Stack.Screen name="Advanced Roller" component={AdvancedRoller} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Profiles" component={Profiles} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileContextProvider>
  );
}

export default App;
