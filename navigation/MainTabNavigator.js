import React from 'react';
import { Platform } from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const config = Platform.select({
	web: { headerMode: 'screen' },
	default: {}
});

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen
	},
	config
);

HomeStack.navigationOptions = {
	tabBarLabel: 'Schedule',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} name={'md-train'} />
	)
};

HomeStack.path = '';

const FavoritesStack = createStackNavigator(
	{
		Favorites: FavoritesScreen
	},
	config
);

FavoritesStack.navigationOptions = {
	tabBarLabel: 'Favorites',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
		/>
	)
};

FavoritesStack.path = '';

const tabNavigator = createBottomTabNavigator({
	HomeStack,
	FavoritesStack
});

tabNavigator.path = '';

export default tabNavigator;
