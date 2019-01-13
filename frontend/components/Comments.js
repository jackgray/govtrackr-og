// import React, { Component } from 'react';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';

// const BILL_COMMENTS_QUERY = gql`
// 	query billComments($billId: ID!) {
// 		billComments(billId: $billId) {
// 			content
// 			author {
// 				name
// 			}
// 		}
// 	}
// `;

// class Comments extends Component {
// 	render() {
// 		const { billId } = this.props.bill;
// 		const { comments } = this.props;
// 		return (
// 			<div>
// 				<Query
// 					query={BILL_COMMENTS_QUERY}
// 					variables={{ id: this.props.id }}
// 				>
// 					{({ data, error, loading }) => {
// 						if (loading) return <p>Loading...</p>;
// 						if (error) return <p>Error: {error.message}</p>;
// 						return (
// 							<div>
// 								{comments.map((comment) => (
// 									<Comment
// 										content={comment.content}
// 										author={comment.author}
// 										key={comment.id}
// 									/>
// 								))}
// 							</div>
// 						);
// 					}}
// 				</Query>
// 			</div>
// 		);
// 	}
// }

// export default Comments;
// export { BILL_COMMENTS_QUERY };
