import styled from "styled-components"
import { Link } from "react-router-dom"

export const TopbarWrapper = styled.div`
  position: fixed;
  top: -6em;
  left: 20%;
  width: 60%;
  height: 5em;
  box-shadow: 0 0 20px rgba(119, 119, 119, 0.4);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;

  border-radius: 5em;

  display: flex;
  justify-content: space-between;
  backdrop-filter: blur(20px);

  animation: movedown 0.4s 1.4s ease-out forwards;

  @keyframes movedown {
    to {
      top:4em;
    }
  }

  @media (max-width: 768px) {
    left: 10%;
    width: 80%;
    height: 4em;
    padding: 0 1rem;
  }
`

export const NavItem = styled.div`
  margin-right: 2rem;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;

  transition: all 0.3s ease;
  
  &:hover {
    text-shadow: 0 0 10px #eeeeee;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-right: 1rem;
  }
`
export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`
export const A = styled(Link)`
  color: #eee;
  text-decoration: none;
  font-size: 1em;
  margin-top: 1em;
  transition: color ease 0.3s;

  &:hover {
    color: #d9d9d9;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.9em;
    margin-top: 0.5em;
  }
`;