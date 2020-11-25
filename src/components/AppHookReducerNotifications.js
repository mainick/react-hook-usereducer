import React, { useState, useReducer } from "react";
import { v4 as uuid } from "uuid";
import Notification from "./Notification";

const initialState = {
    todos: [
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
    ],
    notification: {
        view: false,
        text: "",
    },
};

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

const todoReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            // l'action viene fornita aggiungendo un payload, il nuovo elemento todo,
            //  da concatenarlo all'elenco nello stato corrente
            return {
                ...state,
                todos: [...state.todos, action.payload],
                notification: {
                    view: true,
                    text: "attività aggiunta",
                },
            };
        case "CHANGE_STATUS":
            // l'action viene fornita aggiungendo un payload, l'id dell'elemento todo,
            // per identificare l'elemento dove modificare lo stato completo / non completo
            return {
                ...state,
                todos: state.todos.map((item) => {
                    if (item.id === action.payload) {
                        return { ...item, complete: !item.complete };
                    } else {
                        return item;
                    }
                }),
                notification: {
                    view: true,
                    text: "operazione effettuata",
                },
            };
        case "NO_VALUE":
            // l'action per visualizzare una notifica per non aver inserito nessun testo
            // della nuova attività
            return {
                ...state,
                notification: {
                    view: true,
                    text: "inserire un valore",
                },
            };
        case "CLOSE_NOTIFICATION":
            // l'action per visualizzare nascondere la notifica precedentemente visualizzata
            return {
                ...state,
                notification: {
                    view: false,
                    text: "",
                },
            };
        default:
            throw new Error("no matching action type");
    }
};

const AppHookReducerNotications = () => {
    const [type_status, dispatchFilter] = useReducer(filterReducer, "ALL");
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [task, setTask] = useState("");

    const onChangeText = (e) => {
        setTask(e.target.value);
    };

    const handleChangeCheckbox = (todo_id) => {
        dispatch({ type: "CHANGE_STATUS", payload: todo_id });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() === "") {
            dispatch({ type: "NO_VALUE" });
        } else {
            let newTodo = { id: uuid(), title: task, complete: false };
            dispatch({ type: "ADD_ITEM", payload: newTodo });
            setTask("");
        }
    };

    const handleCloseNotification = () => {
        dispatch({ type: "CLOSE_NOTIFICATION" });
    };

    let filterTodos = (state.todos || []).filter((todo) => {
        let result = false;
        if (type_status === "ALL") result = true;
        if (type_status === "COMPLETE" && todo.complete) result = true;
        if (type_status === "INCOMPLETE" && !todo.complete) result = true;
        return result;
    });

    return (
        <>
            {state.notification.view && (
                <Notification
                    text={state.notification.text}
                    closeNotice={handleCloseNotification}
                />
            )}
            <div>
                <ul>
                    {(filterTodos || []).map((item, i) => (
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

export default AppHookReducerNotications;
