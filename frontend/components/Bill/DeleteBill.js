import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_BILLS_QUERY } from './Bills';

const DELETE_BILL_MUTATION = gql`
	mutation DELETE_BILL_MUTATION($id: ID!) {
		deleteBill(id: $id) {
			id
		}
	}
`;

class DeleteBill extends Component {
	update = (cache, payload) => {
		// deleteBill removes listing from the SERVER
		// udate will update the cache to sync the client side
		// 1. Read the cache
		const data = cache.readQuery({ query: ALL_BILLS_QUERY });
		console.log(data);
		// 2. Filter removed listing out of the page
		data.bills = data.bills.filter(
			(bill) => bill.id !== payload.data.deleteBill.id
		);
		// 3. put the filtered data back
		cache.writeQuery({ query: ALL_BILLS_QUERY, data });
	};
	render() {
		return (
			<Mutation
				mutation={DELETE_BILL_MUTATION}
				variables={{ id: this.props.id }}
				update={this.update}
			>
				{(deleteBill, { error }) => (
					<button
						onClick={() => {
							if (
								confirm(
									'Are you sure you want to remove this person?'
								)
							) {
								deleteBill();
							}
						}}
					>
						{this.props.children}
					</button>
				)}
			</Mutation>
		);
	}
}

export default DeleteBill;
