import * as WebBrowser from 'expo-web-browser';
import React, { useState, useCallback } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	SafeAreaView,
	FlatList,
	View,
	RefreshControl,
	AsyncStorage
} from 'react-native';
import useSchedule from '../hooks/useSchedule';
import TripOverview from '../components/TripOverview';

const HomeScreen = () => {
	const [getSchedule, schedule, errorMessage] = useSchedule();
	const [currentOrigin, setCurrentOrigin] = useState(149);
	const [currentDestination, setCurrentDestination] = useState(1);

	// Set up pull to refresh
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		getSchedule(currentOrigin, currentDestination).then(() =>
			setRefreshing(false)
		);
	}, [refreshing]);
	function wait(timeout) {
		return new Promise(resolve => {
			setTimeout(resolve, timeout);
		});
	}

	// Add origin and destination to local storage on first launch only
	AsyncStorage.getItem('@launched').then(value => {
		if (value == null) {
			AsyncStorage.setItem('@launched', 'true');
			AsyncStorage.setItem('@origin_id', '149');
			AsyncStorage.setItem('@destination_id', '1');
		}
	});

	// AsyncStorage.getAllKeys().then(value => console.log(value));

	// AsyncStorage.getItem('@origin_id').then(value => console.log(value));
	// AsyncStorage.getItem('@destination_id').then(value => console.log(value));

	// Calculate seconds elapsed since midnight for timestamp comparison
	const currentDate = new Date();
	const currentSeconds = Math.floor(
		(currentDate.getTime() - currentDate.setHours(0, 0, 0, 0)) / 1000
	);

	// Display nothing if there are no results returned
	if (!schedule.length) {
		return null;
	}

	return (
		<SafeAreaView style={styles.safeview}>
			<View style={styles.pickerView}>
				<TouchableOpacity>
					<Text>From Westport</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>To Grand Central</Text>
				</TouchableOpacity>
			</View>

			<FlatList
				data={schedule}
				keyExtractor={trip =>
					`${trip.departure_timestamp}${trip.arrival_timestamp} `
				}
				renderItem={({ item }) => {
					if (item.departure_timestamp > currentSeconds) {
						return <TripOverview trip={item} />;
					}
				}}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</SafeAreaView>
	);
};

HomeScreen.navigationOptions = {
	header: null
};

const styles = StyleSheet.create({
	safeview: {
		backgroundColor: '#eeeeee',
		flex: 1
	},
	pickerView: {
		alignItems: 'center'
	}
});

export default HomeScreen;
