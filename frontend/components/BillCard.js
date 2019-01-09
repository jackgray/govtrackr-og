import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Name from './styles/Name';
import PoliticianStyles from './styles/PoliticianStyles';
import DeleteBill from './DeleteBill';
import FollowBill from './FollowBill';
import UnfollowBill from './UnfollowBill';
import UpvoteBill from './UpvoteBill';
import DownvoteBill from './DownvoteBill';
import styled from 'styled-components';

const BillListItem = styled.div`
	max-width: 900px;
	background: ${(props) => props.theme.offWhite};
	table {
		table-layout: fixed;
		width: 800px;
		border-collapse: collapse;
		border: 1px solid black;
		display: inline-block;
	}

	td {
		border: 100px solid
		padding: none
		width: 10%;
		text-align: left;
		spacing: none;
	}

	span {
		background: ${(props) => props.theme.offWhite};
		padding: none;
		width: 1000px;
		&:hover {
			font-size: 2rem;
		}
	}
`;

class BillCard extends Component {
	state = {
		upvotes: this.props.bill.upvotes,
		downvotes: this.props.bill.downvotes
	};
	render() {
		const { bill } = this.props;
		const score = bill.upvotes.length - bill.downvotes.length;
		const stateScore =
			this.state.upvotes.length - this.state.upvotes.length;
		console.log(`score=${score}`);
		console.log(`state= ${stateScore}`);
		return (
			<BillListItem>
				<table>
					<tbody>
						<tr>
							<td>
								<UpvoteBill id={bill.id}>
									<span>👍</span>
								</UpvoteBill>
								<span>{score}</span>
								<DownvoteBill id={bill.id}>
									<span>👎</span>
								</DownvoteBill>
							</td>

							<td>
								<FollowBill id={bill.id}>
									<span>Follow</span>
								</FollowBill>
								<span>{bill.followers.length}</span>
								<UnfollowBill id={bill.id}>
									<span>Unfollow</span>
								</UnfollowBill>
							</td>

							<Link
								href={{
									pathname: '/bill',
									query: { id: bill.id }
								}}
							>
								<td>{bill.code}</td>
							</Link>
							<td>
								<div>{bill.title.substring(0, 30)}</div>
							</td>
							<td>{bill.sponsor}</td>
							<td>{bill.chamber}</td>
							<td>{bill.party}</td>
						</tr>
					</tbody>
				</table>
			</BillListItem>
		);
	}
}

export default BillCard;
