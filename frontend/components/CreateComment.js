import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { perPage } from '../config';
import { ALL_COMMENTS_QUERY } from './Comment';
import SINGLE_BILL_QUERY from './gql-tags/SINGLE_BILL_QUERY';

const COMMENT_BILL_MUTATION = gql`
	mutation COMMENT_BILL_MUTATION($id: ID, $content: String) {
		commentBill(id: $id, content: $content) {
			id
			comments {
				content
			}
		}
		comment {
			content
		}
	}
`;

// the bill id is already in the props, so we just need to
// connect it to the comment

class CreateComment extends Component {
	state = {
		content: ''
	};

	handleChange = (e) => {
		const { name, type, value } = e.target;

		const val =

				type === 'number' ? parseFloat(value) :
				value;
		this.setState({ [name]: val });
	};

	// refresh queries and update the cache

	render() {
		const { id } = this.props;
		return (
			<Mutation
				mutation={COMMENT_BILL_MUTATION}
				update={(cache, { data: { commentBill } }) => {
					const { comments } = cache.readQuery({
						query: SINGLE_BILL_QUERY
					});
					console.log('update called');
					cache.writeQuery({
						query: SINGLE_BILL_QUERY,
						data: {
							comments: comments.content.concat([ commentBill ])
						}
					});
				}}
			>
				{(commentBill, { data, loading, error }) => (
					<Form
						onSubmit={async (e) => {
							e.preventDefault();
							commentBill({
								variables: {
									id: this.props.id,
									content: this.state.content
								}
							});
						}}
					>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="content">
								<input
									type="text"
									id="content"
									name="content"
									placeholder="Comment"
									value={this.state.content}
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

export default CreateComment;
export { CREATE_COMMENT_MUTATION };
