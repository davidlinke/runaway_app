import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment-timezone';

// Formats time and handles case where time returned is from the next day (i.e 25:02:00)
const formatTime = time => {
	const arrayOfTime = time.split(':');
	if (parseInt(arrayOfTime[0]) > 23) {
		arrayOfTime[0] = `${parseInt(arrayOfTime[0]) - 24}`;
	}
	const correctedTime = arrayOfTime.join(':');
	return moment(correctedTime, 'HH:mm:ss').format('h:mm a');
};

// Formats duration from seconds
const formatDuration = time => {
	// format to hh:mm
	let duration = new Date(null);
	duration.setSeconds(time);
	let formattedDuration = duration.toISOString().substr(11, 5);
	// remove any leading zeroes
	while (formattedDuration.charAt(0) === '0') {
		formattedDuration = formattedDuration.substr(1);
	}
	// if less than one hour, remove : and add mins
	if (formattedDuration.charAt(0) === ':') {
		formattedDuration = formattedDuration.substr(1) + ' min';
	}
	// if less than 10 min, remove leading zero
	if (formattedDuration.charAt(0) === '0') {
		formattedDuration = formattedDuration.substr(1);
	}
	return formattedDuration;
};

const TripOverview = ({ trip }) => {
	return (
		<View style={styles.container}>
			<Text>{trip.peak_offpeak === '0' ? 'Off Peak' : 'Peak'}</Text>
			<Text>{formatTime(trip.departure_time)}</Text>
			<Text>{formatTime(trip.arrival_time)}</Text>
			<Text>Duration: {formatDuration(trip.trip_duration)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginBottom: 10
	}
});

export default TripOverview;
