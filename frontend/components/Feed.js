import React, { Component } from 'react';
import gql from 'graphql-tag';

const BILL_CHANGED_SUBSCRIPTION = gql`
	subscription($id: ID) {
		billLatestActionChanged(id: $id) {
			bill {
				mutation
				updatedFields
				node {
					actions
				}
			}
		}
	}
`;

class Feed extends Component {
	render() {
		return <div>{this.props.children}</div>;
	}
}

export default Feed;
