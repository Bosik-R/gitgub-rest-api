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
				<p>organization name:</p>
				{data.name ? <p>{data.name}</p> : <p>{data.login}</p>}
				<div className={styles.membersWrapper}>
					<div>
						<p>members</p>
						<p>{membersData.length}</p>
					</div>
					<div>
						<p>followers</p>
						<p>{data.followers}</p>
					</div>
				</div>
				<p>repositories count:</p>
				<p>{data.public_repos}</p>
				<p>creat date:</p>
				<p>{data.created_at}</p>
			</article>
		);
	} else {
		return null;
	}
};

export default OrganizationCard;
