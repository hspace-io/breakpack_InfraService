import styled from 'styled-components';

export const ClockWrapper = styled.div`
  background: none;
  padding: 0%.5 1.5rem;
  border-radius: 8px;
`;

export const TimeText = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: ${({ isOpen }) => (isOpen ? '2rem' : '0')};
  color: #ffffff;
  text-shadow:
    0 0 4px rgba(221, 221, 221, 0.7),
    0 0 12px rgba(176, 176, 176, 0.5),
    0 0 24px rgba(133, 133, 133, 0.3);
`;