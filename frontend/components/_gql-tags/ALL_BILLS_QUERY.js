import gql from 'graphql-tag';
import { perPage } from '../../config';

const ALL_BILLS_QUERY = gql`
	query ALL_BILLS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
		bills(first: $first, skip: $skip, orderBy: createdAt_DESC) {
			id
			code
			title
			summary
			committees
			upvotes {
				id
			}
			downvotes {
				id
			}
			followers {
				name
			}
		}
	}
`;

export default ALL_BILLS_QUERY;
