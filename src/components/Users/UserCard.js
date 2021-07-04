import React, { useState, useEffect } from 'react';
import styles from './UserCard.module.scss';
import { daysTillToday } from '../../Utils/daysTillToday';

const UserCard = ({ login }) => {
	const [data, setData] = useState(null);
	const [nameWithLogin, setNameWithLogin] = useState('');
	const [days, setDays] = useState('-');

	const getUser = async () => {
		const url = `https://api.github.com/users/${login}`;
		const response = await fetch(url);
		const result = await response.json();
		setData(result);

		if (result.name)
			setNameWithLogin(result.name.replace(' ', ` "${result.login}" `));
		else setNameWithLogin(result.login);

		setDays(daysTillToday(result.created_at));
	};

	useEffect(() => {
		getUser();
	}, []);

	if (data) {
		return (
			<div className={styles.wrapper}>
				<img className={styles.userAvatar} src={data.avatar_url} alt='avatar' />
				<h3 className={styles.userName}>{nameWithLogin}</h3>
				<span>Joined {days} days ago</span>
			</div>
		);
	} else {
		return null;
	}
};

export default UserCard;
