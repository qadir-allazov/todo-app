let btn = document.getElementById("btn-add");
let inpt = document.getElementById("task-inpt");
let todoInpt = document.getElementById("todo-cont");
let todosC = document.getElementsByClassName("todos-container")[0];
let error = document.getElementById("alert");
let arrEl = []; 
let filterBtn = document.getElementById("filterBtn");
let isAsc = true;
inpt.focus();

function CreateTaskElement(taskText)
{
    let elDiv = createElementFromHTML(
        `<div class="todo-container" id="todo-${arrEl.length}" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)">
         <p class="todo-input">${taskText}</p>
         <i class='bx bxs-edit task-operation-btn' onclick="editEl(this.previousElementSibling)"></i>
         <i class='bx bx-x-circle task-operation-btn' onclick="deleteEl(this.parentElement)"></i>
         <i class='bx bx-bookmark task-operation-btn' onclick="checkFavourite(this)"></i>
         </div>`);
    arrEl.push(elDiv);
    return elDiv;
}

btn.addEventListener('click', ()=> {
    addTask();
});

inpt.addEventListener('keyup', (e)=> {
    if (e.keyCode === 13)
    addTask();
});

filterBtn.addEventListener('click', ()=> {
    if(arrEl.length>1)
    {
        todosC.innerHTML = `<div class="d-flex align-items-center justify-content-center w-100 p-3">
        <div class="spinner-border text-warning" role="status"></div> <span class="sr-only ms-3">Filtering...</span> </div>`
        if(isAsc)
        {
            arrEl.sort(function(a, b) {
                if (a.innerText.trim().split('')[0] >= b.innerText.trim().split('')[0])
                return 1;
                if (a.innerText.trim().split('')[0] < b.innerText.trim().split('')[0])
                return -1;
            });
            setTimeout(()=>{
            todosC.innerHTML="";
            for (let index = 0; index < arrEl.length; index++) {
                todosC.append(arrEl[index]);
            }todosC.append(createElementFromHTML(`<div class="todo-container" id="todo-cont">
            <input class="todo-input" type="text" id="task-inpt"/>
            </div>`)); inpt = document.getElementById("task-inpt"); todoInpt = document.getElementById("todo-cont"); inpt.focus()},500);
            isAsc=false;
            filterBtn.classList.replace("bx-sort-up","bx-sort-down");
        }
        else {
            arrEl.sort(function(a, b) {
                if (a.innerText.trim().split('')[0] <= b.innerText.trim().split('')[0])
                return 1;
                if (a.innerText.trim().split('')[0] > b.innerText.trim().split('')[0])
                return -1;
            });
            setTimeout(()=>{
            todosC.innerHTML="";
            for (let index = 0; index < arrEl.length; index++) {
                todosC.append(arrEl[index]);
            }todosC.append(createElementFromHTML(`<div class="todo-container" id="todo-cont">
            <input class="todo-input" type="text" id="task-inpt"/>
            </div>`)); inpt = document.getElementById("task-inpt"); todoInpt = document.getElementById("todo-cont"); inpt.focus()},500);
            isAsc=true;
            filterBtn.classList.replace("bx-sort-down","bx-sort-up");
        }
    }
    else{
        error.innerHTML = `<div class="d-flex align-items-center"><span>No tasks to filter!</span> <i class='bx bx-x-circle remove-error' onclick="removeErr()"></i></div>`;
        error.classList.toggle("active");
    }
});

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function deleteEl(element) { 
    element.remove(); 
    arrEl.splice(arrEl.indexOf(element),1);
    inpt.focus(); 
}

function editEl(element)
{
    const { value: text } = Swal.fire({
        title: 'Edit Plan',
        input: 'text',
        inputLabel: 'Change from here',
        inputValue: element.innerText,
        confirmButtonText: 'Save',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!'
            }
            else {
                element.innerText = value;
            }
        }
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Successfully!',
                'Your plan has changed successfully!',
                'success');
        }
      })
}

function addTask()
{
    if(inpt.value!="")
    {
        todosC.insertBefore(CreateTaskElement(inpt.value),todoInpt);
        inpt.value=""; inpt.focus();
    }
    else {
        error.innerHTML = `<div class="d-flex align-items-center"><span>Please, make sure that text field is filled!</span> <i class='bx bx-x-circle remove-error' onclick="removeErr()"></i></div>`;
        error.classList.toggle("active");
    }
}

let dragindex=0;
let clone=" ";
function drag(e){
e.dataTransfer.setData("text",e.target.id);
}
function allowDrop(e){
e.preventDefault();
}

function drop(e){
    e.preventDefault();
    clone=e.target.parentElement.cloneNode(true);
    let data=e.dataTransfer.getData("text");
    if(clone.id !== data) {
    let nodelist=document.getElementById("todos-cont").childNodes;
    for(let i=0;i<nodelist.length;i++){
    if(nodelist[i].id===data){
    dragindex=i;}
    }
    document.getElementById("todos-cont").replaceChild(document.getElementById(data),e.target.parentElement);
    document.getElementById("todos-cont").insertBefore(clone,document.getElementById("todos-cont").childNodes[dragindex]);
    }
}

function checkFavourite(element)
{
    if(element.classList.contains("bx-bookmark"))
    {
        element.classList.remove("bx-bookmark");
        element.classList.add("bxs-bookmark");
        element.style.color = "#833AE0";
    }
    else
    {
        element.classList.remove("bxs-bookmark");
        element.classList.add("bx-bookmark");
        element.style.color = "#C4C4C4";
    }
}

error.addEventListener('click', ()=>{
    error.classList.remove("active");
})