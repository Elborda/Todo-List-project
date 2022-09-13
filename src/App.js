import { React, useState } from "react";
import List from "./components/List";
import "./App.css";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [items, setItems] = useState("");
  const [countId, setCountId] = useState(3);
  const [isEditing, setEditing] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [editTrick, setEditTrick] = useState(0);

  const handleChange = (event) => {
    setItems(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    addItem(items);
  };

  const addItem = (name) => {
    if (items === "") {
      return;
    }
    const newTask = { id: countId, name };
    setTasks([...tasks, newTask]);
    setCountId((prevState) => prevState + 1);
  };

  const deleteItem = (id) => {
    const itemsLeft = tasks.filter((info) => {
      return info.id !== id;
    });
    setTasks(itemsLeft);
  };

  const editItem = (id, newName, active) => {
    setEditing(true);
    setItems(newName);
    setEditTrick(id);
  };

  const changedItem = (event) => {
    event.preventDefault();
    const editedItem = tasks.map((info) => {
      if (editTrick === info.id) {
        return { ...info, name: items };
      }
      return info;
    });
    setTasks(editedItem);
    setEditing(false);
  };

  const deleteAll = () => {
    const deleteItem = tasks.filter((info) => {
      return info === "";
    });
    setTasks(deleteItem);
  };

  const viewTemplate = (
    <form className="form">
      <input
        className="input"
        type="text"
        value={items}
        onChange={handleChange}
      />
      <button onClick={submit}>Submit</button>
    </form>
  );

  const editingTemplate = (
    <form className="form">
      <input
        className="input"
        type="text"
        value={items}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <button onClick={changedItem}>Edit</button>
    </form>
  );

  const taskList = tasks?.map((info) => {
    return (
      <List
        {...info}
        key={info.id}
        deleteItem={deleteItem}
        editItem={editItem}
      />
    );
  });

  return (
    <>
      <div className="big--container">
        <div className="center">
          <h1>Grocery Bud</h1>
          {isEditing ? editingTemplate : viewTemplate}
          <ul className="ul--container">{taskList}</ul>
          <button className="delete--all" onClick={deleteAll}>
            Delete All
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
