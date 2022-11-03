Projeto de cadastro usando React TS e Material-UI

Inicio do projeto:
npx create-react-app nomeProjeto --template typescript

Instalação do React Router Dom na versão mais atual 6:
npm install react-router-dom@6
https://reactrouter.com/en/v6.3.0/getting-started/installation

Instalação do Material UI v5 framework UI para estilizar os componentes:
npm install @mui/material @emotion/react @emotion/styled
https://mui.com/pt/

Configurando a fonte 'Roboto' no arquivo index.html no 'head':

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>

Configurando os ícones de fonte:

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>

Instalação ods ícones SVG:
npm install @mui/icons-material

Instalação Emotion para estilização no React:
npm install @emotion/react
npm install @emotion/styled

Instalação do ESlint para identar e organizar o código de um mesmo formato:
npx eslint --init
Inserir esta linha de comando no arquivo: .eslintrc.json:
"react/react-in-jsx-scope": "off" 

Instalar o json-server para simular uma backend
npm i json-server

Instalação do Axios para fazer requisições do backend
npm i axios