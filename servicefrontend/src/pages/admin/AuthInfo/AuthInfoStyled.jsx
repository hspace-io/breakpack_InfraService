import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  color: #ffffff;
  background-color: #0d0d2b;
  min-height: 100vh;
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.75rem;
  background-color: transparent;
  color: #ffffff;
`;

export const Th = styled.th`
  padding: 1rem;
  background-color: #1a1a3d;
  color: white;
  text-align: center;
  font-weight: 600;
  border-bottom: 2px solid #333;
`;

export const Td = styled.td`
  padding: 0.75rem;
  background-color: #13132b;
  text-align: center;
  border-radius: 0.5rem;

  input {
    background-color: #0d0d2b;
    border: 1px solid #555;
    color: #ffffff;
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
    width: 90%;
    text-align: center;
  }

  button {
    margin: 0 0.25rem;
    padding: 0.45rem 0.9rem;
    border: none;
    background-color: white;
    color: #000;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #00cccc;
    }
  }
`;

export const BackButton = styled.button`
  margin-bottom: 1.5rem;
  padding: 0.6rem 1.2rem;
  background-color: #00ffff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #00cccc;
  }
`;