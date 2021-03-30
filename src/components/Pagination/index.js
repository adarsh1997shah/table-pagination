import React, { useCallback, useEffect, useState } from "react";
import { getFakeData, sort } from "./lib/helper";
import Search from "./Search";

import {
	TableWrapper,
	Table,
	ButtonWrapper,
	DescriptionWrapper,
	MainWrapper,
} from "./style";

function Pagination() {
	const [fakeData] = useState(getFakeData(145));
	const [searchData, setSearchData] = useState(fakeData);
	const [sortQuery, setSortQuery] = useState("");
	const [pagination, setPagination] = useState({
		offset: 10,
		currentPageNumber: 1,
		pageCount: 1,
		currentData: searchData.slice(0, 10),
		buttons: [],
	});

	const [buttonPagination, setbuttonPagination] = useState({
		offset: 4,
		maxButtonShow: 10,
		currentButtonList: [],
	});

	const createPageButtons = useCallback((buttonNumber) => {
		const buttons = [];

		for (let i = 1; i <= buttonNumber; i++) {
			buttons.push(i);
		}

		return buttons;
	}, []);

	const getButtonPagination = useCallback(
		(currentPageNumber) => {
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
				buttonFrom =
					pagination.pageCount - buttonPagination.maxButtonShow < 0
						? 0
						: pagination.pageCount - buttonPagination.maxButtonShow;
				buttonEnd = pagination.pageCount;
			} else {
				buttonFrom =
					currentPageNumber -
					(buttonPagination.maxButtonShow - buttonPagination.offset);
				buttonEnd = currentPageNumber + buttonPagination.offset;
			}

			return [buttonFrom, buttonEnd];
		},
		[
			buttonPagination.maxButtonShow,
			buttonPagination.offset,
			pagination.pageCount,
		]
	);

	const getPagination = useCallback(
		(currentPageNumber) => {
			const from = (Number(currentPageNumber) - 1) * pagination.offset;
			const to = from + pagination.offset;

			return [from, to];
		},
		[pagination.offset]
	);

	useEffect(() => {
		const pageCount = Math.ceil(searchData.length / pagination.offset);

		setPagination((prev) => ({
			...prev,
			currentPageNumber: searchData.length ? 1 : 0,
			currentData: searchData.slice(0, prev.offset),
			pageCount,
			buttons: createPageButtons(pageCount),
		}));

		setbuttonPagination((prev) => ({
			...prev,
			currentButtonList: createPageButtons(pageCount).slice(
				0,
				buttonPagination.maxButtonShow
			),
		}));
	}, [
		searchData,
		pagination.offset,
		buttonPagination.maxButtonShow,
		createPageButtons,
		pagination.pageCount,
	]);

	const setPaginationData = (currentPageNumber) => {
		// console.log("currentPageNumber", currentPageNumber);
		let [from, to] = getPagination(currentPageNumber);
		let [buttonFrom, buttonEnd] = getButtonPagination(currentPageNumber);

		// console.log("from", from, "to", to);
		// console.log("bfrom", buttonFrom, "bto", buttonEnd);
		// console.log("offset", pagination.offset);

		setPagination((prev) => ({
			...prev,
			currentPageNumber: Number(currentPageNumber),
			currentData: searchData.slice(from, to),
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

	// List of sorting tables
	const hanadleFirstNameSort = () => {
		const data = [...pagination.currentData];

		const sortData = sort(data, "firstName");

		setPagination((prev) => ({
			...prev,
			currentData: sortData,
		}));
		setSortQuery("firstName");
	};

	const hanadleLastNameSort = () => {
		const data = [...pagination.currentData];

		const sortData = sort(data, "lastName");

		setPagination((prev) => ({
			...prev,
			currentData: sortData,
		}));

		setSortQuery("lastName");
	};

	const hanadleJobTitleSort = () => {
		const data = [...pagination.currentData];

		const sortData = sort(data, "jobTitle");

		setPagination((prev) => ({
			...prev,
			currentData: sortData,
		}));
		setSortQuery("jobTitle");
	};

	const hanadleJobTypeSort = () => {
		const data = [...pagination.currentData];

		const sortData = sort(data, "jobType");

		setPagination((prev) => ({
			...prev,
			currentData: sortData,
		}));
		setSortQuery("jobType");
	};

	// Handle search query by first name.
	const showSearchResult = (text) => {
		const searchResult = fakeData.filter((data) =>
			data.firstName.toLowerCase().includes(text.toLowerCase())
		);

		setSearchData(searchResult);
	};

	// Changing the amount of data shown on particular page.
	const handleOffsetSelect = (e) => {
		// let currentPageNumber;

		// if (Number(e.target.value) > pagination.offset) {
		// 	currentPageNumber = Math.ceil(
		// 		pagination.currentPageNumber /
		// 			Math.ceil(Number(e.target.value) / pagination.offset)
		// 	);
		// } else {
		// 	currentPageNumber = Math.ceil(
		// 		pagination.currentPageNumber *
		// 			Math.ceil(pagination.offset / Number(e.target.value))
		// 	);
		// }

		console.log(e.target.value);
		setPagination((prev) => ({
			...prev,
			offset: Number(e.target.value),
		}));
	};

	console.log(pagination);
	// console.log(searchData);

	return (
		<MainWrapper>
			<h3>Table With Pagination and sorting of particular colums</h3>
			<Search showSearchResult={showSearchResult} />
			<DescriptionWrapper>
				<h4>
					Showing{" "}
					{pagination.currentData.length
						? (Number(pagination.currentPageNumber) - 1) * pagination.offset + 1
						: 0}{" "}
					to{" "}
					{pagination.currentData.length
						? (Number(pagination.currentPageNumber) - 1) * pagination.offset +
						  pagination.currentData.length
						: 0}{" "}
					of {searchData.length} Results
				</h4>
				<h4>
					Page
					{pagination.currentData.length ? pagination.currentPageNumber : 0}/
					{pagination.pageCount}
				</h4>
			</DescriptionWrapper>
			<div>
				Show{" "}
				<select value={pagination.offset} onChange={handleOffsetSelect}>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>{" "}
				entries
			</div>
			<TableWrapper>
				<Table>
					<thead>
						<tr>
							<th>ID</th>
							<th className="sort" onClick={hanadleFirstNameSort}>
								First Name{" "}
								{sortQuery === "firstName" ? <span>&#8679;</span> : null}
							</th>
							<th className="sort" onClick={hanadleLastNameSort}>
								Last Name{" "}
								{sortQuery === "lastName" ? <span>&#8679;</span> : null}
							</th>
							<th className="sort" onClick={hanadleJobTitleSort}>
								Job Title{" "}
								{sortQuery === "jobTitle" ? <span>&#8679;</span> : null}
							</th>
							<th>Phone Number</th>
							<th className="sort" onClick={hanadleJobTypeSort}>
								Job Type {sortQuery === "jobType" ? <span>&#8679;</span> : null}
							</th>
							<th>Email</th>
						</tr>
					</thead>

					<tbody>
						{pagination.currentData.length ? (
							pagination.currentData.map((person) => (
								<tr key={person.id}>
									<td>{String(person.id).split("-")[0]}</td>
									<td>{person.firstName}</td>
									<td>{person.lastName}</td>
									<td>{person.jobTitle}</td>
									<td>{person.phoneNumber}</td>
									<td>{person.jobType}</td>
									<td>{person.email}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={7}>
									<h4 style={{ margin: 0 }}>No matching records found</h4>
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</TableWrapper>

			<ButtonWrapper>
				<button
					disabled={pagination.currentPageNumber <= 1}
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
