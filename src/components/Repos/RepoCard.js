import React, { useState, useEffect } from 'react';
import { daysTillToday } from '../../Utils/daysTillToday';
import styles from './RepoCard.module.scss';

const RepoCard = ({ name, owner }) => {
	const [data, setData] = useState(null);
	const [pulls, setPulls] = useState({ all: '', open: '' });
	const [commitDays, setCommitDays] = useState('');
	const [issues, setIssues] = useState({ open: '', closed: '', all: '' });
	const [ratio, setRatio] = useState(0);

	const headers = {
		Accept: 'application/vnd.github.v3+json',
	};
	const params = {
		method: 'GET',
		headers: headers,
	};

	const getRepo = async () => {
		//const url = `https://api.github.com/repos/mojombo/mojombo.github.io`;
		const url = `https://api.github.com/repos/${owner}/${name}`;
		const response = await fetch(url, params);
		const result = await response.json();
		console.log(result);

		setData(result);
	};

	const rateLimit = async () => {
		const url = 'https://api.github.com/rate_limit';
		const response = await fetch(url);
		const result = await response.json();
		console.log(result);
	};

	const getPulls = async () => {
		const url = `https://api.github.com/repos/${owner}/${name}/pulls?per_page=100`;
		const response = await fetch(url);
		const result = await response.json();
		console.log(result);
		const openPR = result.filter((pr) => pr.state === 'open');

		setPulls({ all: result.length, open: openPR.length });
	};

	const getOpenIssues = async () => {
		const url = `https://api.github.com/repos/${owner}/${name}/issues?state=open`;
		const response = await fetch(url, params);
		const result = await response.json();
		console.log('open issues : ', result);
		setIssues({ ...issues, open: result.length });
		console.log('open',issues);
	};

	const getClosedIssues = async () => {
		const url = `https://api.github.com/repos/${owner}/${name}/issues?state=closed`;

		const response = await fetch(url, params);
		const result = await response.json();
		console.log('closed issues : ', result);
	};

	const getAllIssues = async () => {
		const url = `https://api.github.com/repos/${owner}/${name}/issues?state=closed&page=&per_page=100`;

		const response = await fetch(url, params);
		const links = [response.headers.get('link')];
		console.log(links);

		const result = await response.json();
		console.log('all issues : ', result);

		setRatio(pulls.all / result.length);
	};

	const getCommits = async () => {
		const url = `https://api.github.com/repos/${owner}/${name}/commits?per_page=100`;
		const response = await fetch(url, params);
		const result = await response.json();

		setCommitDays(daysTillToday(result[0].commit.author.date));
	};

	useEffect(() => {
		rateLimit();
		//getRepo();
		//getPulls();
		//getOpenIssues();
		//getClosedIssues();
		//getAllIssues();
		//getCommits();
	}, []);

	if (data) {
		return (
			<article>
				<p>Repositorie name: {data.name}</p>
				<p>Open Pull Requests: {pulls.open}</p>
				<p>stars count: 2222</p>
				<p>Issues open: xxx / closed: xxx </p>
				<p>Pull Requests Issues ratio: {ratio}</p>
				<p>Last commit {commitDays} days ago</p>
			</article>
		);
	} else {
		return null;
	}
};

export default RepoCard;
