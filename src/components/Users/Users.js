import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import './Users.modules.scss';

const Users = () => {
	const [data, setData] = useState(null);

	const getUsers = async () => {
		const url = 'https://api.github.com/users';
		const response = await fetch(url);
		const result = await response.json();
		setData(result);
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<section>
			{data && data.map((user) => <UserCard key={user.login} />)}
		</section>
	);
};

export default Users;
