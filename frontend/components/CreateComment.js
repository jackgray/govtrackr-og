import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { ALL_COMMENTS_QUERY } from './Comments';

const CREATE_COMMENT_MUTATION = gql`
	mutation CREATE_COMMENT_MUTATION($content: String, $reply: String) {
		createComment(content: $content) {
			id
		}
	}
`;

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

	update = (cache, payload) => {
		// deleteComment removes listing from the SERVER
		// udate will update the cache to sync the client side
		// 1. Read the cache
		const data = cache.readQuery({ query: ALL_COMMENTS_QUERY });
		console.log(data);

		cache.writeQuery({ query: ALL_COMMENTS_QUERY, data });
	};

	render() {
		return (
			<Mutation mutation={CREATE_COMMENT_MUTATION} variables={this.state}>
				{(createComment, { loading, error }) => (
					<Form
						onSubmit={async (e) => {
							e.preventDefault();
							const res = await createComment();
							console.log(res);
							Router.push({
								pathname: '/people',
								query: { id: res.data.createComment.id }
							});
						}}
					>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="content">
								<input
									style="height:300px"
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
