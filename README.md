# QuizApp

Aplicación para realizar encuestas multiple choices, con MongoDB, PHP ( Mini Framework Uff ), React

Proyecto funcional, el primer usuario creado será **administrador**.

```bash

git clone https://github.com/ufedev/QuizApp.git

```

Se debe tener MongoDB instalado y cambiar en el archivo config la ruta real

```php
// ./config/db.php
<?php


use MongoDB\Client as MongoDB;



$str_con = "mongodb://localhost:27017";// <-- URL mongoDB

$client = new MongoDB($str_con);

try {

    $client->selectDatabase("parcial3")->command(['ping' => 1]);
} catch (Exception $e) {
    exit;
}


```

### Hay que configurar la ruta que va a usar tanto el front para las llamadas como el backend para ejecutarse
```js
//  src/constantes.jsx

const URL = "192.168.1.46" // <-- Ruta  de llamadas para modificar

export default URL

```
Luego de modificar ejecutar 

```bash

npm run dev:esbuild

```

### En el backen hay que modificar 

```php
// config/const.php

<?php


const URL = "192.168.1.46"; // <-- Misma ruta que en el front


```

## Para correr el proyecto una vez realizado lo anterior

**_Se requiere Componser y Node instalados en el sistema_**  
_PHP>8.0_

```bash
composer install
npm install
```

#### Scripts:

para ejecución local

```bash

npm run dev:php
npm run dev:esbuild

```

El segundo comando solo si se desea modificar los datos de la carpeta **_src_**

Debe abrirse el proyecto con LiveServer para actualización de los cambios
