import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 800px) {
    min-width: 200px;
    font-size: 12px;
  }
`;

export const FormContainer = styled.form`
  height: 100%;
  min-width: 500px;

  @media screen and (max-width: 800px) {
    min-width: 400px;
    font-size: 12px;
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;
