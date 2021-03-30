import styled from "styled-components";

export const MainWrapper = styled.div`
	max-width: 95%;
	margin: auto;
`;

export const TableWrapper = styled.div`
	min-height: 350px;
	height: 350px;
	overflow: auto;
`;

export const Table = styled.table`
	white-space: nowrap;

	.sort {
		cursor: pointer;
	}
`;

export const ButtonWrapper = styled.div`
	text-align: center;
	margin-top: 10px;
	margin-bottom: 10px;

	.active {
		background-color: #1976d2;
		color: white;
	}

	.prev {
		width: 40px;
	}

	.next {
		width: 40px;
	}

	button {
		border: none;
		appearence: none;
		height: 32px;
		padding: 0 6px;
		text-align: center;
		width: 32px;
		font-size: 15px;
		cursor: pointer;
		margin: 0 3px;
		background-color: white;
		border-radius: 50%;
		font-weight: 600;

		&:focus {
			outline: none;
		}
	}
`;

export const DescriptionWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;
