  let taskList = JSON.parse(localStorage.getItem("tskItems")) || [];
  let blockedWord = [];
  // data mamagement
  function addTsk(){
  let inputName = document.querySelector('.js-name');
  let name = inputName.value; 
  let inputDate = document.querySelector('.js-date');
  let date = inputDate.value;
  taskList.push({
  name:name,
  date:date,
  completed:false
  })  
  inputName.value = ""
  inputDate.value = ""
  renderUi() 
  localStrg()
  tempNotify("js-blink",taskList.length - 1, "done")
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
    
    html += createHTML(todo,index)
  })
  document.querySelector('.js-display').innerHTML = html;

  localStrg()
  } 
  function createHTML(todo,index){
  let name = todo.name;
  let date = todo.date;
  if(todo.completed){
    return `<div class="taskDiv-${index}">
      <div class="name-${index}">${name}</div>
      <div class="date-${index}">${date}</div>
      <div>Task Completed</div>
          </div>`
  }else
  return `<div class="taskDiv-${index}">
      <div class="name-${index}">${name}</div>
      <div class="date-${index}">${date}</div>s
      <button onclick="edit(${index})">Edit</button> 
      <button onclick="deleteTask(${index})">Delete</button>
      <button onclick="markedAsComplete(${index})">Check</button>
      <div class="js-blink-${index}"></div>
          </div>`
  }

  function markedAsComplete(index){
    taskList[index].completed = true 
    renderUi()
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
                        <button onclick="cancelEdit()">cancel</button>
                        <div class="js-blink-${index}"></div>`
                        
  } 



  function saveTask(index){
  let editedName = document.querySelector(`.editedName-${index}`).value
  let editedDate = document.querySelector(`.editedDate-${index}`).value
  taskList[index].name = editedName;
  taskList[index].date = editedDate;
  renderUi()
  tempNotify("js-blink",index , "task edited")

  } 

  function cancelEdit(){
    renderUi()
  }

  function searchItem(){
    taskList.forEach((todo,index)=>{
      let searchInput = document.querySelector(`.js-search`).value 
      if (todo.name.includes(searchInput)){
        // let name = todo.name
        // let date = todo.date 
        let html = createHTML(todo,index)
          document.querySelector(`.js-display`).innerHTML = html
      }
    
        })
  } 
  //dynamic function --
  function tempNotify(className,index,textMsg){
    let blink = document.querySelector(`.${className}-${index}`)
    if (!blink){
      return}else{
    setTimeout(()=>{blink.innerHTML = textMsg},1000);
    setTimeout(()=>{blink.innerHTML = ""},2000);}

  }
  renderUi()