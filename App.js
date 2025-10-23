import React from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import AppNavigator from "./src/navigation/AppNavigator";
import TabNavigator from "./src/navigation/TabNavigator";
import GlobalLoading from "./src/components/GlobalLoading";
import GlobalAlert from "./src/components/GlobalAlert";
import GlobalWebView from "./src/components/GlobalWebView";
import GlobalToast from "./src/components/GlobalToast";
import GlobalBottomSheet from "./src/components/GlobalBottomSheet";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
          backgroundColor={Platform.OS === "android" ? "#ffffff" : undefined}
          translucent={Platform.OS === "android" ? false : undefined}
          hidden={false}
        />
        <AppNavigator />
        <GlobalLoading />
        <GlobalAlert />
        <GlobalWebView />
        <GlobalToast />
        <GlobalBottomSheet />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
