import React, { useState, useEffect } from 'react';
import './OrganizationCard.module.scss';

const OrganizationCard = ({ login }) => {
	const [orgName, setOrgName] = useState('dffg');
	const [members, setMembers] = useState('fgdfgdg');
	const [repos, setRepos] = useState('dfgdfgdfg');
	const [date, setDate] = useState('dfdsdfgsdfgds');

	const getName = async () => {
		const url = `https://api.github.com/orgs/${login}`;
		const params = {
			method: 'GET',
		};
		const response = await fetch(url, params);
		const result = await response.json();
		console.log('getName  :', result);
		setOrgName(result.name);
	};

	const getMembers = async () => {
		const url = `https://api.github.com/orgs/errfree/members`;
		const params = {
			method: 'GET',
		};
		const response = await fetch(url, params);
		const result = await response.json();
		console.log(result);
		setMembers(result.length);
	};

	useEffect(() => {
		//getName();
		//getMembers();
	}, []);

	return (
		<article>
			<p>organization name</p>
			<p>{orgName}</p>
			<p>members count</p>
			<p>{members}</p>
			<p>repositories count</p>
			<p>{repos}</p>
			<p>establish date</p>
			<p>{date}</p>
		</article>
	);
};

export default OrganizationCard;
