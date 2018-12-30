import UpdatePolitician from '../components/UpdatePolitician';

const Update = ({ query }) => (
	<div>
		<UpdatePolitician id={query.id} />
	</div>
);

export default Update;
