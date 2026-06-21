# Sistema de Pagamentos - CI com GitHub Actions

Projeto desenvolvido como Trabalho de Conclusão da Disciplina **Programação para Automação de Testes** e utilizado como base para o Trabalho de Conclusão da Disciplina de **Integração Contínua com GitHub Actions**.

## Objetivo

Este projeto tem como objetivo demonstrar a criação de uma pipeline de Integração Contínua utilizando **GitHub Actions** em um projeto JavaScript com testes automatizados.

A pipeline contempla:

* Execução automática a partir de `push`;
* Execução manual através do `workflow_dispatch`;
* Execução agendada através do `schedule`;
* Instalação das dependências do projeto;
* Inspeção simples do código;
* Execução dos testes automatizados;
* Geração de relatório de testes compatível com o framework utilizado;
* Armazenamento do relatório na própria execução da pipeline.

## Descrição do Projeto

O projeto consiste na criação de uma classe JavaScript chamada `ServicoDePagamento`, responsável por realizar pagamentos e consultar o último pagamento realizado.

Os pagamentos são armazenados em uma lista de objetos JavaScript. Cada pagamento possui as seguintes propriedades:

* `codigoBarras`;
* `empresa`;
* `valor`;
* `categoria`.

A categoria do pagamento é definida automaticamente de acordo com o valor informado:

* Quando o valor for maior que `100.00`, a categoria será `"cara"`;
* Quando o valor for menor ou igual a `100.00`, a categoria será `"padrão"`.

## Tecnologias Utilizadas

* JavaScript;
* Node.js;
* npm;
* Mocha;
* Node Assert;
* Mocha JUnit Reporter;
* GitHub Actions.

## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

* Node.js;
* npm;
* Git.

Para validar as versões instaladas, execute:

```bash
node -v
npm -v
git --version
```

## Estrutura do Projeto

```txt
sistema-de-pagamentos/
├── .github/
│   └── workflows/
│       └── trabalho-final-ci.yaml
├── src/
│   └── ServicoDePagamento.js
├── test/
│   └── ServicoDePagamento.test.js
├── package.json
├── package-lock.json
├── .gitignore
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

## Instalação do Projeto

Clone o repositório:

```bash
git clone https://github.com/Diegoindio/trabalho-pgats-ci-github-actions.git
```

Acesse a pasta do projeto:

```bash
cd trabalho-pgats-ci-github-actions
```

Instale as dependências:

```bash
npm install
```

## Scripts Disponíveis

O projeto possui os seguintes scripts configurados no `package.json`:

```json
"scripts": {
  "test": "mocha",
  "test:report": "mocha --reporter mocha-junit-reporter --reporter-options mochaFile=reports/mocha/test-results.xml"
}
```

## Como Executar os Testes

Para executar os testes automatizados localmente:

```bash
npm test
```

Esse comando executa os testes utilizando o **Mocha**.

## Como Executar os Testes com Relatório

Para executar os testes e gerar o relatório compatível com a pipeline:

```bash
npm run test:report
```

Após a execução, será gerado o arquivo:

```txt
reports/mocha/test-results.xml
```

Esse arquivo é o relatório dos testes em formato XML, gerado através do `mocha-junit-reporter`.

## Cenários de Teste

Os testes foram criados utilizando **Mocha** e **Node Assert**.

Cenários validados:

1. Deve realizar um pagamento e consultar o último pagamento;
2. Deve classificar o pagamento como `"cara"` quando o valor for maior que `100.00`;
3. Deve classificar o pagamento como `"padrão"` quando o valor for menor ou igual a `100.00`;
4. Deve retornar `null` ao consultar o último pagamento quando não houver pagamentos.

## Integração Contínua com GitHub Actions

A pipeline foi criada utilizando **GitHub Actions** e está localizada em:

```txt
.github/workflows/trabalho-final-ci.yaml
```

A pipeline foi estruturada com base nos conceitos estudados em aula, utilizando jobs separados para inspeção, execução de testes e simulação de deploy.

## Formas de Disparo da Pipeline

A pipeline possui três formas de execução:

* Execução por `push`;
* Execução manual;
* Execução agendada.

### Execução por Push

A pipeline é executada automaticamente quando ocorre um `push` na branch `main`.

```yaml
push:
  branches:
    - main
```

Esse gatilho garante que, sempre que uma alteração for enviada para o repositório, a pipeline seja executada automaticamente.

### Execução Manual

A pipeline também pode ser executada manualmente pela aba **Actions** do GitHub.

```yaml
workflow_dispatch:
```

Esse recurso permite executar a pipeline sob demanda, sem a necessidade de realizar uma nova alteração no código.

### Execução Agendada

A pipeline possui execução agendada utilizando `schedule`.

```yaml
schedule:
  - cron: '0 12 * * 1'
