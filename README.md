# coderHouseNode2023

**Branch main del proyecto final**

Demo de main en railway con un ejemplo: https://ngrossocoder.up.railway.app/api/products

Los ejemplos de Postman estan en `/docs`
## Configuracion
Usar `.env.example` para crear el archivo `.env.{{stage}}` con las variables de entorno necesarias. Revisar los scripts del package.json para entender el formato:
- **.env.dev** (node local con nodemon, mongo atlas)
- **.env.docker** (configuracion para docker)
- **.env.local** (node local, mongo docker)
- **.env.production** (no se usa, se configuro railway para que use test)
- **.env.test** (node local, mongo atlas desplegado en railway)
## Instalacion
Para ejecutar el proyecto, es necesario tener instalado NodeJS, NPM y ejecutar el siguiente comando.
```bash
npm install
``` 
## Ejecucion en modo desarrollo
Para ejecutar el proyecto en modo desarrollo, es necesario tener instalado NodeJS, NPM y ejecutar el siguiente comando.
```bash
npm run dev
```
## Ejecucion en modo test
Para ejecutar el proyecto en modo test, es necesario tener instalado NodeJS, NPM y ejecutar el siguiente comando.
```bash
npm start
```
## Ejecucion de tests
Para ejecutar los tests, es necesario tener instalado NodeJS, NPM y ejecutar el siguiente comando.
```bash
npm run test
```
## Ejecucion en docker
Para ejecutar el proyecto en docker, es necesario tener instalado Docker y ejecutar el siguiente comando.
```bash
npm run docker #Levanta la imagen de docker de mongo en 27018 y node en 8081
npm run dev:local #Permite la ejecucion de la consola conectando a mongo en docker
```
## Uso de commander para crear admin y productos
Usando como base Mongo Altas, cambiar el NODE_ENV al necesario para otros casos
Para crear un admin, ejecutar el siguiente comando:
```bash
make admin
#NODE_ENV=dev node src/command.js addUser -e nzgrosso@gmail.com -fn Nicolas -ln Grosso -p 123456 -a 29 -ia true
```
Para crear un producto, ejecutar el siguiente comando:
```bash
make product
#NODE_ENV=dev node src/command.js addProduct -t "Donas rellenas" -d "Donas rellenas de dulce de leche" -p 50 -th http://dummyimage.com/171x100.png/5fa2dd/ffffff -s 300 -c asd123 -cat Comida -st true
```
## Mocks de data
Se utilizo https://www.mockaroo.com/ y faker para generar los mocks de data en Atlas.
