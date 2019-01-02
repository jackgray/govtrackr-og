import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import Error from './ErrorMessage';
import UpvoteBill from './UpvoteBill';
import DownvoteBill from './DownvoteBill';

const SingleBillStyles = styled.div`
	max-width: 600px;
	max-height: 100px;
	margin: 10rem auto;
	box-shadow: ${(props) => props.theme.bs}
	display: grid;
	grid-auto-columns: 10fr;
	grid-auto-flow: row;
	min-height: 800px;
	img {
		width:100%;
		height: 100%;
		max-height: 600px;
		object-fit: contain;
	}
	.details {
		margin: 3rem;
		font-size: 2rem;
    }
    span {
        padding: 20px;
    }
`;

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
							</div>
						</SingleBillStyles>
					);
				}}
			</Query>
		);
	}
}

export default SingleBill;
export { SINGLE_BILL_QUERY };
