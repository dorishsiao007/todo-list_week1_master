// Variable
let container = document.querySelector(".container");
let input = document.querySelector("#input");
//let submit = document.querySelector("#submit");
//let cleanAll = document.querySelector("#clean-all");
let listGroup = document.querySelector(".list-group");
let taskAry = [];

// Listener event
container.addEventListener('click', function(e){
    if (e.target.id === "submit") {
        addTask();
    }
    else if (e.target.id === "clean-all") {
        cleanAllTask();
    }
    console.log(e.target.id);
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
        render();
    }
}

function cleanAllTask(){
    //console.log(1);
    render();
}

function render(){
    // Update list group
    let listGroupString = "";
    taskAry.forEach((item, index) => {
        listGroupString += `
        <li class="list-group-item" data-id="${index}">
            <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="autoSizingCheck${index}">
                <label class="form-check-label" for="autoSizingCheck${index}">
        `
        if (item.task_status === "done") {
            listGroupString += `<del> ${item.task_content} </del>`
        }
        else {
            listGroupString += `${item.task_content}`
        }          
        
        listGroupString += `
                </label>
                <button type="button" data-id="${index}" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </li>
        `
    });

    // Update result list
    listGroupString += `
        <li class="list-group-item list-group-item-dark list-result">還有 ${taskAry.length} 筆任務 
            <button type="button" id="clean-all" class="btn btn-link float-right">Clean All</button>
        </li>
    `
    listGroup.innerHTML = listGroupString;

    //console.log(listGroupString);
    
    // Clean input data
    input.value = "";
}