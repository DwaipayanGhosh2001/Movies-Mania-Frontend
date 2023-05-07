import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import HomePage from "./layout/HomePage";
import Movies from "./layout/Movies";
import { ChannelContextProvider } from "./context/context";
import {  Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <div>
<ChannelContextProvider>
<Container fluid>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movielist" element={<Movies />} />
      </Routes>
    </Container>
    </ChannelContextProvider>
    </div>
    
    
  );
}
