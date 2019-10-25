import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment-timezone';

const TripDetails = ({ trip, formatTime }) => {
	return (
		<View style={styles.container}>
			<Text
				style={{
					backgroundColor: `#${trip.route_color}`,
					color: `#${trip.route_text_color}`
				}}
			>
				Headsign: {trip.trip_headsign}
			</Text>
			<Text>
				Wheelchair Accessible:{' '}
				{trip.wheelchair_accessible == 1 ? 'true' : 'false'}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {}
});

export default TripDetails;
