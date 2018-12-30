import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import BillCard from './BillCard';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_BILLS_QUERY = gql`
	query ALL_BILLS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
		bills(first: $first, skip: $skip, orderBy: createdAt_DESC) {
			id
			number
			title
			summary
			committees
		}
	}
`;

const Center = styled.div`text-align: center;`;
const BillsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
`;

class Bills extends Component {
	render() {
		return (
			<Center>
				<Pagination page={this.props.page} />
				<Query
					query={ALL_BILLS_QUERY}
					variables={{
						skip: this.props.page * perPage - perPage
					}}
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
				<Pagination page={this.props.page} />
			</Center>
		);
	}
}

export default Bills;
export { ALL_BILLS_QUERY };
