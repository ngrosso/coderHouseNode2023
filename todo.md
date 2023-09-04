# Lista de TODOs para realizar para la entrega final

## Lista de requerimientos a terminar
- [x] Agregar uso de commander para agregar productos y usuarios
- [x] Implementar user validation (Create y Update)
- [x] Implementar login validation
- [x] Implementar middleware de Error handler con zod
- [x] Implementar docker
- [x] Implementar usuario premium
- [ ] Agregar mas casos de prueba para los endpoints
- [x] Revisar logs que no funcionan
- [ ] Agregar Multer para el profile del usuario en post y put
- [ ] Agregar Multer para productos y reemplace la forma que se manejan los thumbnails
- [ ] Mejorar Readme
- [ ] Email avisando la baja del producto al owner

## Apuntes de la entrega final del profe
- [x] 1. API Users y API Roles. En donde Se necesita el comando principal para agregar un usuario administrador. (Tendria que agregar un user nuevo y con el role admin.) El role Admin pueden ignorarlo en caso de que esten usando una propiedad llamada isAdmin. 
- [x] 2. Crear un cron con https://www.npmjs.com/package/node-cron para hacer eliminacion logica cada dos dias a los usuarios que no se hayan conectado. Crear un metodo en el manager del usuario para hacer la bajada logica. 
- [x] 3. Flujo de compras (con checkout) pero sin vistas. 
- [x] 4. Pueden usar glitch o railway para desplegar la aplicacion. 
- [ ] 5. Entregar una collection de postman con todos los endpoints y los ejemplos. Tambien es posible entregarlo con swagger. 