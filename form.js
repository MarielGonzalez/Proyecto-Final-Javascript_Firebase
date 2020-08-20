//Navegar entre Ventanas:
function move() {
    document.getElementById("registry").style.display = 'none';
    document.getElementById("login-section").style.display = 'block';
}
//funcion para ir al registro
function back() {
    document.getElementById("registry").style.display = 'block';
    document.getElementById("login-section").style.display = 'none';
}


//Inicio de los servicios de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBZsnNE6_v0mksSLlwNe_zZdpLSFaMSPJw",
    authDomain: "usuario-8c66d.firebaseapp.com",
    databaseURL: "https://usuario-8c66d.firebaseio.com",
    projectId: "usuario-8c66d",
    storageBucket: "usuario-8c66d.appspot.com",
    messagingSenderId: "828916217937",
    appId: "1:828916217937:web:c5ed45388c59a2b9eaa070"
};

firebase.initializeApp(firebaseConfig);



//Referencia de los servicios de base de datos 
var database = firebase.database();
var db = firebase.firestore();

//Funcion para registrar un usuario

let name = document.getElementById("inputName").value;
let email = document.getElementById("inputEmail").value;
let passw = document.getElementById("inputPsswd").value;

function signUp() {

    name = document.getElementById("inputName").value;
    email = document.getElementById("inputEmail").value;
    passw = document.getElementById("inputPsswd").value;
    if (email == "" || passw == "" || name == "") {
        alert('Empty Fields')
        clearUser()

    } else {
        firebase.auth().createUserWithEmailAndPassword(email, passw)
            .then(res => {
                document.getElementById("registry").style.display = 'none';
                console.log(res.user)
                db.collection('UserProfile')
                    .add({
                        uid: res.user.uid,
                        nombre: name,
                        email: res.user.email,
                        foto: res.user.photoURL,

                    })
                alert('Usuario Registrado Correctamente: ' + name)

                savedProfile(res.user)

            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorMessage)
            });

        clearUser()

    }
}

// funcion para loguearse
function login() {

    const logemail = document.getElementById("loginEmail").value;
    const logpassw = document.getElementById("loginPsswd").value;

    firebase.auth().signInWithEmailAndPassword(logemail, logpassw).then(m => {
        console.log(m)
        alert('Usted ha iniciado sesion')


    }).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Contraseña Erronea.');
        } else if (errorCode === '-Not found authentication user' || errorCode === 'auth / invalid-mail') {
            alert('Correo invalido')
        } else { alert(errorMessage) }
        console.log(error);

        console.log(errorMessage)
    });



};

//login con google
function googleLogin() {
    var user = firebase.auth().currentUser;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(r => {
        console.log('Listo')
        console.log(r.user)
        db.collection('UserProfile').doc()
            .set({
                uid: r.user.uid,
                username: r.user.displayName,
                email: r.user.email,
                foto: r.user.photoURL,

            })
        alert('Usuario Registrado Correctamente: ' + name)

        savedProfile(r.user)

    })

}

//Repetir los usuarios en la base de datos realtime
function savedProfile(user) {
    //let name = document.getElementById("inputName").value;
    //nombre = getId('inputName')
    let usuario = {
        uid: user.uid,
        username: user.displayName || name,
        email: user.email || email,
        foto: user.photoURL || 'foto',
        conversation: {
            sender: 'undefined',
            messages: 'undefined'
        }
    }
    firebase.database().ref('Profile/' + user.uid).set(usuario)


}
// refresca los inputs del formulario
function clearUser() {
    const name = document.getElementById("inputName").value = '';
    email = document.getElementById("inputEmail").value = '';
    passw = document.getElementById("inputPsswd").value = '';
}
//listener de eventos de usuario en linea


let imageElement = document.querySelector('#image');
let showName = document.querySelector('#displayName');
let showStatus = document.querySelector('#aboutMe');
let showContact = document.querySelector('#UserFriend');
let showEmail = document.querySelector('#messageFriend');
let key = firebase.database().ref('Profile/' + user.uid + '/Contactos/').push().key;

