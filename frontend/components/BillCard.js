import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Name from './styles/Name';
import PoliticianStyles from './styles/PoliticianStyles';
import DeleteBill from './DeleteBill';
import FollowBill from './FollowBill';
import UnfollowBill from './UnfollowBill';

class BillCard extends Component {
	render() {
		const { bill } = this.props;
		return (
			<PoliticianStyles>
				<Link
					href={{
						pathname: '/bill',
						query: { id: bill.id }
					}}
				>
					<a href="">
						{bill.image && <img src={bill.image} alt={bill.name} />}
					</a>
				</Link>

				<Name>
					<Link
						href={{
							pathname: '/bill',
							query: { id: bill.id }
						}}
					>
						<a href="">{bill.number}</a>
					</Link>
					<h6>Title: {bill.title}</h6>
					<h6>Summary: {bill.summary}</h6>
				</Name>

				<div className="buttonList">
					<Link
						href={{
							pathname: '/update',
							query: { id: bill.id }
						}}
					>
						<h6>✏️</h6>
					</Link>
					<FollowBill id={bill.id}>❤️</FollowBill>
					<UnfollowBill id={bill.id}>💔</UnfollowBill>
					<DeleteBill id={bill.id}>✖️</DeleteBill>
				</div>
			</PoliticianStyles>
		);
	}
}

export default BillCard;
