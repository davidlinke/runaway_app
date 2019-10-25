import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Animated,
	TouchableHighlight
} from 'react-native';
import TripDetails from './TripDetails';
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
	// console.log(trip);
	const [showTripDetails, setShowTripDetails] = useState(false);
	const [overviewHeightValue, setOverviewHeight] = useState();
	const [detailsHeightValue, setDetailsHeight] = useState();
	const [animation] = useState(new Animated.Value());

	// show / hide trip details
	ShowHideTripDetails = () => {
		// console.log(event);
		const initialHeight = showTripDetails
			? overviewHeightValue + detailsHeightValue
			: overviewHeightValue;
		const finalHeight = showTripDetails
			? overviewHeightValue
			: overviewHeightValue + detailsHeightValue;

		setShowTripDetails(!showTripDetails);

		animation.setValue(initialHeight);

		Animated.spring(animation, {
			toValue: finalHeight
			// duration: 500
		}).start();
		// console.log(animation);
	};

	const overviewHeight = event => {
		setOverviewHeight(event.nativeEvent.layout.height);
	};

	const detailsHeight = event => {
		setDetailsHeight(event.nativeEvent.layout.height);
	};

	return (
		<Animated.View
			style={[
				styles.container,
				{
					height:
						typeof animation._value === 'number'
							? animation
							: overviewHeightValue
				}
			]}
			key={`animated${trip.departure_time}`}
		>
			<TouchableHighlight onPress={ShowHideTripDetails} underlayColor='#cccccc'>
				<View>
					<View
						onLayout={overviewHeight}
						// style={{ height: overviewHeightValue }}
					>
						<Text>{trip.peak_offpeak === '0' ? 'Off Peak' : 'Peak'}</Text>
						<Text>Departing {formatTime(trip.departure_time)}</Text>
						<Text>Arriving {formatTime(trip.arrival_time)}</Text>
						<Text>Duration {formatDuration(trip.trip_duration)}</Text>
						<Text style={trip.delay != 0 && styles.delayedText}>
							{trip.delay != 0
								? `Delayed ${Math.floor(trip.delay / 60)} mins`
								: 'On Time'}
						</Text>
						{/* Show track only if given */}
						{trip.trip_stops[0].track != '' && (
							<Text>Track {trip.trip_stops[0].track}</Text>
						)}
					</View>
					<View
						onLayout={detailsHeight}
						// style={{ height: detailsHeightValue }}
						style={styles.detailContainer}
					>
						<TripDetails trip={trip} formatTime={formatTime} />
					</View>
				</View>
			</TouchableHighlight>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginBottom: 10,
		overflow: 'hidden',
		backgroundColor: '#dddddd'
	},
	detailContainer: {
		backgroundColor: '#bbbbbb'
		// marginTop: 10
	},
	delayedText: {
		color: 'red'
	}
});

export default TripOverview;
