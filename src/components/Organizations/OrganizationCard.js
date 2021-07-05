import React, { useState, useEffect } from 'react';
import styles from './OrganizationCard.module.scss';

const OrganizationCard = ({ login, setOrgData }) => {
	const [data, setData] = useState(null);
	const [membersData, setMembersData] = useState('');

	const headers = {
		Accept: 'application/vnd.github.v3+json',
	};
	const params = {
		method: 'GET',
		headers: headers,
	};

	const getOrganization = async () => {
		const url = `https://api.github.com/orgs/${login}`;
		const response = await fetch(url, params);
		const result = await response.json();
		setData(result);
	};

	const getOrgMembers = async () => {
		const url = `https://api.github.com/orgs/${login}/members`;
		const response = await fetch(url, params);
		const result = await response.json();
		setMembersData(result);
	};

	const handleClick = () => {
		setOrgData(data, membersData);
	};

	useEffect(() => {
		getOrganization();
		getOrgMembers();
	}, []);

	if (data) {
		return (
			<article onClick={() => handleClick()}>
				{data.name ? <p>organization name: {data.name}</p> : <p>organization name: {data.login}</p>}
				<div className={styles.membersWrapper}>
					<p>members: {membersData.length}</p>
					<p>followers: {data.followers}</p>
				</div>
				<p>repositories count: {data.public_repos}</p>
				<p>creat date:	{data.created_at}</p>
			</article>
		);
	} else {
		return null;
	}
};

export default OrganizationCard;
