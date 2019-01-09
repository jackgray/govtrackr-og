import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import BillCard from './BillCard';
import Pagination from '../Main/Pagination';
import { perPage } from '../../config';
import ALL_BILLS_QUERY from '../gql-tags/ALL_BILLS_QUERY';

const Center = styled.div`text-align: center;`;
const BillsList = styled.div`
	display: grid;
]
	grid-gap: 60px;
	max-width: 1000px
	margin: 0 auto;
`;

class Bills extends Component {
	render() {
		return (
			<Center>
				<Query
					query={ALL_BILLS_QUERY}
					variables={
						({
							skip: this.props.page * perPage - perPage
						},
						{ id: this.props.id })
					}
				>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						return (
							<BillsList>
								{data.bills.map((bill) => (
									<BillCard bill={bill} key={bill.id} />
								))}
							</BillsList>
						);
					}}
				</Query>
			</Center>
		);
	}
}

export default Bills;
export { ALL_BILLS_QUERY };
