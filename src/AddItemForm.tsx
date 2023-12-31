import { ControlPoint } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyDownPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.key === "Enter") {
      props.addItem(title); /* сменил с addTask на addItem */
      setTitle("");
    }
  };
  const addTask = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Field is requered");
    }
  };

  return (
    <div>
      <TextField
        variant={"outlined"}
        label={"Type value"}
        value={title}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color={"primary"}>
        <ControlPoint />
      </IconButton>
    </div>
  );
}
