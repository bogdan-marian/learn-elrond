import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";


function App() {
  return (
    <Routes>
      <Route path="/" element = {<Home/>}/>
    </Routes>
  );
}

export default App;
