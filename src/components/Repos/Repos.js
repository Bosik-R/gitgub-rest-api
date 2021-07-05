import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import RepoCard from './RepoCard';
import styles from './Repos.module.scss';

const Repos = ({ repos_url }) => {
	const [data, setData] = useState(null);
	const [activePage, setActivePage] = useState(1);
	const entriesPerPage = 1;

	const headers = {
		Accept: 'application/vnd.github.v3+json',
	};
	const params = {
		method: 'GET',
		headers: headers,
	};

	const getRepos = async () => {
		const response = await fetch(repos_url, params);
		//const links = [response.headers.get('link')];
		//console.log(links);
		const result = await response.json();

		setData(result);
		console.log(result);
	};

	useEffect(() => {
		getRepos();
		console.log('działa');
	}, []);

	const handlePageChange = (event, value) => {
		setActivePage(value);
	};

	return (
		<section>
			<h2>Repositories</h2>
			{/* {data
				? data.map((repo) => (
							<RepoCard
								key={repo.id}
								name={repo.name}
								owner={repo.owner.login}
							/>
						))
				: null}
			<Pagination
				count={data ? data.length / entriesPerPage : 0}
				page={activePage}
				onChange={handlePageChange}
			/> */}
		</section>
	);
};

export default Repos;
