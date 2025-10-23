import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import SettingsScreen from '@screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

function CustomTabBar({ state, descriptors, navigation }) {
  // you can adjust sizes here
  const TAB_BAR_HEIGHT = 64;
  const CENTER_BUTTON_SIZE = 64;

  return (
    <View style={[styles.tabBarContainer, { height: TAB_BAR_HEIGHT }]}>
      {state.routes.map((route, index) => {
        const centerIndex = Math.floor(state.routes.length / 2);
        if (index === centerIndex) {
          return <View key={route.key} style={styles.tabSpace} />;
        }

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // simple icon mapping
        let iconName = 'ellipse-outline';
        if (route.name === 'Home') iconName = isFocused ? 'home' : 'home-outline';
        if (route.name === 'Profile') iconName = isFocused ? 'person' : 'person-outline';
        if (route.name === 'Settings') iconName = isFocused ? 'settings' : 'settings-outline';

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            key={route.key}
            activeOpacity={0.7}
          >
            <Ionicons name={iconName} size={24} color={isFocused ? '#fff' : '#ffffffaa'} />
            {/* optional label */}
            <Text style={[styles.tabLabel, { color: isFocused ? '#fff' : '#ffffffaa' }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Center floating button */}
      <View pointerEvents="box-none" style={styles.centerButtonWrapper}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.centerButton, { width: CENTER_BUTTON_SIZE, height: CENTER_BUTTON_SIZE, borderRadius: CENTER_BUTTON_SIZE / 2 }]}
          onPress={() => {
            // action khi bấm nút giữa:
            // 1) navigate tới Home:
            navigation.navigate('Home');
            // hoặc 2) mở modal: navigation.navigate('CreateModal');
          }}
        >
          <Ionicons name="home" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >

      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Tab.Screen name="Home" component={HomeScreen } options={{ title: 'HomeScreen' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#6A00FF', // purple bar like example
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // add shadow
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  tabSpace: {
    flex: 1,
  },
  tabButton: {
    flex: 1,
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    color: '#fff',
  },
  centerButtonWrapper: {
    position: 'absolute',
    top: -32, // lifts the floating button above the tab bar
    left: (width - 64) / 2, // center horizontally
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  centerButton: {
    backgroundColor: '#000', // black like your image
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff', // white border like example
    // shadow for iOS already in container; add here too for depth
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
