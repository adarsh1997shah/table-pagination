import React, { useState } from "react";

let timeOut = null;

function Search({ showSearchResult }) {
	const [searchText, setSearchText] = useState("");

	const handleSearchText = (e) => {
		if (timeOut) {
			clearTimeout(timeOut);
		}

		setSearchText(e.target.value);

		timeOut = setTimeout(() => {
			console.log(e.target.value);
			showSearchResult(e.target.value);
		}, 1000);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search with first name"
				value={searchText}
				onChange={handleSearchText}
			/>
		</div>
	);
}

export default Search;
