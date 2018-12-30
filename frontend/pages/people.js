import Link from 'next/link';
import Politicians from '../components/Politicians';

const PoliticiansPage = (props) => (
	<div>
		<Politicians page={props.query.page || 1} />
	</div>
);

export default PoliticiansPage;
