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
	background: ${(props) => props.theme.offWhite};
	table {
		table-layout: fixed;
		width: 100%;
		border-collapse: collapse;
		border: 1px solid black;
	}

	th,
	td {
		padding: 5px 1px;
		width: 0px;
		text-align: left;
	}

	span {
		background: ${(props) => props.theme.offWhite};
		padding: 6px;
	}
`;

class BillCard extends Component {
	render() {
		const { bill } = this.props;
		const score = bill.upvotes.length - bill.downvotes.length;

		console.log(`score=${score}`);
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
							<td>Title preview</td>
							<td>{bill.sponsor}</td>
						</tr>
					</tbody>
				</table>
			</BillListItem>
		);
	}
}

export default BillCard;
