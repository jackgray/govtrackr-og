import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SINGLE_POLITICIAN_QUERY = gql`
	query SINGLE_POLITICIAN_QUERY($id: ID!) {
		politician(where: { id: $id }) {
			id
			name
			party
			state
			image
			largeImage
			district
			website
		}
	}
`;

const UPDATE_POLITICIAN_MUTATION = gql`
	mutation UPDATE_POLITICIAN_MUTATION(
		$id: ID
		$name: String
		$party: Int
		$state: String
		$image: String
		$largeImage: String
		$district: String
		$website: String
	) {
		updatePolitician(
			id: $id
			name: $name
			party: $party
			state: $state
			image: $image
			largeImage: $largeImage
			district: $district
			website: $website
		) {
			id
			name
			party
			state
			image
			largeImage
			district
			website
		}
	}
`;

class UpdatePolitician extends Component {
	state = {};
	handleChange = (e) => {
		const { name, type, value } = e.target;

		const val =

				type === 'number' ? parseFloat(value) :
				value;
		this.setState({ [name]: val });
	};

	updatePolitician = async (e, updatePoliticianMutation) => {
		e.preventDefault();
		console.log('Updating Politician');
		console.log(this.state);
		const res = await updatePoliticianMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
		console.log('Updated!');
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
		console.log('Updated!');
	};

	render() {
		return (
			<Query
				query={SINGLE_POLITICIAN_QUERY}
				variables={{ id: this.props.id }}
			>
				{({ data, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (!data.politician)
						return (
							<p>
								No politician found in database for{' '}
								{this.props.id}
							</p>
						);
					return (
						<Mutation
							mutation={UPDATE_POLITICIAN_MUTATION}
							variables={this.state}
						>
							{(updatePolitician, { loading, error }) => (
								<Form
									onSubmit={(e) =>
										this.updatePolitician(
											e,
											updatePolitician
										)}
								>
									<Error error={error} />
									<fieldset
										disabled={loading}
										aria-busy={loading}
									>
										<label htmlFor="file">
											Image
											<input
												type="file"
												id="file"
												name="file"
												placeholder="Upload an image"
												deaultValue={
													data.politician.image
												}
												onChange={this.uploadFile}
											/>
											{this.state.image && (
												<img
													width="200"
													src={this.state.image}
													alt="Upload Preview"
												/>
											)}
										</label>
										<label htmlFor="name">
											Name
											<input
												type="text"
												id="name"
												name="name"
												placeholder="Name"
												defaultValue={
													data.politician.name
												}
												onChange={this.handleChange}
											/>
										</label>

										<label htmlFor="party">
											Age
											<input
												type="number"
												id="party"
												name="party"
												placeholder="Age"
												defaultValue={
													data.politician.party
												}
												onChange={this.handleChange}
											/>
										</label>
										<label htmlFor="state">
											Breed(s)
											<input
												type="text"
												id="state"
												name="state"
												placeholder="Breed"
												defaultValue={
													data.politician.state
												}
												onChange={this.handleChange}
											/>
										</label>
										<label htmlFor="district">
											Location
											<input
												type="text"
												id="district"
												name="district"
												placeholder="Location"
												defaultValue={
													data.politician.district
												}
												onChange={this.handleChange}
											/>
										</label>
										<button type="submit">
											Save Changes
										</button>
									</fieldset>
								</Form>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}

export default UpdatePolitician;
export { UPDATE_POLITICIAN_MUTATION };