firebase.auth().onAuthStateChanged(function(user) {


    if (user) {
        firebase.database().ref('Profile/' + user.uid).on('value', function(s) {
            var d = s.val()
            showName.innerHTML = `<p>${d.username}</p>`
            showStatus.innerHTML = `<p>${d.aboutMe}</p>`
            imageElement.src = d.foto

        })


        firebase.database().ref('Profile/' + user.uid + '/Contactos' + '/' + key).on('child_added', function(s) {
            var c = s.val()
            console.log(c)
            showContact.innerHTML = `${c.username}`
            showEmail.innerHTML = `${c.email}`


        })

        //const logout = document.getElementById('out')
        document.getElementById("registry").style.display = 'none';
        document.getElementById("login-section").style.display = 'none';
        document.getElementById("fondo").style.display = 'none';
        document.getElementById("nav").style.display = 'block';
        document.getElementById("dashboard").style.display = 'block';


    } else {
        document.getElementById("registry").style.display = 'none';
        document.getElementById("nav").style.display = 'none';
        document.getElementById("dashboard").style.display = 'none';
        document.getElementById("login-section").style.display = 'block';

    }
    if (foto == null) {
        imageElement.src = user.photoURL
    }




})

// boton para cerrar sesion
function logOut() {
    firebase.auth().signOut().then(function() {
        alert('Saliendo de Sesion')
        document.getElementById("registry").style.display = 'block';
        document.getElementById("login-section").style.display = 'none';
        document.getElementById("fondo").style.display = 'block';
        logout.classList.add('hide')

        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });

}

//actualizar, editar estatus 
function updateAboutMe() {
    var user = firebase.auth().currentUser;
    let newStatus = document.getElementById("newStatus").value
    firebase.database().ref('Profile/' + user.uid).update({
        aboutMe: newStatus
    }).then(alert('Estado Actualizado'))

}

//Actualizar Username
let updateUsername = () => {
        let user = firebase.auth().currentUser
        let newUsername = document.querySelector("#newUsername").value
        firebase.database().ref('Profile/' + user.uid).update({
            username: newUsername
        }).then(alert('borrado'))
    }
    //Actualizar Contraseña
function updatePass() {
    var user = firebase.auth().currentUser;
    let newPassword = document.getElementById('newPass').value
    user.updatePassword(newPassword).then(function() {
        alert('Password updated')
    }).catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message, error.code)
    });
}
//Actualizar foto de perfil
function updatePhoto() {
    var user = firebase.auth().currentUser;

    const file = document.querySelector('#fotoPerfil').files[0];
    const namePhoto = new Date() + '-' + file.name
    if (!file) {

    } else {
        const ref = firebase.storage().ref('/userProfile/' + user.uid);
        const metadata = {
            contentType: file.type
        }
        const task = ref.child(namePhoto).put(file, metadata);

        task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
                alert('photo updated')
                var downloadURL = url
                imageElement.src = url
                firebase.database().ref('Profile/' + user.uid).update({

                    foto: downloadURL
                })
            })
            //task.on('state_changed', function(snapshot) {
            //  .then(url => {
            //    console.log(url);
            //  alert('Imagen actualizada existosamente!');
            //})
    }
}
//Enviar mensajes
function sendMessage() {
    let message = document.getElementById('message').value
    let user = firebase.auth().currentUser;
    db.collection("Conversations").add({
        sender: user,
        messages: message
    }).then(result => {
        //alert('Mensaje Enviado')
        message = ""

    })
}
//Dibujar las burbujas de chat en la conversacion
let youChat = document.getElementById('otherMessage')
let myChat = document.getElementById('myMessage');


