
const CreateForm = document.getElementById('task-form')
const TaskName  = document.getElementById('task-input')




//GET Tasks
const tasks = document.getElementById('tasks')

var ListTask = async function(){
    const response = await fetch('/api/tasks',{
        method : 'GET',
        headers : {"Content-Type" : "application/json"},
    })
    
    const TaskData = await response.json()
    let GetTasks = '';
    for (let task = TaskData.length - 1; task >= 0; task--) {
        clean_name = DOMPurify.sanitize(TaskData[task].name,{ ALLOWED_TAGS: [] })
        complate = TaskData[task].complate


        GetTasks += `<div class="single-task ${complate}">
                                <h5><span><i class="far fa-check-circle"></i></span>${clean_name}</h5>
                                <div class="task-links">
                                <!-- edit link -->
                                <a href="tasks/${TaskData[task]._id}"  class="edit-link">
                                <i class="fas fa-edit"></i>
                                </a>
                                <!-- delete btn -->
                                <button type="button"  class="delete-btn" id="delete-btn" data-id="${TaskData[task]._id}" onclick="DeleteTask('${TaskData[task]._id}','${clean_name}')">
                                <i class="fas fa-trash"></i>
                                </button>
                                </div>
                            </div>`
    }
    tasks.innerHTML = GetTasks
}
//GET Tasks





//CREATE Tasks
CreateForm.addEventListener('submit',async (e) => {
    e.preventDefault()
    


    const task = {
        name : TaskName.value,
        complate : false
    }


    const response = await fetch('/api/tasks',{
        method : 'POST',
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(task)
    })

    const TaskData = await response.json()

    if(response.status === 201){
        ListTask()
        TaskName.value = '';
    }
})
//CREATE Tasks


ListTask()






const DeleteTask = async function(taskid,taskname){
    let userconfirm = confirm(`are you sure you want to delete task  '${taskname}'?`)
    if(!userconfirm){
        return;
    }
    //delete task from database
    const response = await fetch(`/api/tasks/${taskid}`,{
        method : 'DELETE',
        headers : {"Content-Type" : "application/json"},
    })

    if (response.status === 200) {
        //delete task from the dom
        const TaskEelement = document.querySelector(`[data-id="${taskid}"]`).closest('.single-task')
        if(TaskEelement){
            TaskEelement.remove()
        }
    } else {
        alert("Something went wrong while deleting the task!");
    }
}