```

Essa configuração executa a pipeline toda segunda-feira às 12h UTC.

## Jobs da Pipeline

A pipeline possui os seguintes jobs:

```txt
inspecao -> unidade -> deploy
```

### Job `inspecao`

Responsável por clonar o projeto, configurar o Node.js, instalar as dependências e realizar uma inspeção simples de sintaxe nos arquivos JavaScript.

Comandos executados:

```bash
node --check src/ServicoDePagamento.js
node --check test/ServicoDePagamento.test.js
```

Esse job ajuda a validar se os arquivos principais do projeto não possuem erro de sintaxe.

### Job `unidade`

Responsável por executar os testes automatizados com Mocha e gerar o relatório de testes com o `mocha-junit-reporter`.

Comando executado:

```bash
npm run test:report
```

Esse comando executa os testes e gera o relatório em:

```txt
reports/mocha/test-results.xml
```

### Job `deploy`

Responsável por simular uma etapa de deploy após a execução bem-sucedida dos testes.

Comando executado:

```bash
echo 'Deploy sendo realizado...'
```

Essa etapa foi adicionada para representar uma fase final da pipeline, seguindo a ideia de uma pipeline integrada ao build do código.

## Relatório de Testes

Como o projeto utiliza **Mocha** para execução dos testes automatizados, foi utilizado o pacote **mocha-junit-reporter** para gerar um relatório em formato XML compatível com ferramentas de Integração Contínua.

O relatório é gerado em:

```txt
reports/mocha/test-results.xml
```

Na pipeline, o relatório é armazenado como artefato utilizando a action `actions/upload-artifact@v4`.

Trecho responsável pelo upload do relatório:

```yaml
- name: Salvando relatório de testes
  uses: actions/upload-artifact@v4
  if: ${{ always() }}
  with:
    path: ./reports/mocha/test-results.xml
    name: Relatório de Testes Unitários
```

Após a execução da pipeline, o relatório pode ser baixado na aba **Actions**, dentro da execução correspondente, na seção **Artifacts**.

## Pipeline Utilizada

Abaixo está a pipeline configurada para o projeto:

```yaml
# Trabalho Final - Pipeline Integrada ao Build do Código

# nome da pipeline
name: 'Trabalho Final - CI'

# gatilhos / triggers - regras de disparo
# gatilho manual = workflow_dispatch
# gatilho agendado = schedule
# gatilho por push = push

on:
  workflow_dispatch:

  schedule:
    - cron: '0 12 * * 1'

  push:
    branches:
      - main

# tarefas dentro da pipeline = jobs
jobs:
  # nome do job
  inspecao:
    # maquina onde o job vai rodar
    runs-on: ubuntu-latest

    # passos do job
    steps:
      # clone do projeto
      - uses: actions/checkout@v4

      # instalação do node
      - uses: actions/setup-node@v4
        with:
          node-version: latest

      # instalação das dependências
      - name: Instalando dependências
        run: npm install

      # inspeção simples de sintaxe do código
      - name: Inspeção de Código
        run: |
          node --check src/ServicoDePagamento.js
          node --check test/ServicoDePagamento.test.js

  unidade:
    runs-on: ubuntu-latest
    needs: [inspecao]

    steps:
      # clone do projeto
      - uses: actions/checkout@v4

      # instalação do node
      - uses: actions/setup-node@v4
        with:
          node-version: latest

      # instalação das dependências
      - name: Instalando dependências
        run: npm install

      # rodando testes unitários com relatório
      - name: Rodando testes unitários
        run: npm run test:report

      # salvando relatório dos testes
      - name: Salvando relatório de testes
        uses: actions/upload-artifact@v4
        if: ${{ always() }}
        with:
          path: ./reports/mocha/test-results.xml
          name: Relatório de Testes Unitários

  deploy:
    runs-on: ubuntu-latest
    needs: [unidade]

    steps:
      - name: Simulação de Deploy
        run: echo 'Deploy sendo realizado...'
```

## Como Executar a Pipeline

### Executar por Push

Faça uma alteração no projeto, realize o commit e envie para o GitHub:

```bash
git add .
git commit -m "Adiciona pipeline de CI com relatorio de testes"
git push origin main
```

Após o push, a pipeline será executada automaticamente.

### Executar Manualmente

Acesse o repositório no GitHub e siga o caminho:

```txt
Actions > Trabalho Final - CI > Run workflow
```

### Executar de Forma Agendada

A execução agendada ocorre automaticamente conforme a configuração do cron:

```txt
Toda segunda-feira às 12h UTC
```

## Evidência de Execução

Para a entrega do trabalho, devem ser enviados:

* URL do repositório GitHub;
* Evidência de pelo menos uma execução bem-sucedida da pipeline;
* Evidência do relatório armazenado como artefato na pipeline.

Repositório:

```txt
https://github.com/Diegoindio/trabalho-pgats-ci-github-actions
```

## Observações

A pasta `node_modules/` não deve ser versionada no GitHub.

A pasta `reports/` também não precisa ser versionada, pois o relatório é gerado automaticamente durante a execução dos testes e armazenado como artefato na pipeline.

Exemplo de `.gitignore` recomendado:

```gitignore
node_modules/
reports/
```

## Autor

Projeto desenvolvido por **Diego Gomes da Silva**.
