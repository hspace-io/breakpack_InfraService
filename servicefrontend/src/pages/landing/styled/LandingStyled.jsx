import styled from "styled-components"

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
`

export const SectionWrapper = styled.section`
  min-height: 100vh;
  padding: 4rem;
  background-color: ${({ $highlighted, $color }) =>
    $highlighted
      ? `linear-gradient(135deg, ${$color}, black)`
      : "black"};
  color: ${({ $highlighted }) => ($highlighted ? "#fff" : "#444")};
  transition: background-color 0.6s ease, color 0.6s ease;

  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
  }
`