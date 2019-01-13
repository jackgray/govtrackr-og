import gql from 'graphql-tag';

const SINGLE_BILL_QUERY = gql`
	query SINGLE_BILL_QUERY($id: ID!) {
		bill(where: { id: $id }) {
			id
			code
			title
			summary
			committees
			sponsor
			upvotes {
				name
			}
			downvotes {
				name
			}
			comments {
				id
				author {
					name
				}
			}
		}
	}
`;

export default SINGLE_BILL_QUERY;
