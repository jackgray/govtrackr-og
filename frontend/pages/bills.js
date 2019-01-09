import Link from 'next/link';
import Bills from '../components/Bill/Bills';

const BillsPage = (props) => (
	<div>
		<Bills page={props.query.page || 1} />
	</div>
);

export default BillsPage;
