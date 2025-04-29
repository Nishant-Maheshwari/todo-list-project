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
  html += `<div>
    <div>${name}</div>
    <div>${date}</div>
         </div>`
})
document.querySelector('.js-display').innerHTML = html;
localStrg()
} 
renderUi()