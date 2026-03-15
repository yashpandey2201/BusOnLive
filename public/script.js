const socket = io();

let watchId;

let drivers = {

Bus1:{id:"driver01",pass:"pass01"},
Bus2:{id:"driver02",pass:"pass02"},
Bus3:{id:"driver03",pass:"pass03"}

};

function login(){

let bus = document.getElementById("busId").value;
let id = document.getElementById("driverId").value;
let pass = document.getElementById("password").value;

if(drivers[bus].id === id && drivers[bus].pass === pass){

alert("Login Successful");

document.getElementById("startBtn").disabled=false;

document.getElementById("status").innerText="Logged In";

}else{

alert("Invalid Credentials");

}

}

function startTracking(){

let busId = document.getElementById("busId").value;

document.getElementById("status").innerText="Sharing Location";

watchId = navigator.geolocation.watchPosition((position)=>{

socket.emit("send-location",{

busId:busId,
latitude:position.coords.latitude,
longitude:position.coords.longitude

});

});

}

function stopTracking(){

navigator.geolocation.clearWatch(watchId);

document.getElementById("status").innerText="Stopped";

}