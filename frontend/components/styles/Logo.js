import styled from 'styled-components';

const Logo = styled.h1`
	@import url('https://fonts.googleapis.com/css?family=Major+Mono+Display'),
		font-size: 1rem;
	font-family: 'Major Mono Display';
	margin-left: 2rem;
	position: relative;
	z-index: 2;
	transform: 0;
	span {
		color: ${(props) => props.theme.primary};
	}
	a {
		background: ${(props) => props.theme.white};
		color: ${(props) => props.theme.secondary};
		text-transform: full-width;
		text-decoration: none;
		font-size: 7rem;
		margin-bottom: 0px;
		padding: 0px;
		line-height: 120px;
	}
	p {
		background: ${(props) => props.theme.offWhite};
		color: ${(props) => props.theme.secondary};
		text-transform: full-width;
		text-decoration: none;
		font-size: 2rem;
		margin-top: 0px;
		margin-bottom: 40px;
		padding: 0px;
		line-height: 0px;
	}
	@media (max-width: 1300px) {
		margin: 0;
		text-align: center;
	}
	h1 {
		heigth: 100px;
	}
`;

export default Logo;
