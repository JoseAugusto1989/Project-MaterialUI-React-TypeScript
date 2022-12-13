import styled from 'styled-components';

const Button = styled.button`
  margin-top: 50px;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  background: #a3a3a3;
  border: 2px solid #ffffff;
  border-radius: 30px;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
  padding: 10px 50px;
  cursor: pointer;
  // width: ${(p: { width?: number | string }) => p.width}px;
  type: ${(p: { type?: number | string | any }) => p.type};
`;

export default Button;
