import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./todo";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);
  return (
    <>
      <Todo />
    </>
  );
}

export default App;
