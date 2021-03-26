import React, { useCallback, useEffect, useState } from "react";
import { getFakeData } from "../../lib/helper";

import {
	TableWrapper,
	Table,
	ButtonWrapper,
	DescriptionWrapper,
	MainWrapper,
} from "./style";

function Pagination() {
	const [fakeData] = useState(getFakeData(145));
	const [pagination, setPagination] = useState({
		offset: 10,
		currentPageNumber: 1,
		pageCount: 1,
		currentData: [],
		buttons: [],
	});

	const [buttonPagination, setbuttonPagination] = useState({
		offset: 3,
		maxButtonShow: 5,
		currentButtonList: [],
	});

	const createPageButtons = useCallback((buttonNumber) => {
		const buttons = [];

		for (let i = 1; i <= buttonNumber; i++) {
			buttons.push(i);
		}

		return buttons;
	}, []);

	useEffect(() => {
		setPagination((prev) => ({
			...prev,
			pageCount: Math.ceil(fakeData.length / pagination.offset),
			currentData: fakeData.slice(0, pagination.offset),
			buttons: createPageButtons(pagination.pageCount),
		}));

		setbuttonPagination((prev) => ({
			...prev,
			currentButtonList: createPageButtons(pagination.pageCount).slice(
				0,
				buttonPagination.maxButtonShow
			),
		}));
	}, [
		fakeData,
		pagination.dataNumber,
		pagination.offset,
		buttonPagination.maxButtonShow,
		createPageButtons,
		pagination.pageCount,
	]);

	const setPaginationData = (currentPageNumber) => {
		const from = (Number(currentPageNumber) - 1) * pagination.offset;
		const to = from + pagination.offset;
		let buttonFrom, buttonEnd;

		if (
			currentPageNumber <=
			buttonPagination.maxButtonShow - buttonPagination.offset
		) {
			buttonFrom = 0;
			buttonEnd = buttonPagination.maxButtonShow;
		} else if (
			currentPageNumber + buttonPagination.offset >=
			pagination.pageCount
		) {
			buttonFrom = pagination.pageCount - buttonPagination.maxButtonShow;
			buttonEnd = pagination.pageCount;
		} else {
			buttonFrom =
				currentPageNumber -
				(buttonPagination.maxButtonShow - buttonPagination.offset);
			buttonEnd = currentPageNumber + buttonPagination.offset;
		}

		setPagination((prev) => ({
			...prev,
			currentPageNumber: Number(currentPageNumber),
			currentData: fakeData.slice(from, to),
		}));

		setbuttonPagination((prev) => ({
			...prev,
			currentButtonList: pagination.buttons.slice(buttonFrom, buttonEnd),
		}));
	};

	const handlePageButton = (e) => {
		const target = e.currentTarget;

		// Check if the page number clicked has changed.
		if (pagination.currentPageNumber === Number(target.id)) {
			return;
		}

		setPaginationData(Number(target.id));
		console.log(target.id);
	};

	const handlePagePrev = () => {
		if (pagination.currentPageNumber === 1) {
			return;
		}

		setPaginationData(pagination.currentPageNumber - 1);
		console.log("prev");
	};

	const handlePageNext = () => {
		if (pagination.currentPageNumber === pagination.pageCount) {
			return;
		}

		setPaginationData(pagination.currentPageNumber + 1);
		console.log("next");
	};

	const hanadleFirstNameSort = () => {
		const data = [...pagination.currentData];

		data.sort((a, b) => {
			if (a.firstName > b.firstName) {
				return 1;
			} else if (a.firstName < b.firstName) {
				return -1;
			} else {
				return 0;
			}
		});

		setPaginationData((prev) => ({ ...prev, currentData: data }));
	};

	console.log(pagination);

	return (
		<MainWrapper>
			<h3>Table With Pagination</h3>
			<DescriptionWrapper>
				<h4>{fakeData.length} Results</h4>
				<h4>
					Page
					{pagination.currentPageNumber}/{pagination.pageCount}
				</h4>
			</DescriptionWrapper>
			<TableWrapper>
				<Table>
					<thead>
						<tr>
							<th>ID</th>
							<th onClick={hanadleFirstNameSort}>First Name</th>
							<th>Last Name</th>
							<th>Job Title</th>
							<th>Phone Number</th>
							<th>Job Type</th>
							<th>Email</th>
						</tr>
					</thead>

					<tbody>
						{pagination.currentData.map((person) => (
							<tr key={person.id}>
								<td>{String(person.id).split("-")[0]}</td>
								<td>{person.firstName}</td>
								<td>{person.lastName}</td>
								<td>{person.jobTitle}</td>
								<td>{person.phoneNumber}</td>
								<td>{person.jobType}</td>
								<td>{person.email}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableWrapper>

			<ButtonWrapper>
				<button
					disabled={pagination.currentPageNumber === 1}
					onClick={handlePagePrev}
					className="prev"
				>
					Prev
				</button>
				{buttonPagination.currentButtonList.map((num) => (
					<button
						className={pagination.currentPageNumber === num ? "active" : ""}
						key={num}
						id={num}
						onClick={handlePageButton}
					>
						{num}
					</button>
				))}
				<button
					disabled={pagination.currentPageNumber === pagination.pageCount}
					onClick={handlePageNext}
					className="next"
				>
					Next
				</button>
			</ButtonWrapper>
		</MainWrapper>
	);
}

export default Pagination;
