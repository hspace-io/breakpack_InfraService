import styled from "styled-components"


export const SectionWrapper = styled.section`
  height: 100vh;
  padding: 4rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  color: ${({ $highlighted }) => ($highlighted ? "#fff" : "#444")};
  background-color: ${({ $highlighted, $color }) =>
    $highlighted
      ? `linear-gradient(135deg, ${$color}, black)`
      : "black"};
  transition: background-color 0.6s ease, color 0.6s ease;
  z-index: 0;
`

export const BackgroundVid = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;


  opacity: 0;
  animation: scaleIn 2s ease-out forwards;

  @keyframes scaleIn {
    to {
      opacity:1;
    }
  }
`
export const Blackcurtain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;

  z-index: 2;

  opacity: 0;
  animation: fadeIn 1s 1s ease forwards;

  @keyframes fadeIn {
    to {
      opacity:0.6;
    }
  }
`
export const ContentsWrapper = styled.div`
  z-index: 3;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
  text-align: center;

  p {
    @font-face {
        font-family: 'KIMM_Bold';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KIMM_Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }

    font-size: 2rem;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }

    color: #fff;
    margin-top: 1rem;
    opacity: 0;
    animation: fadeInText 1s 1.5s ease forwards;
    font-family: 'KIMM_Bold';

    @keyframes fadeInText {
      to {
        opacity: 1;
      }
    }
  }
`;

export const Image = styled.img`
  animation: fadeInText 1s 1s ease forwards;

  @keyframes fadeInText {
    to {
      opacity: 1;
    }
  }
`;


export const SvgBox = styled.div`
  overflow: hidden;
  width: 700px;
  height: 120px;

  @media (max-width: 768px) {
    width: 80%;
    height: auto;
  }
  
  /* background-color:pink; */
  
  img {
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
`
export const LetstartButton =  styled.button`
  position:absolute;

  padding: 0.5rem 2rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: transparent;
  backdrop-filter: blur(6px);
  border: 2px solid white;
  border-radius: 3em;
  cursor: pointer;
  top: 80%;
  opacity:0;

  transition: all ease 0.3s;

  animation: fadeInText 1s 1.5s ease forwards;

  @keyframes fadeInText {
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    top: 85%;
    font-size: 1rem;
    padding: 0.4rem 1.5rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

`