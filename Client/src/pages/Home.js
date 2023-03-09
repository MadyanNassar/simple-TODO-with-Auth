import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import Context from "../context/Context";
import Loading from "../components/Loading";
import AllTodo from "../components/AllTodo";
import DoneTodo from "../components/DoneTodo";
import ImportantTodo from "../components/ImportantTodo";

function Home() {
  const userInfo = useContext(Context);
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState("All");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    setLoading(true);
    try {
      await axios
        .get("http://127.0.0.1:5000/api/todo", {
          withCredentials: true,
        })
        .then((response) => {
          setTodos(response.data);
        });
    } catch (err) {
      console.log(err.response.data.errMessage);
    } finally {
      setLoading(false);
    }
  }

  if (!userInfo.email) {
    console.log("user not logged in");
    return loading ? (
      <Loading />
    ) : (
      <p style={{ textAlign: "center", paddingTop: "150px" }}>
        Please login or register
      </p>
    );
  }

  async function addTodo(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await axios
        .post(
          "http://127.0.0.1:5000/api/todo",
          { text: inputVal },
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setTodos([...todos, response.data]);
          setInputVal("");
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateTodo(e, todo) {
    setLoading(true);
    e.preventDefault();
    const value = e.currentTarget.value;

    const data = {
      id: todo._id,
      done: value === "done" ? !todo.done : todo.done,
      important: value === "important" ? !todo.important : todo.important,
    };

    try {
      await axios
        .patch(`http://127.0.0.1:5000/api/todo/${data.id}`, data, {
          withCredentials: true,
        })
        .then(() => {
          const newTodos = todos.map((t) => {
            if (t._id === todo._id) {
              t.done = data.done;
              t.important = data.important;
            }
            return t;
          });
          setTodos([...newTodos]);
          getTodos();
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTodo(e) {
    setLoading(true);
    const id = e.currentTarget.value;

    e.preventDefault();
    try {
      await axios.delete(`http://127.0.0.1:5000/api/todo/${id}`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setTodos(todos.filter((t) => t._id !== id));
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        marginBottom="20px"
      >
        <Grid item>
          <TextField
            id="input"
            label="add new ToDo"
            variant="outlined"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </Grid>
        <Grid item alignItems="stretch" style={{ display: "flex" }}>
          <Button
            variant="contained"
            onClick={(e) => {
              addTodo(e);
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <Divider />

      <TabContext value={tabValue}>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            centered
          >
            <Tab label="All" value="All" />
            <Tab label="Done" value="Done" />
            <Tab label="Important" value="Important" />
          </Tabs>
        </Box>
        <TabPanel value="All">
          <AllTodo
            todo={todos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        </TabPanel>
        <TabPanel value="Done">
          <DoneTodo
            todo={todos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        </TabPanel>
        <TabPanel value="Important">
          <ImportantTodo
            todo={todos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default Home;
