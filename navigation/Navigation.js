import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Course,
  Class,
  ClassDetail,
  
} from "../screens";

const Stack = createStackNavigator();

export default function NavigationApp(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Course"
       
      >
        <Stack.Screen
          name="Course"
          component={Course}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Class"
          component={Class}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ClassDetail"
          component={ClassDetail}
          options={{ headerShown: false }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
