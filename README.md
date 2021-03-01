# BinarioCloud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.


# About
 Esse é um desáfio para vaga de front-end developer usando angular


## techs
- [Angular](https://angular.io/)
- [Ngxs](https://www.ngxs.io/)
- [Toastr](https://github.com/scttcper/ngx-toastr)

## Clone project

```bash
  # clonning the repository
  git clone https://github.com/robsonmvieira/challenge-binario-cloud

  # after cloned go to folder
  cd folder
  
  # install all dependencies
  npm install

```
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


# O desafio BCMovies
## Crie uma Single Page Application com Angular para avaliar filmes que estão no cinema mundial(now_playing).

API: [https://www.themoviedb.org/documentation/api)


## Usabilidade
a aplicação usa uma informação publica para recuperada do localstorage para evitar que o usuário tenha que fazer login a todo momento
usado uma lib de toast para dar feedback ao usuário quando executa ações de avaliações.

## Criatividade
  O layout foi criado em base de trabalhos demonstrados no dribble e no pinterest
## Código limpo e organização
A aplicação foi modularizada ao máximo tornando fácil o reuso de components como o CardComponent que pode ser reutilizado tanto na página de listagem como na página de filmes já avaliado pelo o usuário.
As informações sensíveis foram movidas para arquivo de environment.

## Arquitetura
Eu adicionei o padrão Flux para compartilhamento de estado tornando a store fonte única da verdade. Isolando as ações e delegando a chamada dos serviços para uma fonte única de verdade.

