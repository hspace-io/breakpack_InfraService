import styled from "styled-components";

export const BasicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export const MonitorWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  aspect-ratio: 16 / 9;

  img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    background-color: black;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem 0 0.5rem 0;
`;

export const Parea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  height: 100%;

  p{
    margin: 0.2rem 0;
    font-size: 0.9rem;
    color: #e4e4e4;
  }
`;