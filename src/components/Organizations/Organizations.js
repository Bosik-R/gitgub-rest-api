import React, { useState, useEffect } from 'react';
import OrganizationCard from './OrganizationCard';
import Pagination from '@material-ui/lab/Pagination';
import './Organizations.module.scss';

const Organizations = () => {
	const [data, setData] = useState([1, 3, 4, 5, 6, 7, 8]);
	const [activePage, setActivePage] = useState(0);
	const entrysPerPage = 1;
	const pageCount = 10;

	const getOrganizations = async () => {
		//const url = 'https://api.github.com/rate_limit';
		const url = 'https://api.github.com/organizations';
		const response = await fetch(url);
		const result = await response.json();
		setData(result);
		console.log(result);
	};

	useEffect(() => {
		//getOrganizations();
	}, []);

	const handlePageChange = (event, value) => {
		setActivePage(value);
	};

	return (
		<section>
			<h2>organizations</h2>
			{data
				? data.map((org) => (
						<OrganizationCard key={org.login} login={org.login} />
				  ))
				: null}
			<Pagination
				count={pageCount}
				page={activePage}
				onChange={handlePageChange}
			/>
		</section>
	);
};

export default Organizations;

//.slice(activePage * entrysPerPage, (activePage + 1) * entrysPerPage)
