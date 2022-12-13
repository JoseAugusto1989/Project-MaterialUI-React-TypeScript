import styled from 'styled-components';

export const ButtonLog = styled.button`
  margin-top: 50px;
  width: 160%;
  height: 50px;
  background: #018d01;
  border: 3px solid #ffffff;
  border-radius: 20px;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  text-transform: uppercase;
`;

export const ContainerLog = styled.div`
  padding: 0 0 45px 100px;

  @media (max-width: 600px) {
    padding: 0 50px 50px 50px;
  }
`;
