

//UPDATE TASK
const UpdateForm = document.getElementById('single-task-form')
const TaskEditName  = document.getElementById('task-edit-name')
const TaskEditCompleted  = document.getElementById('task-edit-completed')
const TaskEditId  = document.getElementById('task-edit-id')

var pathurl = window.location.pathname
var TaskId = pathurl.split('/')[pathurl.split('/').length - 1]




//GET
const GetTask = async function(){
    const response = await fetch(`/api/tasks/${TaskId}`,{
        method : 'GET',
    })

    const TaskData = await response.json()

    console.log(TaskData)

    TaskEditId.innerHTML = TaskId
    TaskEditName.value =  TaskData.name
    TaskEditCompleted.checked = TaskData.complate

}

GetTask()


//UPDATE
UpdateForm.addEventListener('submit',async (e) => {
    e.preventDefault()

    const task = {
        name : TaskEditName.value,
        complate : TaskEditCompleted.checked
    }
    

    const response = await fetch(`/api/tasks/${TaskId}`,{
        method : 'PUT',
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(task)
    })

    const TaskData = await response.json()

    if(response.status === 200){
        window.location.href = '/tasks'
    }
})

