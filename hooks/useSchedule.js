import { useEffect, useState } from 'react';
import backend from '../api/backend';

export default () => {
	const [schedule, setSchedule] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const getSchedule = async (origin_id, destination_id) => {
		try {
			const response = await backend.get('/schedule', {
				params: {
					origin_id: origin_id,
					destination_id: destination_id
				}
			});
			setSchedule(response.data);
		} catch (err) {
			setErrorMessage(err);
		}
	};

	useEffect(() => {
		// REMOVE HARDCODED STATIONS
		getSchedule(1, 134);
	}, []);

	return [getSchedule, schedule, errorMessage];
};
