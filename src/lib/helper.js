import faker from "faker";

export const connect = (callback) => {
	const props = callback();

	return (Component) => {
		return () => <Component {...props} />;
	};
};

export const getFakeData = (dataNumber) => {
	const data = [];

	for (let i = 0; i < dataNumber; i++) {
		data.push({
			id: faker.datatype.uuid(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			jobTitle: faker.name.jobTitle(),
			phoneNumber: faker.phone.phoneNumber(),
			jobType: faker.name.jobType(),
			email: faker.internet.email(),
		});
	}

	return data;
};
