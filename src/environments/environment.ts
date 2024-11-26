// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  version: require('package.json').version,

  date: require('package.json').date,

  auth_api: 'http://localhost:8080/',

  username: 'user', // Substitua pelo seu nome de usuário
 
  password: 'password',

  local: 'http://localhost:4200/'

};

