import React, { useState, useEffect } from 'react';

const UserCard = () => {
	const [data, setData] = useState(null);

	const getUser = async () => {
		const url = `https://api.github.com/users/${login}`;
		const params = {
			method: 'GET',
		};
		const response = await fetch(url, params);
		const result = await response.json();
		setData(result);
	};

	useEffect(() => {
		getUser();
	}, []);

	return <div></div>;
};

export default UserCard;
