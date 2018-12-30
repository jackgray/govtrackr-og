import React, { Component } from 'react';
import styled from 'styled-components';
import link from 'next/link';

import CreatePolitician from './CreatePolitician';
import CreateBill from './CreateBill';

const Button = styled.h1``;

class AddToDatabase extends Component {
	render() {
		return (
			<div>
				<div>
					<CreateBill />
				</div>
				<div>
					<CreatePolitician />
				</div>
			</div>
		);
	}
}

export default AddToDatabase;
