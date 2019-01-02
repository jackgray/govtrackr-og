import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const UPVOTE_BILL_MUTATION = gql`
	mutation upvoteBill($id: ID!) {
		upvoteBill(id: $id) {
			id
		}
	}
`;

class UpvoteBill extends Component {
	render() {
		const { id } = this.props;
		return (
			<Mutation
				mutation={UPVOTE_BILL_MUTATION}
				variables={{ id }}
				refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
			>
				{(upvoteBill, { loading }) => (
					<button disabled={loading} onClick={upvoteBill}>
						{this.props.children}
						{loading && 'ing'}
					</button>
				)}
			</Mutation>
		);
	}
}

export default UpvoteBill;
export { UPVOTE_BILL_MUTATION };
