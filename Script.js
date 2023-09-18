const circleProgress = document.querySelector(".circle-progress");
const numberOfBreaths = document.querySelector(".breath-input");
const start = document.querySelector(".start");
const instructions = document.querySelector(".instructions");
const breathsText = document.querySelector(".breaths-text");
let breathsLeft = 3;

// Watching for selected breaths from user
numberOfBreaths.addEventListener("change", () => {
  breathsLeft = numberOfBreaths.value;
  breathsText.innerText = breathsLeft;
});

// Grow/Shrink Circle
const growCircle = () => {
  circleProgress.classList.add("circle-grow");
  setTimeout(() => {
    circleProgress.classList.remove("circle-grow");
  }, 8000);
};

// Breathing Instructions
const breathTextUpdate = () => {
  breathsLeft--;
  breathsText.innerText = breathsLeft;
  instructions.innerText = "Breath in";
  setTimeout(() => {
    instructions.innerText = "Hold Breath";
    setTimeout(() => {
      instructions.innerText = "Exhale Breath Slowly";
    }, 4000);
  }, 4000);
};

// Breathing App Function
const breathingApp = () => {
  const breathingAnimtaion = setInterval(() => {
    if (breathsLeft === 0) {
      clearInterval(breathingAnimtaion);
      instructions.innerText = "Breathing session completed. Click 'Begin' to start another session!";
      start.classList.remove("button-inactive");
      breathsLeft = numberOfBreaths.value;
      breathsText.innerText = breathsLeft;
      return;
    }
    growCircle();
    breathTextUpdate();
  }, 12000);
};

// Start Breathing
start.addEventListener("click", () => {
  start.classList.add("button-inactive");
  instructions.innerText = "Get relaxed, and ready to begin breathing";
  setTimeout(() => {
    instructions.innerText = "Breathing is about to begin...";
    setTimeout(() => {
      breathingApp();
      growCircle();
      breathTextUpdate();
    }, 1000);
  }, 1000);
});

/*Clock*/


let submit = document.getElementById('submit');
let tasksDiv = document.getElementById("timers");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
if (localStorage.getItem("timing")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("timing"));
}
// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
    addTaskToArray(); // Add Task To Array Of Tasks
 // Empty Input Field
  
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  
});

function addTaskToArray() {
  // Task Data
  const task = {
    time: Date.now(),
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
   
        let start = document.createElement('button');
        start.innerHTML="START";
        div.appendChild(start);
        let reset = document.createElement('button');
reset.innerHTML="Reset";
        div.appendChild(reset);
        const h =document.createElement('input');
        h.setAttribute('type','number');
        h.setAttribute('placeholder',"HH");
        h.setAttribute('max', '23');
        h.setAttribute('min','00');
       
        const m =document.createElement('input');
        m.setAttribute('type','number');
       m.setAttribute('placeholder',"MM");
        m.setAttribute('max', '59');
        m.setAttribute('min','00');

        const s =document.createElement('input');
        s.setAttribute('type','number');
        s.setAttribute('max', '59');
        s.setAttribute('min','00');
       s.placeholder='SS';
        div.appendChild(h);
        div.appendChild(m);
        div.appendChild(s);

            if(h.value == 0 && m.value == 0 && s.value == 0){
                h.value = 0;
                m.value = 0;
                s.value = 0;
            }
        
        
start.addEventListener('click', kidnow);
function kidnow(){
    startTimer = setInterval(function() {
         if(s.value != 0){
            s.value--;
        } else if(m.value != 0 && s.value == 0){
            s.value = 59;
            m.value--;
        } else if(h.value != 0 && m.value == 0){
            m.value = 60;
            h.value--;
        }
        const timing ={
          "hh": h.value,
          "mm": m.value,
          "ss": s.value
        }
       window.localStorage.setItem("Timer", JSON.stringify(timing));
      
       
    

        return;
    }, 1000);
}


const display = document.getElementById('clock');
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    const alarmList = [];  // Stores all the alarms being set 
    const myList = document.querySelector('#myList');
    const addAlarm = document.querySelector('.setAlarm');
    const message = document.getElementById('inputted');
    // set audio for alarm
    audio.loop = true;
    let alarmTime = null;
    let alarmTimeout = null;
    
    
    // updates time every second 
    function updateTime() {
        var today = new Date();
        const hour = formatTime(today.getHours());
        const minutes = formatTime(today.getMinutes());
        const seconds = formatTime(today.getSeconds());
        const now = `${hour}:${minutes}:${seconds}`;
    
        display.innerText=`${hour}:${minutes}:${seconds}`;
        
    //     check if the alarmList includes the current time , "now"
        if(alarmList.includes(now) ){
            audio.play();
            alert(`Hey! it is ${now}`)
            setTimeout(() => {
                audio.pause();
              }, 4000);
        } 
    }
    
    // set the correct format of time
    // converts "1:2:3" to "01:02:03"
    function formatTime(time) {
        if ( time < 10 && time.length != 2) {
            return '0' + time;
        }
        return time;
    }
    
    // removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
    myList.addEventListener('click', e=> {
        console.log("removing element")
        if(e.target.classList.contains("deleteAlarm")){
            e.target.parentElement.remove();
        }    
    })
    
    
    
    // Adds newAlarm to the unordered list as a new list item on webpage
    function showNewAlarm(newAlarm){
        console.log(newAlarm);
        const html =`
        <li class = "time-list">       
            <span class="time">${newAlarm}</span>
            <span>${message.value}</span>
            <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
        </li>`
        myList.innerHTML += html
    };
    
    
    // event to set a new alarm whenever the form is submitted 
    addAlarm.addEventListener('submit', e=> {
        e.preventDefault();
        // const newAlarm = addAlarm.alarmTime.value;
        let new_h=formatTime(addAlarm.a_hour.value);
        if(new_h === '0'){
            new_h = '00'
        }
        let new_m=formatTime(addAlarm.a_min.value);
        if(new_m === '0'){
            new_m = '00'
        }
        let new_s=formatTime(addAlarm.a_sec.value);
        if(new_s === '0'){
            new_s = '00'
        }
        const newAlarm = `${new_h}:${new_m}:${new_s}`
    
        
    //     add newAlarm to alarmList
        if((newAlarm)){
            if(!alarmList.includes(newAlarm)){
                alarmList.push(newAlarm);
                showNewAlarm(newAlarm);
                addAlarm.reset();
                  message.value ="";
    
            } else{
                alert(`Alarm for ${newAlarm} already set.`);
            }
        } else{
            alert("Invalid Time Entered")
        }        
    })
    
    setInterval(updateTime, 1000);

   
reset.addEventListener('click', function(){
h.value = 0;
m.value = 0;
s.value = 0;
clearInterval(startTimer);
})


    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  
   window.localStorage.getItem("timing");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}
