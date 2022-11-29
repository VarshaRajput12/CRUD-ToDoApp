const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

const formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be empty";
  } else {
    console.log("succcess");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

const data = [];
const acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    Description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data)
  creatTasks();
};

const creatTasks = () => {
  tasks.innerHTML="";
  data.map((x,y)=>{
    return tasks.innerHTML += `<div id=${y}>
    <span class="fw-bold">${x.text}</span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.Description}</p>
    <span class="options">
      <i onClick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
      <i onClick = "deleteTask(this)" class="fa-solid fa-trash-can"></i>
    </span>
  </div>`;
  })
  
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id,1);
  localStorage.setItem("data". JSON.stringify(data))
  console.log(data)

};

const editTask = (e) => {
  const selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[0].innerHTML;
  textarea.value = selectedTask.children[0].innerHTML;
  deleteTask(e)
;
};


(() =>{
  data = JSON.parse(localStorage.getItem("data")) ;
  creatTasks();
  console.log(data)
})()