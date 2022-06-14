import styled from "styled-components";

export const Button = styled.button`
  display: inline-block;
  font-size: 1em;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  margin: 1em;
  padding: 1em 2em;
  border-radius: 3px;
  display: block;
  transition: all 0.3s ease;
  background: #fff;
  border: 1px solid #1d1f22;
`;

export const ModalStyle = styled.div`
  position: absolute;
  top: 90px;
  right: 0;
  background-color: #fff;
  z-index: 1000;
  min-width: 325px;
  padding: 8px 16px 20px 16px;
  }
`;

export const OverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ModalWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  position: relative;
`;
