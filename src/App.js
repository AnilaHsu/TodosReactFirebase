import * as React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import { v4 as uuid } from "uuid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";

function TodoContent(props) {
  const todoList = props.todoList;
  if (todoList.length === 0) {
    return <p className="message">You have no todo items here.</p>;
  }
  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {todoList.map((value) => {
        const labelId = value.id;
        return (
          <ListItem
            key={labelId}
            secondaryAction={
              <Checkbox edge="end" onChange={props.handleToggle(value)} />
            }
            disablePadding
          >
            <InputItem
              id={value.id}
              primary={value.content}
              onChange={(event) => props.handleInputChange(event, value)}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

function InputItem(props) {
  return (
    <input
      className="input_item"
      value={props.primary}
      onChange={props.onChange}
    />
  );
}

function App1(props) {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("todoListData");
    const initialValue = JSON.parse(saved);
    return initialValue || props.todoList;
  });

  useEffect(
    function persistTodoList() {
      localStorage.setItem("todoListData", JSON.stringify(todoList));
    },
    [todoList]
  );

  const handleAddItem = (e) => {
    if (e.key === "Enter") {
      const newTodoList = [...todoList];

      newTodoList.push({
        id: uuid(),
        content: inputValue,
      });
      setInputValue("");
      setTodoList(newTodoList);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleToggle = (value) => () => {
    const newTodoList = [...todoList];
    const currentIndex = newTodoList.indexOf(value);
    newTodoList.splice(currentIndex, 1);
    setTodoList(newTodoList);
  };

  const handleInputChange = (event, value) => {
    const newTodoList = [...todoList];
    const currentIndex = newTodoList.indexOf(value);
    newTodoList[currentIndex] = { id: value.id, content: event.target.value };

    setTodoList(newTodoList);
  };

  return (
    <div className="container">
      <h1>To Do List</h1>
      <TextField
        value={inputValue}
        onKeyDown={handleAddItem}
        onChange={handleChange}
        placeholder="add todo item."
        sx={{
          width: 300,
          "& .MuiInputBase-input": {
            height: 16,
          },
        }}
      />
      <TodoContent
        todoList={todoList}
        handleToggle={handleToggle}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default App1;
