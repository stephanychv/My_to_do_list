import React from 'react';
import Garbage from '../assets/icons/Garbage.icon';
import "../styles/components/ToDoForm.css";


const ToDoForm = () => {
    const formRef = React.useRef(null);
    const [tasks,setTasks] = React.useState(
       localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks"))  :  []
    );
    
    function formHandler (e){
        e.preventDefault();
        const task = {
            text: formRef.current.task.value,
            id : Math.random()
        }
        setTasks(
            [...tasks,task]
        );
        formRef.current.task.value = "";
    };
    function onDelete(id){
        setTasks(
            tasks.filter((task)=>task.id !== id)
        )
    }

    React.useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(tasks))
    },[tasks])

    return ( 
        <form className='toDoForm' onSubmit={formHandler} ref={formRef}>
            <div>
                <input type='text' required  name='task' placeholder='Agregar Tarea ....'  />
                <button type='submit'>Agregar</button>
            </div>

            <section>
                {
                    tasks.map((task,i)=>(
                        <div key={i}>
                            <span>
                                {task.text}
                            </span>
                            <button onClick={()=>onDelete(task.id)} type='button'>
                                <Garbage/>
                            </button>
                        </div>
                    ))
                }
            </section>
        </form>
    );
}
 
export default ToDoForm;