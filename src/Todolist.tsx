import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
/* import { title } from "process"; */
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListid: string) => void;
  changeFilter: (value: FilterValuesType, todoListid: string) => void;
  addTask: (title: string, todoListid: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListid: string
  ) => void;
  changeTaskTitle: (id: string, newValue: string, todoListid: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
  /*   const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null); */

  /*   const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyDownPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.key === "Enter") {
      props.addTask(title, props.id);
      setTitle("");
    }
  };

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title, props.id);
      setTitle("");
    } else {
      setError("Field is requered");
    }
  }; */

  const onAllClickHandler = () => {
    props.changeFilter("all", props.id);
  };

  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id);
  };

  const onAComplitedClickHandler = () => {
    props.changeFilter("completed", props.id);
  };
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const removeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={removeTodolistTitle} />

        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      {/*       <div>
        <input
          value={title}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div> */}
      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox
                color={"primary"}
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              {/* <span>{t.title}</span> */}
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />

              <IconButton onClick={onRemoveHandler}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </ul>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color={"primary"}
          onClick={onActiveClickHandler}
          variant={props.filter === "active" ? "contained" : "text"}
        >
          Active
        </Button>
        <Button
          color={"secondary"}
          onClick={onAComplitedClickHandler}
          variant={props.filter === "completed" ? "contained" : "text"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
