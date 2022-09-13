import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = (props) => {
  return (
    <li className="list">
      <p>{props.name}</p>
      <div className="buttons--container">
        <button onClick={() => props.editItem(props.id, props.name)}>
          <FaEdit className="edit--logo" />
        </button>
        <button onClick={() => props.deleteItem(props.id)}>
          <FaTrash className="trash--logo" />
        </button>
      </div>
    </li>
  );
};

export default List;
