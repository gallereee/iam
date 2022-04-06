export default () => {
	return {
		host: process.env.IAM_HOST,
		port: parseInt(process.env.IAM_PORT, 10),
	};
};
