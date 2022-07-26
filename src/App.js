import * as React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import { v4 as uuid } from "uuid";
import { TodoContent } from "./todos"
import {doc, orderBy, setDoc, updateDoc } from "firebase/firestore";
import { initFirebase } from "./firebase";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { collection, query, onSnapshot } from "firebase/firestore";


const db = initFirebase()

function App() {

  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem("todoListData");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [tab,setTab] = useState("todo")

  useEffect(() => {
    const q = query(collection(db, "items"),orderBy("TimeInSeconds","desc"));
    console.log('test')
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTodoList = [];
      querySnapshot.forEach((doc) => {
        newTodoList.push(doc.data());
      });
      setTodoList(newTodoList)
    });
    return unsubscribe
  }, [])


  useEffect(
    function persistTodoList() {
      localStorage.setItem("todoListData", JSON.stringify(todoList));
    },
    [todoList]
  );

  const handleAddItem = async (e) => {
    if (e.key === "Enter") {
      const newTodoList = [...todoList];
      const currentTimeInSeconds = Math.floor(Date.now()/1000);
      const newItem = {
        id: uuid(),
        content: inputValue,
        state: 'todo',
        TimeInSeconds: currentTimeInSeconds
      }

      newTodoList.push(newItem);
      setInputValue("");
      setTodoList(newTodoList);

      try {
        await setDoc(doc(db, 'items',newItem.id  ), newItem);
        console.log("Document written wiUIAJ;th ID: ", newItem.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleToggle = async (value) => {
    const newTodoList = [...todoList];
    const currentIndex = newTodoList.indexOf(value);
    const currentTimeInSeconds = Math.floor(Date.now()/1000);
    const updateItem = {id:value.id, content:value.content, state:'done',TimeInSeconds:currentTimeInSeconds};
    newTodoList[currentIndex] = updateItem
    try {
      await setDoc(doc(db, "items", value.id),
        updateItem
      );
    } catch (e) {
      console.error("Error update document: ", e);
    }
    
  };

  const handleInputChange = async (event, value) => {
    const newTodoList = [...todoList];
    const currentIndex = newTodoList.indexOf(value);
    const newInput =  { id: value.id, content: event.target.value,state:'todo',TimeInSeconds:value.TimeInSeconds};
    newTodoList[currentIndex] = newInput
    try{
      await updateDoc(doc(db, "items", value.id),newInput);
    } catch (e) {
      console.error("Error update input value")
    }
  };

  const showList = (todoList) => {
    if (tab==="todo"){
      return todoList.filter(item => item.state === "todo")
    }
    if(tab==="done"){
      return todoList.filter(item => item.state === "done")     
    }
    
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="main">
        <div className="menu">
            <MenuList sx={{
                color:'#616161',
              }} >
              <MenuItem selected={tab === 'todo'} className="MenuItem" onClick={() => setTab("todo")}>Todo</MenuItem>
              <MenuItem selected={tab === 'done'} className="MenuItem" onClick={() => setTab("done")}>Done</MenuItem>
            </MenuList>
        </div>
        <div>
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
            todoList={showList(todoList)}
            handleToggle={handleToggle}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
