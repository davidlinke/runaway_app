import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Header,
	StatusBar,
	SafeAreaView,
	FlatList
} from 'react-native';
import useSchedule from '../hooks/useSchedule';
import TripOverview from '../components/TripOverview';

const HomeScreen = () => {
	const [getSchedule, schedule, errorMessage] = useSchedule(1, 134);

	// console.log(schedule);

	if (!schedule.length) {
		return null;
	}

	return (
		<SafeAreaView style={styles.safeview}>
			{/* <Text style={styles.title}>Runaway</Text> */}
			<TouchableOpacity>
				<Text>From Westport</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>To Grand Central</Text>
			</TouchableOpacity>
			<FlatList
				data={schedule}
				keyExtractor={trip =>
					`${trip.departure_timestamp}${trip.arrival_timestamp} `
				}
				renderItem={({ item }) => {
					// console.log(item);
					return (
						<TouchableOpacity
						// onPress={() => navigation.navigate('Restaurant', { id: trip.id })}
						>
							<TripOverview trip={item} />
						</TouchableOpacity>
					);
				}}
			/>
		</SafeAreaView>
	);
};

HomeScreen.navigationOptions = {
	header: null
};

const styles = StyleSheet.create({
	safeview: {
		// alignItems: 'center',
		backgroundColor: '#eeeeee',
		flex: 1
	},
	title: {
		fontSize: 20
	}
});

export default HomeScreen;
