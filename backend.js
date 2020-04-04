localStorage.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA0NjM1IiwiaWF0IjoxNTg1ODc0NDQxfQ.YpUshYbVW9tS6PEH5II4LggeaKBetzwPXKd3wjCdQHk"

let form = document.querySelector('#form')
let invalid = document.querySelectorAll('input:invalid')
let butreg = document.querySelector('#registbut')
let butlog = document.querySelector('#login')
butreg.disabled = true



form.addEventListener("change", () =>{
    let invalid = document.querySelectorAll('input:invalid');
    
   if (invalid.length<1){
        butreg.disabled = false;
    }
    else if ( invalid.length >0){
        butreg.disabled = true;
    }
    
    
});

butreg.addEventListener("click", function(event) {
    event.preventDefault();
    let data = document.querySelectorAll('input')
    function genre(){
       let gen = data[8].checked ?  'M': 'H'
       return gen
    }
    let cdata =   {
            "nombre": data[2].value,
            "apellido": data[3].value,
            "correo": data[4].value,
            "url": data[10].value,
            "sexo":  genre(),
            "fecha": data[7].value,
            "password": data[5].value
    }
    
    let reguser = JSON.stringify(cdata)
    sendregister(reguser)
  
    
})

function sendregister(datos){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://users-dasw.herokuapp.com/api/users')
    xhr.setRequestHeader('Content-Type', 'application/json')
    console.log(localStorage.token);
    console.log(datos);
    xhr.setRequestHeader('x-auth', `${localStorage.token}`)
    xhr.send(datos)
    xhr.onload = ()=>{
        if(xhr.status != 201){
            alert(`${xhr.status} Fallo registro`)
        }
        else{
            alert("El alumno fue registrado")
        }
    }
}

butlog.addEventListener( "click", () =>{
    event.preventDefault();
    let data = document.querySelectorAll('input')

    let cdata =   {
            "correo": data[0].value,
            "password": data[1].value
    }
    
    let reguser = JSON.stringify(cdata)
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://users-dasw.herokuapp.com/api/login')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('x-auth', `${localStorage.token}`)
    xhr.send(reguser)
    xhr.onload = ()=>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo login`)
        }
        else{
            let responseJSON = JSON.parse(xhr.responseText)
            console.log(responseJSON);
            localStorage.setItem('userToken', responseJSON.token);

            window.location.href = 'consulta.html'
            console.log("Login ok");
            console.log(localStorage.getItem('userToken'));

        }
    }
})
