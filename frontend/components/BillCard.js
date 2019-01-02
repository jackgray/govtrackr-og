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
	table {
		table-layout: fixed;
		width: 100%;
		border-collapse: collapse;
		border: 1px solid black;
	}

	th,
	td {
		padding: 10px;
		width: auto;
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
						<Link
							href={{
								pathname: '/bill',
								query: { id: bill.id }
							}}
						>
							<tr>
								<td>
									<UpvoteBill id={bill.id}>👍</UpvoteBill>
									<span>score: {score}</span>
									<DownvoteBill id={bill.id}>👎</DownvoteBill>
								</td>

								<td>
									<FollowBill id={bill.id} />Follow
								</td>
								<td>
									<UnfollowBill id={bill.id} />
								</td>
								<td>{bill.title}</td>
								<td>{bill.id}</td>
								<td>{bill.code}</td>

								<td>{bill.sponsor}</td>
							</tr>
						</Link>
					</tbody>
				</table>
			</BillListItem>
		);
	}
}

export default BillCard;
