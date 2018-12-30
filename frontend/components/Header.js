import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './Nav';
//import styles
import Logo from './styles/Logo';
import StyledHeader from './styles/StyledHeader';

Router.onRouteChangeStart = () => {
	NProgress.start();
};

Router.onRouteChangeComplete = () => {
	NProgress.done();
};

Router.onRouteChangeError = () => {
	NProgress.done();
};

const spanStyle = {
	color: 'red'
};

const Header = (props) => {
	return (
		<StyledHeader>
			<div className="bar">
				<Logo>
					<Link href="/">
						<a>
							Gov<span style={spanStyle}>Track</span>r
						</a>
					</Link>
					<p>Political Tracking</p>
				</Logo>
				<Nav />
			</div>
			<div className="sub-bar">
				<p>Search</p>
			</div>
		</StyledHeader>
	);
};

export default Header;
