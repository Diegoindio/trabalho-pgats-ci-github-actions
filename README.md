# Sistema de Pagamentos

Projeto desenvolvido como Trabalho de Conclusão da Disciplina **Programação para Automação de Testes**.

## Descrição do Projeto

Este projeto consiste na criação de uma classe JavaScript chamada `ServicoDePagamento`, responsável por realizar pagamentos e consultar o último pagamento realizado.

Os pagamentos são armazenados em uma lista de objetos JavaScript. Cada pagamento possui as seguintes propriedades:

- `codigoBarras`
- `empresa`
- `valor`
- `categoria`

A categoria do pagamento é definida automaticamente de acordo com o valor informado:

- Quando o valor for maior que `100.00`, a categoria será `"cara"`;
- Quando o valor for menor ou igual a `100.00`, a categoria será `"padrão"`.

## Tecnologias Utilizadas

- JavaScript
- Node.js
- Mocha
- Node Assert

## Estrutura do Projeto

```txt
sistema-de-pagamentos/
├── src/
│   └── ServicoDePagamento.js
├── test/
│   └── ServicoDePagamento.test.js
├── package.json
└── README.md
```

## Classe Principal

A classe `ServicoDePagamento` possui dois métodos principais:

### `pagar(codigoBarras, empresa, valor)`

Responsável por realizar um pagamento e armazená-lo na lista de pagamentos.

Exemplo:

```js
servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
```

### `consultarUltimoPagamento()`

Responsável por consultar apenas o último pagamento realizado.

Exemplo:

```js
const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
console.log(ultimoPagamento);
```

Retorno esperado:

```js
{
  codigoBarras: '0987-7656-3475',
  empresa: 'Samar',
  valor: 156.87,
  categoria: 'cara'
}
```

## Exemplo de Uso

```js
import { ServicoDePagamento } from './src/ServicoDePagamento.js';

const servicoDePagamento = new ServicoDePagamento();

servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);

console.log(servicoDePagamento.consultarUltimoPagamento());
```

Saída esperada:

```js
{
  codigoBarras: '0987-7656-3475',
  empresa: 'Samar',
  valor: 156.87,
  categoria: 'cara'
}
```

## Instalação

Para instalar as dependências do projeto, execute:

```bash
npm install
```

## Como Executar os Testes

Para rodar os testes automatizados, com o Mocha, execute:

```bash
npx mocha
```

## Cenários de Teste

Os testes foram criados utilizando **Mocha** e **Node Assert**.

Cenários validados:

1. Deve realizar um pagamento e consultar o último pagamento.
2. Deve classificar o pagamento como `"cara"` quando o valor for maior que `100.00`.
3. Deve classificar o pagamento como `"padrão"` quando o valor for menor ou igual a `100.00`.
4. Deve retornar `null` ao consultar o último pagamento quando não houver pagamentos.

## Autor

Projeto desenvolvido por **Diego Gomes da Silva**.