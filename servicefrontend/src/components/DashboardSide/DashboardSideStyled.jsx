import { styled } from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 7vh;
  left: -15vw;
  width: ${({ isOpen }) => (isOpen ? '15vw' : '3vw')};
  /* width: 15vw; */
  height: 93vh;
  background-color: #151515;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: width 0.3s ease;
  overflow: hidden;

  animation: moveright 0.5s 0.4s forwards;

  @keyframes moveright {
    to {
      left:0;
    }
  }

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '70vw' : '10vw')};
  }
`;

export const ToggleButtonWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display:flex;
  justify-content:  ${({ isOpen }) => (isOpen ? 'flex-end' : 'center')};
  align-items: center;

  margin-top: 1em;
  padding-right: ${({ isOpen }) => (isOpen ? '1em' : '0')};;
  transition:all ease 0.3s;
`;

export const ToggleButton = styled.button`
  background: #1f1f1f;

  border-radius: 8px;
  font-size: 1.2rem;
  color: white;
  padding: 4px 6px;
  cursor: pointer;
  font-size: 1rem;
  border: 1px solid transparent;
  width: 90%;
  transition: all ease 0.3s; 

  width: 2em;
  aspect-ratio: 1/1;

  &:hover {
    box-shadow: 0 0 5px rgba(217, 217, 217, 0.7);
  }
`;

export const Logo = styled.h1`
  color: white;
  font-size: 1.2rem;
  padding: 20px;
  font-weight: bold;
`;

export const Menu = styled.ul`
  list-style: none;
  padding: 0 20px;
  margin: 0;
  color: #ccc;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 0.95rem;

  li {
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }
`;


export const SectionTitle = styled.h2`
  color: white;
  font-size: ${({ isOpen }) => (isOpen ? '0.95rem' : '0')};
  font-weight: bold;
  padding: 1em 1.2em 0.5em;
  margin: 0.5em 0 0.4em 0;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all 0.3s ease;
  height: fit-content;
  min-height: 3.4rem;
`;
export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  overflow-y: auto;
  overflow-x: hidden;

  max-height: 60%;
  width: 100%;
`
export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;

  width: 100%;

  gap: 0.8em;
  padding:  ${({ isOpen }) => (isOpen ? '0 1em' : '0 0.1em')};

  margin-top:  ${({ isOpen }) => (isOpen ? '0' : '2em')};
  transition: all ease 0.3s;

  overflow-x: hidden;
`;

export const StatCard = styled.div`
  background-color: #1f1f1f;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ccc;

  width: 100%;
  height: fit-content;
  min-height: 3vw;

  padding: ${({ isOpen }) => (isOpen ? '1em' : '0')};
  transition: all ease 0.8s;

  @media (max-width: 768px) {
    min-height: 60px;
    padding: ${({ isOpen }) => (isOpen ? '0.8em' : '0')};
  }
`;

export const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatLabel = styled.div`
  font-size: ${({ isOpen }) => (isOpen ? '0.85rem' : '0')};
  transition: all ease 0.3s;
  max-width: 100%;
  max-height: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: ${({ isOpen }) => (isOpen ? '0.7rem' : '0')};
  }
`;

export const StatValue = styled.div`
  font-size: ${({ isOpen }) => (isOpen ? '0.9rem' : '0')};
  transition: all ease 0.3s;
  font-weight: bold;
  max-width: 100%;
  white-space: normal;
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ isOpen }) => (isOpen ? '0.7rem' : '0')};
  }
`;

export const TailInformationArea = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding:  ${({ isOpen }) => (isOpen ? '0 1em' : '0 0.1em')};
  margin-top:  ${({ isOpen }) => (isOpen ? '0' : '2em')};
  transition: all ease 0.3s;
  bottom: 1em;
  font-size: ${({ isOpen }) => (isOpen ? '0.85rem' : '0')};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    text-align: center;
  }

  @media (max-width: 768px) {
    font-size: ${({ isOpen }) => (isOpen ? '0.7rem' : '0')};
  }
`;