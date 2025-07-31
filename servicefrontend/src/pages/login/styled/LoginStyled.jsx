import styled from "styled-components"
import { Link } from "react-router-dom"

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw; 
  /* background: url("/img/pexels-francesco-ungaro-998641.jpg") no-repeat center center fixed;
  background-size: cover; */
  background-color: #000;

  overflow: hidden;
`
export const SplineObjectWrapper = styled.div`
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw; 
  z-index: 100;
  pointer-events: none; /* Prevents interaction with the Spline object */
  background-color: transparent;
  will-change: transform, opacity; /* Improves performance during animations */
`

export const EffectDiv = styled.div`
  position: absolute;
  z-index: 300;
  width: 200em;
  height: 30em;
  bottom:-30em;
  transform: rotate(-23deg);
  background: rgba(0, 0, 0, 0);
  /* background-color:pink; */
  
  background: linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 55%);
  backdrop-filter: blur(6px);
`;

export const EffectEntire = styled.div`
  position: absolute;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  top:0;
  left:0;
  background: rgba(0, 0, 0, 0);
  /* background-color:pink; */
  background: radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 110%);
  /* backdrop-filter: blur(6px); */
`;

export const LoginForm = styled.div`
  position: absolute;
  z-index: 400;

  width: 40em;
  height: 80%;

  top: -80%;

  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px); /* 선택 */
  background: rgba(22, 22, 22, 0.7); /* 반투명 배경 */
  padding: 2rem;
  border-radius: 1em;
  text-shadow: 0 0 10px #eeeeee;

  animation : movedown 1s 1.4s ease forwards;

  @keyframes movedown {
    to {
      top:10%;
    }
  }
  @media (max-width: 768px) {
    width: 90%;
    height: 80%;
  }
`;

export const ArrowBigLeftDash = styled(Link)`
  z-index: 400;
  position: absolute;
  top: 6em;
  left: 2em;

  &:hover{
    cursor: pointer;
  }
`;

export const LogoImag = styled.div`
  width: 80%;
  height: 7em;
  overflow: hidden;
  
  img{
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`

export const InputWrapper = styled.div`
  width: 100%;
  height: fit-content;

  margin-top: 3em;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Input = styled.div`
  width: 70%;
  height: 4vh;
  display: flex;
  justify-content: center;
  flex-direction: column;

  font-size: 1.2em;

  margin-bottom: 8%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
export const InputTag = styled.input`
  padding: 0 2%;
  margin: 0;
  border: 0;
  outline: 0;
  width: 96%;
  height: 100%;

  font-size: 1em;
  background-color: transparent;
  color: ${({ equal }) => (equal ? "white" : "red")};

  &:focus + label,
  &:valid + label {
    opacity: 1;
    transform: translate(0, -120%);
  }
  &.error {
    animation: shake 0.3s ease-in-out;
    color: red;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
  }
`;

export const Label = styled.label`
  position: absolute;

  padding: 0;
  margin: 0%;

  color: #eee;
  opacity: 0.6;
  transition: all ease 0.3s;
`;
export const UnderLine = styled.div`
  width: 100%;
  height: 2px;

  margin-top: -2%;

  background-color: white;

  box-shadow: 0 2px 3px #999;
`;
export const LoginButtonWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const LoginButton = styled.button`
  width: 70%;
  height: 4vh;

  margin-bottom: 1em;

  background-color: #161616;
  color: white;
  text-shadow: 0 0 10px #eeeeee;
  border: none;
  border-radius: 0.5em;

  font-size: 1em;

  transition: box-shadow ease 1s, background-color ease 0.3s, color ease 0.3s, text-shadow ease 0.3s;

  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #141414;
    text-shadow: 0 0 10px #141414;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;
export const SplitLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80%;
  hr{
    width: 40%;
    margin: 0 5%;
    height: 1px;
    border: none;
    background-color: #eee;
    box-shadow: 0 2px 3px #999;
  }
`;
export const GoogleLoginButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 4vh;

  margin-top: 2em;

  background-color: #f5f5f5;
  color: #000000;
  border: none;
  border-radius: 0.5em;

  font-size: 1em;

  transition: box-shadow ease 1s, background-color ease 0.3s, color ease 0.3s, text-shadow ease 0.3s;

  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
    color: #141414;
  }

  img {
    height: 100%;
    
    aspect-ratio: 1 / 1;
    margin-right: 0.5em;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;


export const A = styled(Link)`
  position: absolute;
  bottom: 3em;
  
  color: #eee;
  text-decoration: none;
  font-size: 1em;
  margin-top: 1em;
  transition: color ease 0.3s;

  &:hover {
    color: #d9d9d9;
    text-decoration: underline;
  }
`;