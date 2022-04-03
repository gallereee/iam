export default () => {
	return {
		host: process.env.HOST,
		port: parseInt(process.env.PORT, 10),
	};
};
