const addButton = document.querySelector('.add');
const removeButton = document.querySelector('.remove');

const currentCupsEl = document.querySelector(".current-cups");
const currentLitersEl = document.querySelector(".current-liters");
const currentPercentageEl = document.querySelector(".current-persentage");
const progressArea = document.querySelector(".progress");



const Maz_Cups = 10;
const Min_Cups = 0;
const ONE_Cup = 1;
 



    let cups = 0;
    let liters = 0;
    let percentage =0;

   let InfoAboutCups = [];

   Modified = JSON.parse(localStorage.getItem('InfoAboutCups'));
   if (Modified != null) { 
   percentage = (Modified.HMCups/Maz_Cups) * 100;
    currentCupsEl.textContent = `${Modified.HMCups}/10`;
currentLitersEl.textContent =`${Modified.HMliters /1000} l/2.5l`;
currentPercentageEl.textContent = `${percentage}%`;
progressArea.style.height = `${percentage}%`;
console.log(Modified);

 cups += Modified.HMCups ;
 
liters += Modified.HMliters;
percentage = (cups/Maz_Cups) * 100;
   } 

    

const infoAboutCups = {
    HMCups: cups,
    HMliters: liters
    }
    
addButton.addEventListener('click', addCup);
removeButton.addEventListener('click', RemoveCup);

function addCup(){
cups++;
liters += 250;
percentage = (cups/Maz_Cups) * 100;
infoAboutCups.HMCups++;
infoAboutCups.HMliters += 250;

currentCupsEl.textContent = `${cups}/10`;
currentLitersEl.textContent =`${liters /1000} l/2.5l`;
currentPercentageEl.textContent = `${percentage}%`;
progressArea.style.height = `${percentage}%`;

localStorage.setItem('InfoAboutCups', JSON.stringify(infoAboutCups));
if (cups === Maz_Cups) {
    addButton.disabled = true;

}  else {
    removeButton.disabled = false;
}

}


function RemoveCup(){
cups--;
liters -= 250;
percentage = (cups/Maz_Cups) * 100;
infoAboutCups.HMCups--;
infoAboutCups.HMliters -= 250;

currentCupsEl.textContent = `${cups}/10`;
currentLitersEl.textContent =`${liters /1000} l/2.5l`;
currentPercentageEl.textContent = `${percentage}%`;
progressArea.style.height = `${percentage}%`;


localStorage.setItem('InfoAboutCups', JSON.stringify(infoAboutCups));
if (cups === Min_Cups) {
    removeButton.disabled = true;

}
else {
    addButton.disabled = false;
}

}
