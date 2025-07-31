import {styled} from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper =styled.div`
  width: 100vw;
  height: 7vh;

  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: -7vh;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 2em;
  animation: movebottom 0.5s forwards;

  @keyframes movebottom {
    to {
      top:0;
    }
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75em;

  @media (max-width: 600px) {
    gap: 0.25em;
  }
`;

export const A = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75em;
  text-decoration: none;
  flex-direction: row;
`;


export const Logo = styled.div`
  width: 2.5em;
  height: 2.5em;
  border-radius: 0.75em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ShieldIcon = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  mask: url('/svg/hspace-logo-Icon.svg') center/contain no-repeat;
  -webkit-mask: url('/svg/hspace-logo-Icon.svg') center/contain no-repeat;
  mask-size: cover;

  transform: translateY(0.3em);
`;

export const Title = styled.div`
  font-weight: bold;
  color: white;
  font-size: 1.25em;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const LiveBadge = styled.div`
  background-color: #0f3f2e;
  color: #29f377;
  font-size: 0.75em;
  padding: 0.25em 0.75em;
  border-radius: 1em;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Subtitle = styled.div`
  color: #aaa;
  font-size: 0.9em;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const RightSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1em;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    display: none;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

export const CompactIcons = styled.div`
  display: none;
  margin-left: auto;

  @media (max-width: 800px) {
    display: flex;
    gap: 0.5em;
    align-items: center;
    font-size: 1.2em;
    color: white;
  }
`;

export const StatusText = styled.div`
  color: #ccc;
  font-size: 0.9em;
`;

export const ConsoleButton = styled.div`
  background-color: #2d2f36;
  color: white;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  cursor: pointer;
  font-weight: bold;
`;