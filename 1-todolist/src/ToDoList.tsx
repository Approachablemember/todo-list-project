import React, {ChangeEvent, KeyboardEvent, FC, FunctionComponent, useRef, useState} from 'react';
import {FilterValueType} from './App';
// rsc react stateless component
export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

type  ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    taskRemover: (taskId: string) => void
    changeToDoListFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}


const ToDoList: FC<ToDoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")
    //const addTaskInputRef = useRef<any>(null)
    const [error, setError] = useState<boolean>(false)
    let isAllTasksNotIsDone = true
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }

    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    const toDoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => props.taskRemover(task.id)
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
        return (
            <li>
                <input
                    onChange={changeTaskStatusHandler}
                    type="checkbox"
                />
                <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                <button onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })
    const maxTitleLength = 20
    const recommendedTitleLength = 10

    const isAddTaskNotPossible = !title.length || title.length >= maxTitleLength


    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle)
            setTitle("")
        } else {
            setError(true)
        }
        setTitle("")

    }
    const setLocalTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)}
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addTaskHandler()
    const longTitleWarningMessage = (<div style={{color: "white"}}>Title should be shorter</div>)
    const longTitleErrorMessage = (<div style={{color: "red"}}>Title too long</div>)
    const errorMessage = error && (<div style={{color: 'red'}}>Please write proper task title</div>)


    return (
        <div className={todoClasses}>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        placeholder={"Enter task title please"}
                        value={title}
                        onChange={setLocalTitleHandler}
                        onKeyDown={onKeyDownAddTaskHandler}
                        className={error ? 'input-error' : ''}
                    />
                    <button
                        disabled={isAddTaskNotPossible}
                        onClick={addTaskHandler}
                    >+
                    </button>
                    {errorMessage}
                    {title.length > recommendedTitleLength && title.length <= maxTitleLength && longTitleWarningMessage}
                    {title.length > maxTitleLength && longTitleErrorMessage}
                </div>
                <ul>
                    {toDoListItems}
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'btn-active' : ''}
                        onClick={() => {
                            props.changeToDoListFilter("all")
                        }}
                    >All
                    </button>
                    <button
                        className={props.filter === 'active'? 'btn-active' : ''}
                        onClick={() => {
                        props.changeToDoListFilter("active")
                    }}
                    >Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'btn-active' : ''}
                        onClick={() => {
                            props.changeToDoListFilter("completed")
                        }}
                    >Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;