import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import DetailScreen from '@screens/DetailScreen';
import NotificationScreen from '@screens/NotificationScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Tab Navigator - Có bottom tabs */}
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator}
          options={{ headerShown: false }} // Ẩn header vì TabNavigator có header riêng
        />
        
        {/* Các màn hình KHÔNG có trong Tab - Chỉ có header */}
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen}
          options={{ title: 'Chi tiết' }}
        />
        
        <Stack.Screen 
          name="Notification" 
          component={NotificationScreen}
          options={{ title: 'Thông báo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}