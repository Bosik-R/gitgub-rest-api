import React, { useState } from 'react';

import './App.css';
import Organizations from './components/Organizations/Organizations';
import Users from './components/Users/Users';
import Repos from './components/Repos/Repos';

const App = () => {
	const [org, setOrg] = useState(null);
	const [members, setMembers] = useState([]);
	console.log(org);
	console.log(members);

	const setOrgData = (org, members) => {
		setOrg(org);
		setMembers(members);
	};

	return (
		<div className='container'>
			<Organizations setOrgData={setOrgData} />
			{/* {members.length > 0 && <Users members={members} />} */}
			{org && <Repos repos_url={org.repos_url} />}
		</div>
	);
};

export default App;
