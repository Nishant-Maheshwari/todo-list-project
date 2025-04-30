let taskList = JSON.parse(localStorage.getItem("tskItems")) || [];
// data mamagement
function addTsk(){
let inputName = document.querySelector('.js-name');
let name = inputName.value; 
let inputDate = document.querySelector('.js-date');
let date = inputDate.value;
taskList.push({
name:name,
date:date
})  
inputName.value = ""
inputDate.value = ""
renderUi() 
localStrg()
} 
function localStrg(){
localStorage.setItem('tskItems',JSON.stringify(taskList))
} 
function clearTsk(){
  localStorage.clear() 
  taskList = [];
  renderUi()

  
}
// Dom
function renderUi(){
let html = ``;
taskList.forEach((todo,index)=>{
  let name = todo.name;
  let date = todo.date;
  html += `<div class="taskDiv-${index}">
    <div class="name-${index}">${name}</div>
    <div class+"date-${index}">${date}</div>
    <button onclick="edit(${index})">Edit</button> 
    <button onclick="deleteTask(${index})">Delete</button>
         </div>`
})
document.querySelector('.js-display').innerHTML = html;
localStrg()
} 

function deleteTask (index){
  taskList.splice(index,1)
  renderUi()
  }

function edit(index){
let taskDiv = document.querySelector(`.taskDiv-${index}`) 
let currentName = taskList[index].name
let currentdate = taskList[index].date
taskDiv.innerHTML = `<input class="editedName-${index}" value="${currentName}">
                     <input type ="date" class="editedDate-${index}" value="${currentdate}">
                      <button onclick="saveTask(${index})">save</button>
                      <button onclick="cancelEdit()">cancel</button>`
} 



function saveTask(index){
let editedName = document.querySelector(`.editedName-${index}`).value
let editedDate = document.querySelector(`.editedDate-${index}`).value
taskList[index].name = editedName;
taskList[index].date = editedDate;
renderUi()
} 

function cancelEdit(){
  renderUi()
}

function searchItem(){
  taskList.forEach((todo,index)=>{
    let searchInput = document.querySelector(`.js-search`).value 
    if (searchInput === todo.name){
      let name = todo.name
      let date = todo.date 
      let html = `<div class="taskDiv-${index}">
    <div class="name-${index}">${name}</div>
    <div class="date-${index}">${date}</div>
    <button onclick="edit(${index})">Edit</button> 
    <button onclick="deleteTask(${index})">Delete</button>
         </div>`
         document.querySelector(`.js-display`).innerHTML = html
    }
   
      })
}
renderUi()