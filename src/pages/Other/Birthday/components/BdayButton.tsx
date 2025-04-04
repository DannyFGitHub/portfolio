import styled from "styled-components";

export const BdayButton = styled.button`
  border: "black";
  border-style: groove;
  padding: 8px;
  background: onHover ? lightblue : none;
  margin: 1rem;
  font-family: start;
  position: relative;
  pointer-events: auto;
  
  &:hover {
    filter: brightness(0.85);
  }
  
  &:active {
    scale: 1.1;
  }
`;
