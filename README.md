
# Proyecto Final (Firebase-Javascript) "Whatsapp"
[![](https://lh3.googleusercontent.com/proxy/c9Nb2tBEAnRQ6rWZBx4dCF0W9LRZUjq-NWRB7MWFF_qbk2OI0AGZuE7LhG7d3YExnNnQLvTe25zapyzgXbwFPTtBd8W3itp5KzjI__BlodS_A2ec_1vxwwZdpqzXBO1aoqwSuXTUpw)](http://https://lh3.googleusercontent.com/proxy/c9Nb2tBEAnRQ6rWZBx4dCF0W9LRZUjq-NWRB7MWFF_qbk2OI0AGZuE7LhG7d3YExnNnQLvTe25zapyzgXbwFPTtBd8W3itp5KzjI__BlodS_A2ec_1vxwwZdpqzXBO1aoqwSuXTUpw)

[![](https://firebase.google.com/images/brand-guidelines/logo-standard.png)](http://https://firebase.google.com/images/brand-guidelines/logo-standard.png)
- Esta aplicación es una simulación de una app en un entorno completamente de una red social de mensajería en tiempo real publico, modelando una versión de "WhatsApp", llamada "mineChat". 

# Caracteristicas:
1. Esta App Web esta escrita sin ningún Framework de JavaScript 
2. Emplea los servicios de registro de usuarios, base de datos en tiempo real y un servidor de archivos de la plataforma Firebase de Google.


# Herramientas:
1. Boostrap
2. HTML, CSS y JAVASCRIPT
3. Cuenta de Firebase
4. FontAwsome


#### Instalacion de Bootstrap
```html
`<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

    <title>document!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
  </body>
</html>`
 ```


# Instalacion y Configuración de Firebase

> Instalación de Firebase al proyecto

Antes de empezar en Javascript, es necesaria la configuración e inicialización de la plataforma de Firebase a nuestro proyecto. Aqui en detalle [la documentación](https://firebase.google.com/docs/web/setup) explica cómo hacerlo para proyectos web.
                    
> Consideraciones y Pasos Iniciales

- Firebase Autentication
- Firebase Realtime Database
- Firebase Cloud Firestore

### Pasos para Registrar y Administrar Usuarios

[Registro a Usuarios ](https://firebase.google.com/docs/auth/web/start)
[Acceso a Usuarios existentes](https://firebase.google.com/docs/auth/web/start)
[Creación de Base de Datos Realtime](https://firebase.google.com/docs/database/web/start)
[Creación del Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart?hl=es)


#### Reglas de Firebase Realtime 
Es necesario tener en cuenta las reglas que permiten el acceso, lectura y modificación de los datos de los usuarios al iniciar sesión.

`{
  "rules": {
    ".read": true,
    ".write": true
  }
}`

#### Reglas de Firebase Storage 
Es importante tambien el configurar las reglas que permiten el acceso para añadir contenido dentro de nuestro servidor de archivos de firebase.

`
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
    allow read, write: if request.auth == null;
      allow read, write: if request.auth!=null;}}}} 
      `

 
 
 
 #### Añadir nuestro proyecto de firebase al HTML　

```javascript
var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appID: "app-id",
}

firebase.initializeApp(firebaseConfig);
```

#### Añadir firebase al HTML

```html
<!DOCTYPE html>
<html>
    <head>
      <script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-database.js"></script>
    </head>
	
	
    <body>
        <h1>Hello world!</h1>
    </body>
	  <script src="index.js"></script>
</html>
```

----

### Añadir Firebase Storage para almacenar Fotos
Al agregar firebase storage podemos subir fotos y videos para compartirlo con todos los usuarios conectados a nuestra app, por tanto, se debe al igual que el resto de los servicios de firebase, añadirlo a nuestro HTML y de igual manera mencionar la referencia (o repositorio) donde se guardarán los datos. Para ver como configurar el repositorio, [Ver Documentación Oficial](https://firebase.google.com/docs/storage/web/start)

##### Agregar una foto de perfil
- En este caso se debe crear la etiqueta `<img>` correspondiente donde se ubicará la foto de Perfil del usuario, el cual agregará al momento de Iniciar Sesión en la App. 

##### Ubicar la foto en el repositorio  de storage firebase
- Al crear el repositorio en una variable`var storageRef = firebase.storage().ref('Ejemplo');` podemos ubicar en donde se guardarán una vez, el usuario suba sus fotos.

##### Añadir la foto en la Base de Datos
- La base de datos debe contener el campo `foto: 'url'` donde el observador de cambios hechos por los usuarios hará referencia para luego mostrarla en la etiqueta `<img id="foto">` creada.


##### Mostar Imagen en la foto de Perfil
- Para ello se debe acceder a la propiedad foto añadida en la base de datos realtime para obtener el acceso a esta una vez descargada.

##### Mostrar foto de perfil
- Al llamar la función `getDownloadURL()` obtenemos como resultado una url que podemos usar para actualizar los campos fotos de ambas base de datos en donde el usuario tiene información de su Perfil. Con el observador del Cloud Firestore `.onSnapshot()` tenemos la captura de cada actualización, la cual proyectamos en la etiqueta `<img>` el valor de la url contenida en la variable `<imageElement>` y ubicada en la propiedad `src` de esta.

##### Enviar conversación y fotos

- De  igual manera las conversaciones son enviadas por el valor de los `<input>` en la barra de mensajes y de la misma manera proyectados en el dashboard de mensajeria y replicados en las bases de datos de los Perfiles Creados.

### Cambiar Foto, Contraseña e Username

- Con el registro del perfil de usuario en la base de datos en tiempo real y en la coleccion, puedes acceder a ellas mediante un metodo en comun `update()`, accediendo a estos mediante las referencias.
 

```Javascript

   firebase.database().ref('Profile/' + user.uid).update({
        name: newName
    }).then(console.log('Name updated')) 

 db.collecion('Profiles').doc(`${user.uid}`).update({
        name: newName
    }).then(console.log('Name updated')) 


```


### Notas Finales
>Los datos enviados en el chat seran leidos en tiempo real por todo aquel que tenga acceso, en este ejemplo la mensajeria es publica para cada usuario que haya iniciado sesion.



