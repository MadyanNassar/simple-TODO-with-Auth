import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  FormGroup,
  Divider,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Context from "../context/Context";
import Loading from "../components/Loading";

function Home() {
  const userInfo = useContext(Context);
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

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
        spacing={2}
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
      <Box
        alignItems="center"
        sx={{
          width: 1,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {todos.length > 0 ? (
          <>
            {todos.map((todo) => (
              <Box
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                color={todo.important ? "red" : "blue"}
                fontWeight={todo.done ? "bold" : "normal"}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                }}
              >
                <p style={{ marginLeft: "25px" }}>
                  {todo.done ? <del>{todo.text}</del> : todo.text}
                </p>
                <div key={todo._id}>
                  <FormGroup
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      gap: 0.1,
                      justifyContent: "space-around",
                    }}
                  >
                    <>
                      <IconButton
                        value="done"
                        title={todo.done ? "set to undo" : "set to done"}
                        onClick={(e) => {
                          updateTodo(e, todo);
                        }}
                      >
                        <CheckCircleIcon
                          color={todo.done ? "success" : "error"}
                          size="small"
                        />
                      </IconButton>
                    </>
                    <>
                      <IconButton
                        value="important"
                        title={
                          todo.important
                            ? "set to not complete"
                            : "set to complete"
                        }
                        onClick={(e) => {
                          updateTodo(e, todo);
                        }}
                      >
                        <AssignmentTurnedInIcon
                          color={todo.important ? "success" : "error"}
                          size="small"
                        />
                      </IconButton>
                    </>
                    <>
                      <IconButton
                        value={todo._id}
                        title="delete"
                        onClick={(e) => {
                          deleteTodo(e, todo);
                        }}
                      >
                        <DeleteIcon size="small" />
                      </IconButton>
                    </>
                  </FormGroup>
                </div>
                <Divider style={{ width: "100%" }} />
              </Box>
            ))}
          </>
        ) : (
          <>
            {" "}
            <h3>No Todos, Please add some todo</h3>
          </>
        )}
      </Box>
    </div>
  );
}

export default Home;
