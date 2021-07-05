import React, { useState, useEffect } from 'react';
import OrganizationCard from './OrganizationCard';
import Pagination from '@material-ui/lab/Pagination';
import styles from './Organizations.module.scss';

const Organizations = ({ setOrgData }) => {
	const [data, setData] = useState(null);
	const [activePage, setActivePage] = useState(1);
	const entriesPerPage = 3;

	const headers = {
		Accept: 'application/vnd.github.v3+json',
	};
	const params = {
		method: 'GET',
		headers: headers,
	};

	const rateLimit = async () => {
		const url = 'https://api.github.com/rate_limit';
		const response = await fetch(url);
		const result = await response.json();
		console.log(result);
	};

	const getOrganizations = async () => {
		//const url = 'https://api.github.com/search/org?q=type:org '
		const url = `https://api.github.com/organizations?per_page=100`;
		const response = await fetch(url, params);
		const result = await response.json();
		setData(result);
		console.log('organization', result);
	};

	useEffect(() => {
		getOrganizations();
		//rateLimit()
	}, []);

	const handlePageChange = (event, value) => {
		setActivePage(value);
	};

	// return <div>test</div>;

	if (data) {
		return (
			<section className={styles.sectionWrapper}>
				<h2 className={styles.sectionTitle}>Organizations</h2>
				{data
					.slice(activePage * entriesPerPage, (activePage + 1) * entriesPerPage)
					.map((org) => (
						<OrganizationCard
							key={org.id}
							login={org.login}
							setOrgData={setOrgData}
						/>
					))}
				<Pagination
					count={Math.round(data.length / entriesPerPage)}
					page={activePage}
					onChange={handlePageChange}
				/>
			</section>
		);
	} else {
		return null;
	}
};

export default Organizations;

//.slice(activePage * entriesPerPage, (activePage + 1) * entriesPerPage)
