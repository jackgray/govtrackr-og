import styled from 'styled-components';

const Logo = styled.h1`
	@import url('https://fonts.googleapis.com/css?family=Major+Mono+Display'),
		font-size: 1rem;
	font-family: 'Major Mono Display';
	margin-left: 2rem;
	position: relative;
	z-index: 2;
	transform: 0;
	a {
		padding: 0rem 1rem;
		background: ${(props) => props.theme.white};
		color: ${(props) => props.theme.secondary};
		text-transform: full-width;
		text-decoration: none;
		font-size: 7rem;
		margin-bottom: 0;
	}
	p {
		padding: 0rem 1rem;
		background: ${(props) => props.theme.offWhite};
		color: ${(props) => props.theme.secondary};
		text-transform: full-width;
		text-decoration: none;
		font-size: 2rem;
	}
	@media (max-width: 1300px) {
		margin: 0;
		text-align: center;
	}
`;

export default Logo;
