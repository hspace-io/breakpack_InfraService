import {styled} from 'styled-components';

export const Wrapper =styled.div`
  position: fixed;

  width: 100vw;
  min-height: 100vh;

  background-color: #222222;
  padding-top: 7vh;
`;

export const MainContent = styled.div`
  position: relative;
  margin-left: ${props => props.isOpen ? '15vw' : '3vw'};
  transition: margin-left 0.3s ease-in-out;

  padding: 1em;
  max-height: 93vh;

  overflow-y: auto;
  @media (max-width: 768px) {
    margin-left: ${props => props.isOpen ? '20vw' : '10vw'};
  }
`;

export const SectionTitle = styled.div`
  font-weight: bold;
  color: #fff;
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  opacity: 0;

  animation: scaleIn 2s ease-out forwards;

  @keyframes scaleIn {
    to {
      opacity:1;
    }
  }
`;

export const CardContainter = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5em;

  width: 100%;
  height: 100%;

  padding: 1em;
  box-sizing: border-box;
`
export const Card = styled.div`
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 1.5em;
  border: 1px solid #333;
  box-shadow: 0 0 10px #000;

  display: flex;
  flex-direction: column;
  gap: 0.75em;

  color: #ccc;
  font-family: 'Courier New', monospace;
  font-size: 14px;

  width: 100%;
  height: fit-content;
  min-height: 30em;

  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1em;
    font-size: 13px;
    min-height: 24em;
  }
`;