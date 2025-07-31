import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color:black;

  padding-top: 3em;

  overflow-x: hidden;
  overflow-y: auto;
  
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
export const DescriptWrapper = styled(motion.div)`
  position:relative;
  width: 90%;
  height: fit-content;
  margin: 2em;
  background: #0d1117;
  padding: 1rem;
  border-radius: 10px;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  box-shadow: 0 0 20px #e3e3e350;

  transition: all ease 0.3s;
  
  h2{
    margin-bottom: 1em;
  }
  ul{
    margin-left: 3em;
  }

  button{
    position:absolute;
    right: 3em;
    top: 1em;
  }
`;
export const ContainerWrapper = styled.div`
  position: relative;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const Container = styled.div`
  width: 50%;
  height: fit-content;
  min-height: 40em;
  margin: 0 3em;
  background: #0d1117;
  padding: 2rem;
  border-radius: 10px;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  box-shadow: 0 0 20px #e3e3e350;

  transition: all ease 0.3s;
  
  h2{
    margin-bottom: 1em;
  }
`

export const Input = styled.input`
  width: 100%;
  padding: 1em;
  margin: 1em 0;
  border-radius: 6px;
  background: #161b22;
  border: 1px solid #30363d;
  color: white;
  font-size: 0.8em;

  outline: none;


  transition: all ease 0.3s;

  &:focus{
    box-shadow:0 0 20px #e3e3e350;
  }
`

export const InputOneline = styled.input`
  width: 100%;
  padding: 1em;
  margin: 1em 0;
  border-radius: 6px;
  background: #161b22;
  border: 1px solid #30363d;
  color: white;
  font-size: 0.8em;

  outline: none;


  transition: all ease 0.3s;

  overflow-x: auto;

  &:focus{
    box-shadow:0 0 20px #e3e3e350;
  }
`

export const TextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  min-width: 95%;
  padding: 1em;
  margin: 1em 0;
  border-radius: 6px;
  background: #161b22;
  border: 1px solid #30363d;
  color: white;
  font-size: 0.8em;
  
  outline: none;


  transition: all ease 0.3s;

  &:focus{
    box-shadow:0 0 20px #e3e3e350;
  }
`

export const Button = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #00f0ff, #7f00ff);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  font-size: 0.7em;
  margin-top: 1em;
  &:hover {
    transform: scale(1.05);
  }
`

export const ResultBox = styled.div`
  background: #10151d;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 8px;
  border: 1px solid #333;
  overflow: auto;

  li{
    margin: 0.5em;
  }
  p{
    margin: 0.1em;
  }
`


export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContent = styled.div`
  background: #0d1117;
  padding: 2rem;
  border-radius: 10px;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 0 20px #00f0ff60;
  white-space: pre-wrap;
  
  pre{
    background-color:#1d1d1d;
    padding: 1.3em;
    border-radius: 1em;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
`;

export const AnimatedContainer = styled(motion.div)`
  width: 50%;
  height: fit-content;
  min-height: 40em;
  margin: 0 3em;
  background: #0d1117;
  padding: 2rem;
  border-radius: 10px;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  box-shadow: 0 0 20px #e3e3e350;

  transition: all ease 0.3s;

  h2{
    margin-bottom: 1em;
  }
`;