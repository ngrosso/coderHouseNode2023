admin:
	NODE_ENV=dev node src/command.js addUser -e nzgrosso@gmail.com -fn Nicolas -ln Grosso -p 123456 -a 29 -ia true

product:
	NODE_ENV=dev node src/command.js addProduct -t "Donas rellenas" -d "Donas rellenas de dulce de leche" -p 50 -th http://dummyimage.com/171x100.png/5fa2dd/ffffff -s 300 -c asd123 -cat Comida -st true