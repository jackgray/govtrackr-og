import SinglePolitician from '../components/SinglePolitician';

const Politician = (props) => (
	<div>
		<p>This is the single politician page</p>
		<SinglePolitician id={props.query.id} />
	</div>
);

export default Politician;
