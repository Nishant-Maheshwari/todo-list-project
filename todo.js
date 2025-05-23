  // =================== Model ===================
  
  
  let taskList = JSON.parse(localStorage.getItem("tskItems")) || [];
  let blockedWord = [];

  function addTsk(){
  let inputName = document.querySelector('.js-name');
  let name = inputName.value; 
  let inputDate = document.querySelector('.js-date');
  let date = inputDate.value;
  if(!name.trim()|| !date){
    return
  }else{
  taskList.push({
  name:name,
  date:date,
  completed:false
  })}  
  inputName.value = ""
  inputDate.value = ""
  renderUi() 
  localStrg()
  tempNotify("js-blink",taskList.length - 1, "done")
  } 

  function deleteTask (index){
    taskList.splice(index,1)
    localStrg();
    renderUi()
    }

  function clearTsk(){
    localStorage.clear() 
    taskList = [];
   renderUi()
  }


  function localStrg(){
  localStorage.setItem('tskItems',JSON.stringify(taskList))
  } 

  function saveTask(index){
  let editedName = document.querySelector(`.editedName-${index}`).value
  let editedDate = document.querySelector(`.editedDate-${index}`).value
  let originalName = taskList[index].name;
  let originalDate = taskList[index].date;
  let changedName = editedName !== originalName;
  let changedDate = editedDate !== originalDate;
  if(changedName){
    taskList[index].name = editedName;
  }
  if(changedDate){
    taskList[index].date = editedDate;
  } 
localStrg()
let taskDiv = document.querySelector(`.taskDiv-${index}`);
taskDiv.innerHTML = createHTML(taskList[index],index)

updateSingleTaskUI(index)
notifyChanges(index , changedDate ,changedName)

  
} 


  function clearTsk(){
    localStorage.clear() 
    taskList = [];
   renderUi()
  } 

    function markedAsComplete(index){
    taskList[index].completed = !taskList[index].completed 
    localStrg()
    updateSingleTaskUI(index)
  }

  // =================== View ===================
  function renderUi(){
  let html = ``;
  taskList.forEach((todo,index)=>{
    
    html += createHTML(todo,index)
  })
  document.querySelector('.js-display').innerHTML = html;

  } 
  function createHTML(todo,index){
  let name = todo.name;
  let date = todo.date;
  let isDone = todo.completed; 


  let taskStatusHtml = '';
  if(isDone){
    taskStatusHtml = `task completed`
  } 

  let buttonElement = `check`
  if(isDone){
    buttonElement = `undo`
  }
  let editVisual = ``;
if(!isDone){
  editVisual = `
  <button onclick="edit(${index})">Edit</button> 
      <button onclick="deleteTask(${index})">Delete</button>`
}

  return `<div class="taskDiv-${index}">
      <div class="name-${index}">${name}</div>
      <div class="date-${index}">${date}</div>
      ${taskStatusHtml}
      ${editVisual}
      <button onclick="markedAsComplete(${index})">${buttonElement}</button>
      <div class="js-blink-${index}"></div>
          </div>`
  }


  

  function edit(index){
  let taskDiv = document.querySelector(`.taskDiv-${index}`) 
  let currentName = taskList[index].name
  let currentdate = taskList[index].date
  taskDiv.innerHTML = `<input class="editedName-${index}" value="${currentName}">
                      <input type ="date" class="editedDate-${index}" value="${currentdate}">
                        <button onclick="saveTask(${index})">save</button>
                        <button onclick="cancelEdit(${index})">cancel</button>
                        <div class="js-blink-${index}"></div>`
                        
  } 



  


function notifyChanges(index , changedDate , changedName){
   if(changedName && changedDate){
    tempNotify("js-blink",index , "task Name and Date edited")
  }else if(
    changedName
  ){
    tempNotify("js-blink",index , "task Name edited")
  }else if(
    changedDate
  ){
    tempNotify("js-blink",index , "task Date edited")
  }
} 

 function cancelEdit(index){
    updateSingleTaskUI(index)
   }

function updateSingleTaskUI(index){
  let taskDiv = document.querySelector(`.taskDiv-${index}`);
  if(taskDiv){
taskDiv.innerHTML = createHTML(taskList[index],index)}
} 

 function tempNotify(className,index,textMsg){
    let blink = document.querySelector(`.${className}-${index}`)
    if (!blink){
      return}else{
    setTimeout(()=>{blink.innerHTML = textMsg},1000);
    setTimeout(()=>{blink.innerHTML = ""},2000);}

  }


 // ============ Controller ============
  

 
  function searchItem(){
    let searchInput = document.querySelector(`.js-search`).value
    let filter = taskList.map((todo,index)=>({...todo,originalIndex : index}))
    .filter((todo)=>{ 
      return todo.name.includes(searchInput)
}
    )
    let html = ``;
    filter.forEach((todo)=>{
    html += createHTML(todo,todo.originalIndex)
    })
    document.querySelector(`.js-display`).innerHTML = html
  }

  // function searchItem(){
  //   taskList.forEach((todo,index)=>{
  //     let searchInput = document.querySelector(`.js-search`).value 
  //     if (todo.name.includes(searchInput)){
  //       // let name = todo.name
  //       // let date = todo.date 
  //       let html = createHTML(todo,index)
  //         document.querySelector(`.js-display`).innerHTML = html
  //     } 
  //     if(todo.name !== searchInput){
  //       alert('No match')
  //     }
    
  //       })
  // } 
 
 
  renderUi()