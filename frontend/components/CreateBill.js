import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { ALL_BILLS_QUERY } from './Bills';

const CREATE_BILL_MUTATION = gql`
	mutation CREATE_BILL_MUTATION(
		$number: Int
		$title: String!
		$summary: String
		$committees: String
	) {
		createBill(
			number: $number
			title: $title
			summary: $summary
			committees: $committees
		) {
			id
		}
	}
`;

class CreateBill extends Component {
	state = {
		number: 0,
		title: '',
		summary: '',
		committees: ''
	};
	handleChange = (e) => {
		const { name, type, value } = e.target;

		const val =

				type === 'number' ? parseFloat(value) :
				value;
		this.setState({ [name]: val });
	};

	uploadFile = async (e) => {
		console.log('Uploading file...');
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'default');

		const res = await fetch(
			'https://api.cloudinary.com/v1_1/politicious/image/upload',
			{
				method: 'POST',
				body: data
			}
		);
		const file = await res.json();
		console.log(file);
		this.setState({
			image: file.secure_url,
			largeImage: file.eager[0].secure_url
		});
	};

	update = (cache, payload) => {
		// deleteBill removes listing from the SERVER
		// udate will update the cache to sync the client side
		// 1. Read the cache
		const data = cache.readQuery({ query: ALL_BILLS_QUERY });
		console.log(data);

		cache.writeQuery({ query: ALL_BILLS_QUERY, data });
	};

	render() {
		return (
			<Mutation mutation={CREATE_BILL_MUTATION} variables={this.state}>
				{(createBill, { loading, error }) => (
					<Form
						onSubmit={async (e) => {
							e.preventDefault();
							const res = await createBill();
							console.log(res);
							Router.push({
								pathname: '/bills',
								query: { id: res.data.createBill.id }
							});
						}}
					>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="number">
								Bill Number
								<input
									type="number"
									id="number"
									name="number"
									placeholder="Bill Number"
									required
									value={this.state.number}
									onChange={this.handleChange}
								/>
							</label>

							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									name="title"
									placeholder="Title"
									required
									value={this.state.title}
									onChange={this.handleChange}
								/>
							</label>
							<label htmlFor="summary">
								Summary
								<input
									type="text"
									id="summary"
									name="summary"
									placeholder="State"
									required
									value={this.state.summary}
									onChange={this.handleChange}
								/>
							</label>
							<label htmlFor="committees">
								Committees
								<input
									type="text"
									id="committees"
									name="committees"
									placeholder="Committees"
									required
									value={this.state.committees}
									onChange={this.handleChange}
								/>
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default CreateBill;
export { CREATE_BILL_MUTATION };
