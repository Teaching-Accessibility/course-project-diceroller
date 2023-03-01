import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FAIcons from "react-native-vector-icons/FontAwesome5";

import AdvancedRoller from "./AdvancedRoller/AdvancedRoller";
import History from "./History/History";
import { ProfileContextProvider } from "./Profiles/ProfileContext";
import Profiles from "./Profiles/Profiles";
import Settings from "./Settings/Settings";
import SimpleRoller from "./SimpleRoller/SimpleRoller";
import { MD3LightTheme as DefaultTheme, Provider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

function App() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <ProfileContextProvider>
      <Provider theme={DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name="Simple Roller"
                component={SimpleRoller}
                options={{
                  tabBarLabel: "Basic",
                  tabBarIcon: ({ color }) => <FAIcons name="dice-d20" color={color} size={26} />,
                }}
              />
              <Tab.Screen
                name="Advanced Roller"
                component={AdvancedRoller}
                options={{
                  tabBarLabel: "Advanced",
                  tabBarIcon: ({ color }) => (
                    <MCIcons name="calculator-variant" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="History"
                component={History}
                options={{
                  tabBarLabel: "History",
                  tabBarIcon: ({ color }) => <MCIcons name="history" color={color} size={26} />,
                }}
              />
              <Tab.Screen
                name="Profiles"
                component={Profiles}
                options={{
                  tabBarLabel: "Profiles",
                  tabBarIcon: ({ color }) => <MCIcons name="account" color={color} size={26} />,
                }}
              />
              <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                  tabBarLabel: "Settings",
                  tabBarIcon: ({ color }) => <MCIcons name="cog" color={color} size={26} />,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </ProfileContextProvider>
  );
}

export default App;
