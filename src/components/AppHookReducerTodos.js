import React, { useState, useReducer } from "react";
import { v4 as uuid } from "uuid";

const initialTodos = [
    {
        id: uuid(),
        title: "imparare React",
        complete: true,
    },
    {
        id: uuid(),
        title: "imparare gli state",
        complete: false,
    },
    {
        id: uuid(),
        title: "imparare i componenti funzionali",
        complete: false,
    },
];

const filterReducer = (state, action) => {
    switch (action.type) {
        case "SHOW_ALL":
            return "ALL";
        case "SHOW_COMPLETE":
            return "COMPLETE";
        case "SHOW_INCOMPLETE":
            return "INCOMPLETE";
        default:
            throw new Error("no matching action type");
    }
};

const AppHookReducerTodos = () => {
    const [type_status, dispatchFilter] = useReducer(filterReducer, "ALL");
    const [todos, setTodos] = useState(initialTodos);
    const [task, setTask] = useState("");

    let filterTodos = todos.filter((todo) => {
        let result = false;
        if (type_status === "ALL") result = true;
        if (type_status === "COMPLETE" && todo.complete) result = true;
        if (type_status === "INCOMPLETE" && !todo.complete) result = true;
        return result;
    });

    const onChangeText = (e) => {
        setTask(e.target.value);
    };

    const handleChangeCheckbox = (todo_id) => {
        setTodos(
            todos.map((item) => {
                if (item.id === todo_id) {
                    return { ...item, complete: !item.complete };
                } else {
                    return item;
                }
            })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() === "") return;

        setTodos([...todos, { id: uuid(), title: task, complete: false }]);
        setTask("");
    };

    const handleShowAll = (e) => {
        dispatchFilter({ type: "SHOW_ALL" });
    };

    const handleShowComplete = (e) => {
        dispatchFilter({ type: "SHOW_COMPLETE" });
    };

    const handleShowIncomplete = (e) => {
        dispatchFilter({ type: "SHOW_INCOMPLETE" });
    };

    return (
        <>
            <div>
                <strong>Mostra</strong>
                <button type="button" onClick={handleShowAll}>
                    tutto
                </button>
                <button type="button" onClick={handleShowComplete}>
                    completati
                </button>
                <button type="button" onClick={handleShowIncomplete}>
                    non completati
                </button>
            </div>
            <div>
                <ul>
                    {filterTodos.map((item, i) => (
                        <li key={item.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={item.complete}
                                    onChange={() =>
                                        handleChangeCheckbox(item.id)
                                    }
                                />
                                {item.title}
                            </label>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={task}
                        placeholder="aggiungi todo"
                        onChange={onChangeText}
                    />
                </form>
            </div>
        </>
    );
};

export default AppHookReducerTodos;
