'use strict';

function myFunction(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', `https://users-dasw.herokuapp.com/api/users/${localStorage.user}`)

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-auth", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA0NjM1IiwiaWF0IjoxNTg1ODc0NDQxfQ.YpUshYbVW9tS6PEH5II4LggeaKBetzwPXKd3wjCdQHk");
    xhr.setRequestHeader("x-user-token", localStorage.getItem('userToken'));
    xhr.send()
    xhr.onload = () =>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener`)
        }
        else{
            let obj = JSON.parse(xhr.responseText)

             
            document.querySelector("[placeholder=Apellidos]").value = obj.apellido
            document.querySelector("[placeholder=Nombre]").value = obj.nombre
            document.querySelector("[placeholder=Correo]").value = obj.correo
            document.querySelector("[placeholder=Url]").value = obj.url
            document.querySelector("[placeholder=Sexo]").value = obj.sexo
            document.querySelector("[placeholder=Fecha]").value = obj.fecha
            document.querySelector("[placeholder=Password]").value = obj.password
        }
    }

}

let boton = document.querySelector("#regresar")

boton.addEventListener("click", ()=>{
    window.location.href = "consulta.html"
})