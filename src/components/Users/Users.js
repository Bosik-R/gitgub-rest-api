import React, { useState } from 'react';
import UserCard from './UserCard';
import Pagination from '@material-ui/lab/Pagination';

import styles from './Users.module.scss';

const Users = ({ members }) => {
	const [activePage, setActivePage] = useState(1);
	const entriesPerPage = 5;
	console.log(members.length);

	const handlePageChange = (event, value) => {
		setActivePage(value);
	};

	return (
		<section className={styles.sectionWrapper}>
			<h2 className={styles.sectionTitle}>Members</h2>
			{members
				.slice(activePage * entriesPerPage, (activePage + 1) * entriesPerPage)
				.map((member) => (
					<UserCard key={member.login} login={member.login} />
				))}
			<Pagination
				count={
					members.length < entriesPerPage ? 1 : members.length / entriesPerPage
				}
				page={activePage}
				onChange={handlePageChange}
			/>
		</section>
	);
};

export default Users;
