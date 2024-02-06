import styled from "styled-components";

export const Input = styled.input`
  background-color: transparent;
  border: 2px solid #1d504c;
  border-radius: 4px;
  padding: 16px;
  font-size: 14px;
  font-weight: 700;
  z-index: 100;
  cursor: pointer;

  &:focus,
  &:active,
  &:not(:placeholder-shown) {
    + label {
      font-size: 12px;
      background-color: #fffeeb;
      border: 2px solid #fffeeb;
      top: -7px;
      left: 23px;
      margin: 0;
      transform: none;
      z-index: 110;
    }

    cursor: text;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 16px;
  transition: top 0.2s ease-in-out, font-size 0.2s ease-in-out;
  z-index: 90;
`;

export const FieldAreaWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;
