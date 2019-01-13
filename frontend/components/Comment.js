import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import Error from './ErrorMessage';

const BILL_COMMENT_QUERY = gql`
	query BILL_COMMENT_QUERY($id: ID!) {
		comment(where: { id: $id }) {
			id
			content
			author {
				name
			}
		}
	}
`;

class Comment extends Component {
	render() {
		return (
			<Query query={BILL_COMMENT_QUERY} variables={{ id: this.props.id }}>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <p>Loading...</p>;
					if (!data.comment)
						return <p>no data for id: {this.props.id}</p>;

					//const bill = data.bill;
					const comment = data.comment;

					//const score = comment.upvotes.length - comment.downvotes.length;

					return (
						<div>
							<p>
								{' '}
								<span>{comment.content}</span>
								<span>{comment.author.name}</span>
							</p>
						</div>
					);
				}}
			</Query>
		);
	}
}

export default Comment;
export { BILL_COMMENT_QUERY };
