import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import Error from '../ErrorMessage';
import UpvoteBill from './UpvoteBill';
import DownvoteBill from './DownvoteBill';
import CreateComment from '../CreateComment';

import SingleBillStyles from '../styles/SingleBillStyles';

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
				content
				author {
					name
				}
			}
		}
	}
`;

class SingleBill extends Component {
	render() {
		return (
			<Query query={SINGLE_BILL_QUERY} variables={{ id: this.props.id }}>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <p>Loading...</p>;
					if (!data.bill)
						return <p>no data for id: {this.props.id}</p>;
					const bill = data.bill;
					const score = bill.upvotes.length - bill.downvotes.length;
					console.log('comments:', bill.comments);
					return (
						<SingleBillStyles>
							<Head>
								<title>GovTrackr | {bill.name}</title>
							</Head>

							<div>
								<h2 className="details">Code: {bill.code}</h2>
								<p>ID: {bill.id}</p>
								<p>Title: {bill.title}</p>
								<p>Summary: {bill.summary}</p>
								<p>Chamber of Congress: {bill.chamber}</p>
								<p>{bill.committees}</p>
								<p>
									<span>
										<UpvoteBill id={bill.id}>👍</UpvoteBill>
									</span>
									<span>{score}</span>
									<DownvoteBill>👎</DownvoteBill>
								</p>
								<p>
									{bill.comments.map((comment) => (
										<p>{comment.content}</p>
									))}
								</p>
							</div>
							<CreateComment id={bill.id} key={bill.id} />
						</SingleBillStyles>
					);
				}}
			</Query>
		);
	}
}

export default SingleBill;
export { SINGLE_BILL_QUERY };
