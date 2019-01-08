import React, { Component } from 'react';
import { Query } from 'react-apollo';

class Comments extends Component {
	render() {
		return <div>{this.props.children}</div>;
	}
}

export default Comments;
