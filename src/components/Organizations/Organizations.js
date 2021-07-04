import React, { useState, useEffect } from 'react';
import OrganizationCard from './OrganizationCard';
import Pagination from '@material-ui/lab/Pagination';
import styles from './Organizations.module.scss';

const Organizations = ({ setOrgData }) => {
	const [data, setData] = useState(null);
	const [activePage, setActivePage] = useState(1);
	const entrysPerPage = 3;

	const headers = {
		Accept: 'application/vnd.github.v3+json',
	};
	const params = {
		method: 'GET',
		headers: headers,
	};

	const getOrganizations = async () => {
		const url = 'https://api.github.com/organizations';
		const response = await fetch(url, params);
		const result = await response.json();
		setData(result);
	};

	useEffect(() => {
		getOrganizations();
	}, []);

	const handlePageChange = (event, value) => {
		setActivePage(value);
	};

	if (data) {
		return (
			<section className={styles.sectionWrapper}>
				<h2 className={styles.sectionTitle}>Organizations</h2>
				{data
					.slice(activePage * entrysPerPage, (activePage + 1) * entrysPerPage)
					.map((org) => (
						<OrganizationCard
							key={org.id}
							login={org.login}
							setOrgData={setOrgData}
						/>
					))}
				<Pagination
					count={data.length / entrysPerPage}
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

//.slice(activePage * entrysPerPage, (activePage + 1) * entrysPerPage)
