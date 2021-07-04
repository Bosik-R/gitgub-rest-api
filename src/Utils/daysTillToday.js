export const daysTillToday = (date) => {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const userCreateDate = new Date(date);
	const today = new Date();

	return Math.round(Math.abs((userCreateDate - today) / oneDay));
};
