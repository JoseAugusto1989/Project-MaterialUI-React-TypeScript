import styled from 'styled-components';

export const Body = styled.body`
  background-color: #484747;
`;

export const ContainerMain = styled.div`
  display: flex;
  text-align: center;
  border-radius: 8px;
  padding: 40px 360px 0 360px;
  @media (max-width: 1100px) {
    padding: 140px 0 0 0;
  }
  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    padding: 20px 0 0 0;
  }
  @media (max-width: 400px) {
    width: 20%;
    flex-direction: column;
    padding: 20px 0 0 0;
  }
`;

export const ContainerRegister = styled.div`
  background-color: white;
  display: block;
  text-align: center;
  border-radius: 8px 8px 8px 8px;
  border: 1px solid #000000;
  box-shadow: 2px 2px 10px;
  padding: 100px 100px 50px 100px;
`;

export const TextContainerLeft = styled.h2`
  margin-top: 0px;
  font-size: 16px;
  line-height: 50px;
  text-align: center;
  padding: 20px;
  color: white;
`;

export const ContainerLeft = styled.div`
  background-color: ${(p: { color?: string }) => p.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  text-align: center;
  padding: 60px;
  border-radius: 8px 0 0 8px;
  border: 1px solid #000000;
  box-shadow: 2px 2px 10px;
  @media (max-width: 1100px) {
    padding: 80px 0 0 0;
  }
  @media (max-width: 600px) {
    display: inline;
    align-items: flex-start;
    border-radius: 8px 8px 0 0;
    width: 100%;
  }
`;

export const ContainerRight = styled.div`
  background-color: ${(p: { color?: string }) => p.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  text-align: center;
  padding: 60px;
  border-radius: 0 8px 8px 0;
  box-shadow: 2px 2px 10px;
  border: 1px solid #000000;
  @media (max-width: 1100px) {
    display: inline;
    align-items: flex-start;
    width: 100%;
    border-radius: 0 0 8px 8px;
  }
`;

export const LetterContainer = styled.h1`
  margin-top: 60px;
  font-size: 34px;
  color: #484747;
  text-align: center;
`;

export const LetterData = styled.h2`
  font-size: 18px;
  line-height: 22px;
  color: #aaa9a9;
  text-align: center;
  margin-bottom: 40px;
`;

export const DivTest = styled.div`
  margin: 5px;
`;

export const LetterLogo = styled.h1`
  margin-top: 60px;
  color: white;
  letter-spacing: -2px;
  text-align: center;
`;

export const Input = styled.input`
  background: #e8e8e8;
  border: none;
  font-size: 20px;
  width: 80%;
  height: 60px;
  color: #747373;
  outline: 0;
  border-radius: 8px;
  text-align: center;
`;

export const Select = styled.select`
  background: #e8e8e8;
  border: none;
  font-size: 20px;
  width: 80%;
  height: 60px;
  color: #747373;
  outline: 0;
  border-radius: 8px;
  text-align: center;
`;

export const ContainerDark = styled.div`
  background-color: '#484747';
`;
