const socket = io();

const map = L.map('map').setView([20.5937,78.9629],5);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

const busIcon = L.icon({
iconUrl:'bus.png',
iconSize:[40,40]
});

let markers = {};

socket.on("update-buses",(buses)=>{

for(const id in buses){

const {latitude,longitude} = buses[id];

if(markers[id]){

markers[id].setLatLng([latitude,longitude]);

}else{

markers[id] = L.marker(
[latitude,longitude],
{icon:busIcon}
)
.addTo(map)
.bindPopup("🚌 "+id)
.bindTooltip(id,{
permanent:true,
direction:"top",
offset:[0,-20]
});

}

}

});


/* SLIDESHOW CODE */
document.addEventListener("DOMContentLoaded", function(){

let slideIndex = 0;

function showSlides(){

let slides = document.getElementsByClassName("slide");

for(let i=0;i<slides.length;i++){
slides[i].style.display="none";
}

slideIndex++;

if(slideIndex > slides.length){
slideIndex = 1;
}

slides[slideIndex-1].style.display="block";

setTimeout(showSlides,3000);

}

showSlides();

});