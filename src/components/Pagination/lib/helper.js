import faker from "faker";

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

export const sort = (data, param) => {
	data.sort((a, b) => {
		if (a[param] > b[param]) {
			return 1;
		} else if (a[param] < b[param]) {
			return -1;
		} else {
			return 0;
		}
	});

	return data;
};
