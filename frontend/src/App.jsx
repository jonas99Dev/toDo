import { useEffect, useState, List } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import axios from "axios";

import "./App.css";

const [done, setDone] = useState(false);

function App() {
  // const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/doings`)
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }); // Lägg till .catch för att hantera eventuella fel
  }, []); //

  return (
    <div>
      <List>
        <h1>ToDoList</h1>
      </List>
    </div>
  );
}

export default App;
