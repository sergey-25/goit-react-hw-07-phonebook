import styled from "@emotion/styled/macro";
import { Form } from "formik";




export const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
`;


export const Input = styled.input``;

export const Label = styled.label`
  margin-bottom: 10px;
`;

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  padding: 10px 12px;
  margin-top: 15px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #651fff;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  text-transform: capitalize;
  &:hover,
  &:focus {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  }
`;

export const ValidationMessage = styled.div`
  font-size: 12px;
  color: purple;
  margin-top: 5px;
  margin-bottom: 5px;
`;