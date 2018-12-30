import Link from 'next/link';
import Bills from '../components/Bills';

const BillsPage = (props) => (
	<div>
		<Bills page={props.query.page || 1} />
	</div>
);

export default BillsPage;
