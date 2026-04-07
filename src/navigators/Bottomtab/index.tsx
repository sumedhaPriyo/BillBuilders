import {
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from '../../../assets/icons';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ label }: { label: string }) => (
  <View style={styles.screen}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

const TabBarIcon = ({ focused, icon, label }: any) => {
  const anim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: focused ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  return (
    <Animated.View
      style={[
        styles.tabItem,
        {
          backgroundColor: focused ? 'red' : 'transparent',
          transform: [{ scale: focused ? 1 : 0.95 }],
        },
      ]}
    >
      <Image
        source={icon}
        style={[styles.icon, { tintColor: focused ? '#fff' : '#000' }]}
      />

      {focused && (
        <Animated.Text
          style={[
            styles.label,
            {
              opacity: anim,
              transform: [{ translateX }],
            },
          ]}
        >
          {label}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

const Bottomtab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: styles.tabBar,
        tabBarRippleColor: 'transparent',
        tabBarButton: props => (
          <TouchableOpacity
            {...(props as TouchableOpacityProps)}
            style={[
              props.style,
              { alignItems: 'center', justifyContent: 'center' },
            ]}
            activeOpacity={1}
          />
        ),

        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 0,
          paddingBottom: 0,
        },

        tabBarIcon: ({ focused }) => {
          let icon;

          switch (route.name) {
            case 'Home':
              icon = icons.Home;
              break;
            case 'Scan':
              icon = icons.Scan;
              break;
            case 'Bills':
              icon = icons.Bills;
              break;
            case 'Profile':
              icon = icons.Profile;
              break;
            default:
              icon = icons.Home;
          }

          return (
            <TabBarIcon focused={focused} icon={icon} label={route.name} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        children={() => <PlaceholderScreen label="Home Screen" />}
      />
      <Tab.Screen
        name="Bills"
        children={() => <PlaceholderScreen label="Bills Screen" />}
      />
      <Tab.Screen
        name="Scan"
        children={() => <PlaceholderScreen label="Scan Screen" />}
      />
      <Tab.Screen
        name="Profile"
        children={() => <PlaceholderScreen label="Profile Screen" />}
      />
    </Tab.Navigator>
  );
};

export default Bottomtab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    fontWeight: '600',
  },

  tabBar: {
    height: 60,
    borderTopWidth: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 25,
    minWidth: 80,
    alignSelf: 'center',
  },

  icon: {
    width: 22,
    height: 22,
  },

  label: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },
});
