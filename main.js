// Variable
let container = document.querySelector(".container");
let input = document.querySelector("#input");
let listGroup = document.querySelector(".list-group");
let taskAry = [];
let taskCount = 0;
let isTaskDone;

// Listener event
container.addEventListener('click', function (e) {
    if (e.target.id === "submit") {
        addTask();
        input.focus();
    } else if (e.target.id === "clean-all") {
        cleanAllTask();
    } else if (e.target.className === "form-check-input" || e.target.className === "form-check-label") {
        if (document.querySelectorAll(".form-check-input")[e.target.dataset.id].checked) {
            isTaskDone = true;
        } else {
            isTaskDone = false;
        }
        updateTaskStatus(e.target.dataset.id, isTaskDone);
    } else if (e.target.nodeName === "SPAN") {
        deleteTask(e.target.dataset.id);
    }
});

// Function
function addTask() {
    let taskContent = input.value;
    if (taskContent === "") {
        alert("Task不可為空");
    } else {
        const taskDetail = {
            task_content: taskContent,
            task_status: "on-going"
        };
        taskAry.push(taskDetail);
        calculationTaskCount();
        render();
    }
}

function cleanAllTask() {
    taskAry.splice(0, taskAry.length);
    calculationTaskCount();
    render();
}

function updateTaskStatus(index, isTaskDone) {
    // Check checkbox status
    if (isTaskDone) {
        taskAry[index].task_status = "done";
    } else {
        taskAry[index].task_status = "on-going";
    }
    calculationTaskCount();
    render();
}

function calculationTaskCount() {
    taskCount = 0;
    taskAry.forEach(item => {
        if (item.task_status !== "done") {
            taskCount += 1;
        }
    });
}

function deleteTask(index) {
    taskAry.splice(index, 1);
    calculationTaskCount();
    render();
}

function render() {
    // Update list group
    let listGroupString = "";
    taskAry.forEach((item, index) => {
        listGroupString += `
        <li class="list-group-item" data-id="${index}">
            <div class="form-check mb-2">
        `;

        if (item.task_status === "done") {
            listGroupString += `
            <input class="form-check-input" data-id="${index}" type="checkbox" id="autoSizingCheck${index}" checked>
            <del> ${item.task_content} </del>`;
        } else {
            listGroupString += `
            <input class="form-check-input" data-id="${index}" type="checkbox" id="autoSizingCheck${index}">
            ${item.task_content}`;
        }

        listGroupString += `
                    <label class="form-check-label" data-id="${index}" for="autoSizingCheck${index}">
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

    // Clean input data
    input.value = "";
}