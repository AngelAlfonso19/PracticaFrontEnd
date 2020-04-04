let usersArray = new Array();
let position = 1;
let counter = 0;
let fotm = document.querySelector("#form")
getUsers();

function getUsers(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', "https://users-dasw.herokuapp.com/api/users")

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-auth", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA0NjM1IiwiaWF0IjoxNTg1ODc0NDQxfQ.YpUshYbVW9tS6PEH5II4LggeaKBetzwPXKd3wjCdQHk");
    xhr.setRequestHeader("x-user-token", localStorage.getItem('userToken'));
    xhr.send()
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            showUsers(JSON.parse(xhr.responseText))
        }
    }
    
}

function showUsers(data){
    var text = "";

   data.forEach(element => {
      text += userToHtml(element)
   });

    document.getElementById("lista").innerHTML = text;

}


function userToHtml(obj) {
    //console.log(obj);
    if (obj != undefined)
        return `
    <div class="media col-8 mt-2" >
            <div class="media-left align-self-center mr-3">
                <img class="rounded-circle" style="width: inherit;" src="${obj.url!=""?obj.url:""}">
            </div>
            <div class="media-body">
                <h4>${obj.nombre} ${obj.apellido}</h4>
                <p >Correo: ${obj.correo}</p>
                <p >Fecha de nacimiento: ${obj.fecha} </p>
                <p >Sexo: ${(obj.sexo=="M")?'Masculino':'Femenino'} </p>
            </div>
            <div class="media-right align-self-center">
                <div class="row">
                    <buttom onclick=verUser("${obj.correo}") class="btn btn-primary edit"><i class="fas fa-search edit  "></i></buttom>
                </div>
                <div class="row">
                    <buttom onclick=verDetalle("${obj.correo}") href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#registro"><i class="fas fa-pencil-alt edit"></i></buttom>
                </div>
                <div class="row">
                    <buttom onclick=borrarUsuario("${obj.correo}") href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#modelId"><i class="fas fa-trash-alt  remove "></i></i></buttom>
                </div>
            </div>
        </div>
    `
}

function verDetalle(param){
    let xhr = new XMLHttpRequest();
    console.log(param);
    xhr.open('GET', `https://users-dasw.herokuapp.com/api/users/${param}`)

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-auth", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA0NjM1IiwiaWF0IjoxNTg1ODc0NDQxfQ.YpUshYbVW9tS6PEH5II4LggeaKBetzwPXKd3wjCdQHk");
    xhr.setRequestHeader("x-user-token", localStorage.getItem('userToken'))
    xhr.send()
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            let obj = JSON.parse(xhr.responseText)
            document.getElementById("me").value = obj.nombre
            document.getElementById("me2").value = obj.apellido
            document.querySelector("[type=email]").value = obj.correo
            document.querySelector("[name=up]").value = obj.password
            document.querySelector("[type=url]").value = obj.url
            localStorage.user = obj.correo;

        }
}
}

function verUser(user) {
    localStorage.user = user;
    window.location.href = 'detalle.html'
}

let act = document.querySelector("#sub1")
act.addEventListener("click", () =>{
    let mail = document.querySelector("#con").value
    let cdata =   {
        "nombre": document.querySelector("#me").value,
        "apellido": document.querySelector("#me2").value,
        "fecha": document.querySelector("#da").value,
        "password": document.querySelector("#pass").value
}
    let xhr = new XMLHttpRequest();
    xhr.open('PUT',    `https://users-dasw.herokuapp.com/api/${mail}` )
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader("x-auth", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA0NjM1IiwiaWF0IjoxNTg1ODc0NDQxfQ.YpUshYbVW9tS6PEH5II4LggeaKBetzwPXKd3wjCdQHk");
    xhr.setRequestHeader("x-user-token", localStorage.getItem('userToken'))
    xhr.send(JSON.stringify(cdata))
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            console.log("Exito");
        }
    }
})

function borrarUsuario(email) {
    document.getElementById("userdelete").removeAttribute("hidden")
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', `https://users-dasw.herokuapp.com/api/users/${email}`)
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-auth", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA0NjM1IiwiaWF0IjoxNTg1ODc0NDQxfQ.YpUshYbVW9tS6PEH5II4LggeaKBetzwPXKd3wjCdQHk");
    xhr.setRequestHeader("x-user-token", localStorage.getItem('userToken'));
    xhr.send()
    xhr.onload = function () {

        xhr.onload = () =>{
            if(xhr.status != 200){
                alert(`${xhr.status} Fallo registro de obtener`)
            }
            else{
                console.log("Exito");
            }
        }


    }

}
