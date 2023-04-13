import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemPropsType = {
    addNewItem: (title: string) => void
}

const AddItemForm: FC <AddItemPropsType>  = ({ addNewItem }) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addTaskItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addNewItem(trimmedTitle)
            setTitle("")
        } else {
            setError(true)
        }
        setTitle("")
    }

    const inputIsEmpty = title.length === 0
    const setLocalTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }

    const onEnter = inputIsEmpty ? undefined :
        (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTaskItem()

    const maxTitleLength = 20
    const recommendedTitleLength = 10
    const isAddTaskNotPossible = !title.length || title.length >= maxTitleLength

    const longTitleWarningMessage = (<div style={{color: "white"}}>Title should be shorter</div>)
    const longTitleErrorMessage = (<div style={{color: "red"}}>Title too long</div>)
    const errorMessage = error && (<div style={{color: 'red'}}>Please write proper task title</div>)



    return (
        <div>
            <input
                placeholder={"Enter title here"}
                value={title}
                onChange={setLocalTitleHandler}
                onKeyDown={onEnter}
                className={error ? 'input-error' : 'input'}
            />
            <button
                disabled={isAddTaskNotPossible}
                onClick={addTaskItem}
            >+
            </button>
            {errorMessage}
            {title.length > recommendedTitleLength && title.length <= maxTitleLength && longTitleWarningMessage}
            {title.length > maxTitleLength && longTitleErrorMessage}
        </div>
    );
};

export default AddItemForm;