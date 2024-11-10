

const CreateForm = document.getElementById('task-form')
const TaskName  = document.getElementById('task-input')


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
        TaskName.value = '';
    }
})