import SingleBill from '../components/SingleBill';

const Bill = (props) => (
	<div>
		<p>This is the single bill page</p>
		<SingleBill id={props.query.id} />
	</div>
);

export default Bill;
