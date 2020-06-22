// Variable
let container = document.querySelector(".container");
let input = document.querySelector("#input");
let listGroup = document.querySelector(".list-group");
let taskAry = [];
let taskCount = 0;

// Listener event
container.addEventListener('click', function(e){
    if (e.target.id === "submit") {
        addTask();
    }
    else if (e.target.id === "clean-all") {
        cleanAllTask();
    }
    else if (e.target.className === "form-check-input" || e.target.className === "form-check-label") {
        doneTask(e.target.dataset.id);
        console.log(e.target.checked);
    }
    else if (e.target.nodeName === "SPAN") {
        deleteTask(e.target.dataset.id);
        //console.log(e.target.dataset.id);
    }
    //console.log(e.target.id);
});

// Function
function addTask(){
    let taskContent = input.value;
    if (taskContent === "") {
        alert("Task不可為空");
    }
    else {
        const taskDetail = {
            task_content: taskContent,
            task_status: "on-going"
        };
        taskAry.push(taskDetail);
        //console.log(taskAry);
        calculationTaskCount();
        render();
    }
}

function cleanAllTask(){
    taskAry.splice(0, taskAry.length);
    calculationTaskCount();
    render();
}

function doneTask(index){
    taskAry[index].task_status = "done";
    console.log(taskAry);
    calculationTaskCount();
    render();
}

function calculationTaskCount(){
    taskCount = 0;
    taskAry.forEach(item => {
        if (item.task_status !== "done") {
            taskCount += 1;
        }
    });
}

function deleteTask(index){
    taskAry.splice(index, 1);
    calculationTaskCount();
    render();
}

function render(){
    // Update list group
    let listGroupString = "";
    taskAry.forEach((item, index) => {
        listGroupString += `
        <li class="list-group-item" data-id="${index}">
            <div class="form-check mb-2">
                <input class="form-check-input" data-id="${index}" type="checkbox" id="autoSizingCheck${index}">
                <label class="form-check-label" data-id="${index}" for="autoSizingCheck${index}">
        `;

        if (item.task_status === "done") {
            listGroupString += `<del> ${item.task_content} </del>`;
            //document.querySelectorAll("form-check-input")[index].checked = true;
        }
        else {
            listGroupString += `${item.task_content}`;
            //document.querySelectorAll("form-check-input")[index].checked = false;
        }          
        
        listGroupString += `
                </label>
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true" data-id="${index}">&times;</span>
                </button>
            </div>
        </li>
        `;
    });

    // Update result list
    listGroupString += `
        <li class="list-group-item list-group-item-dark list-result">還有 ${taskCount} 筆任務 
            <button type="button" id="clean-all" class="btn btn-link float-right">Clean All</button>
        </li>
    `
    listGroup.innerHTML = listGroupString;

    //console.log(listGroupString);
    
    // Clean input data
    input.value = "";
}