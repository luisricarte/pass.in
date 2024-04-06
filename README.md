# PROJETO PASS.IN 💳
_O projeto do pass.in foi desenvolvido durante o <NLW/> UNITE que aconteceu durante o dia 01/04/2024 até 07/04/2024._
![image](https://github.com/luisricarte/pass.in/assets/62070412/3aacaeab-a5fe-4f65-ac00-010036f7c66c)


O PASS.IN consiste em um projeto de gestão de participantes e as funcionalidades que foram trabalhadas foram:
 - Construção e Persistência de URL
 - Uso de estados e useEffect
 - Construção de componentes em **TSX**
 - Paginação

Para o funcionamento dos dados o PASS.IN consome um backend em [nodeJS](https://github.com/rocketseat-education/nlw-unite-nodejs) para adicionar os participantes e permite que sejam feitas buscas e navegação por esses dados.


## Interface
![image](https://github.com/luisricarte/pass.in/assets/62070412/3d09d283-f6ac-497d-8f9c-9f98799c094f)


## Tecnologias Utilizadas
- REACTJS 
- TYPESCRIPT (TSX)
- TAILWINDCSS

## Getting Started
1. Clone o projeto
```
git clone https://github.com/luisricarte/pass.in.git
```
2. Acesse a pasta

```
cd pass.in
```
3. Baixe as dependências do projeto

```
npm i
```
4. Suba a aplicação
```
npm run dev
```
5. A aplicação não contém dados mockados. Para levantar a aplicação com dados é necessário também configurar o backend NODEJS. Pode ser encontrado no link a seguir: [nodeJS backend](https://github.com/rocketseat-education/nlw-unite-nodejs)


## Adicionando dados
1. Clone a aplicação
2. Acesse a pasta
3. Baixe as dependências
```
npm i
```
4. Adicione o arquivo .env com o conteúdo
```
DATABASE_URL ="file:./dev.db"
```
5. Depois adicione os dados
```
npx prisma db seed
```