(() => {
    db.collection("Conversations").onSnapshot((doc) => {
        myChat.innerHTML = ""
        youChat.innerHTML = ""

        for (let i of doc.docs) {
            if (i.data().sender == firebase.auth().currentUser.displayName) {

                myChat.innerHTML += ` 
                
                <div class="message-text">
                <p><b>${i.data().messages}</b></p><div class="created-date" id="fecha" style="color:white"> ${h +':'+ n} <span onclick="deleteChat('${i.id}')" style="color:#d1cac6;cursor: pointer;" alt="delete conversations"><svg width="1em" height="1em" viewBox="0 0 16 16 " class="bi bi-trash-fill " fill="currentColor " xmlns="http://www.w3.org/2000/svg ">
                <path fill-rule="evenodd " d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8
5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> 
            </span>`

            } else {
                youChat.innerHTML +=
                    ` 
                    <div class="message-text">          
                <p><b>${i.data().messages}</b></p> <div class="created-date" id="fecha" style="color:black"> ${h +':'+ n} </div>
                </div>
            `
            }







        }
    })
})();





let sendPic = () => {
    var user = firebase.auth().currentUser;
    let fileChat = document.querySelector('#fotoChat').files[0];
    const namePhoto = new Date() + '-' + fileChat.name


    if (!fileChat) {

    } else {
        const ref = firebase.storage().ref('/ChatPictures/' + user.uid);
        const metadata = {
            contentType: fileChat.type
        }
        const task = ref.child(namePhoto).put(fileChat, metadata);

        task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
            firebase.database().ref('Profile/' + user.uid).on('value', function(s) {
                var snap = s.val()

                var downloadURL = url
                firebase.database().ref('Chat_Pictures/' + user.uid).set({
                    sender: snap.username,
                    image: downloadURL
                })

                db.collection("Chat_Pictures").add({
                    sender: snap.username,
                    image: downloadURL
                }).then(result => {
                    alert('Mensaje Enviado')

                })

            })



        })
    }
}

//Dibujar las burbujas de chat en la conversacion
let pic = document.getElementById('pictures');
let fecha = new Date()
var n = fecha.getUTCMinutes();
var h = fecha.getUTCHours();

(() => {
    db.collection("Chat_Pictures").onSnapshot((doc) => {
        pic.innerHTML = ""

        for (let i of doc.docs) {

            pic.innerHTML += ` 
            <div class="message-text"><img src="${i.data().image}" width="500px" height="500px">  <div onclick="deletePhoto('${i.id}')" style="color:#d1cac6;    cursor: pointer;" alt="delete conversations"><svg width="1em" height="1em" viewBox="0 0 16 16 " class="bi bi-trash-fill " fill="currentColor " xmlns="http://www.w3.org/2000/svg ">
            <path fill-rule="evenodd " d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8
5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
        </svg>  ${h +':'+ n} </div> 
            </div>
                    
                                  
                `;

        }
    })
})();

//Borrar chat y fotos

let deleteChat = (id) => {
    db.collection("Conversations").doc(id).delete().then(function() {
        //alert('Borrado');
    }).catch(function(error) {
        console.log('Error', error)

    })

}



let deleteAll = () => {
    db.collection("Conversations").get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete().then(() => {
                    console.log("Documento eliminado con éxito!");
                }).catch(function(error) {
                    console.error("Error eliminando documento: ", error);
                });
            });
        })
        .catch(function(error) {
            console.log("Error Obteniendo Documentos: ", error);
        })
}

let deletePhoto = (id) => {
    db.collection("Chat_Pictures").doc(id).delete().then(function() {
        //alert('Borrado');
    }).catch(function(error) {
        console.log('Error', error)

    })


}

//Añadir Contactos
let addFriend = () => {
    var user = firebase.auth().currentUser;

    let contactEmail = document.getElementById('contactEmail').value
    firebase.app().database().ref('Profile').orderByChild('email')
        .equalTo(contactEmail).once("value", snapshot => {

            if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log(userData);
                firebase.database().ref('Profile/' + user.uid + '/Contactos' + '/' + key).set(userData).then(alert('Contacto Añadido'))


            } else {
                console.log('Usuario Inexistente')
            }
        });
}