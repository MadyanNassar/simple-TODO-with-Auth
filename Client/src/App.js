import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/NavBar";
import Register from "./pages/Register";
import Context from "./context/Context";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Loading from "./components/Loading";

function App() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    setLoading(true);
    try {
      await axios
        .get("http://127.0.0.1:5000/api/user", { withCredentials: true })
        .then((response) => {
          setEmail(response.data.email);
        });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <Context.Provider value={{ email, setEmail }}>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<SignIn />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
