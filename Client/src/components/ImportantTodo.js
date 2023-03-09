import React from "react";
import { Box, IconButton, FormGroup, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskIcon from "@mui/icons-material/Task";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRateIcon from "@mui/icons-material/StarRate";

function ImportantTodo(props) {
  const todos = props.todo.filter((todo) => todo.important === true);

  return (
    <div>
      {" "}
      <div>
        {todos.length <= 0 ? (
          <>no Important todos</>
        ) : (
          <>
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
                  {todos.map((todo, index) => (
                    <Box
                      key={index}
                      alignItems="center"
                      justifyContent="space-between"
                      width="100%"
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
                                props.updateTodo(e, todo);
                              }}
                            >
                              <TaskIcon
                                style={{
                                  color: `${todo.done ? "green" : "grey"}`,
                                }}
                                size="small"
                              />
                            </IconButton>
                          </>
                          <>
                            <IconButton
                              value="important"
                              title={
                                todo.important
                                  ? "set to not important"
                                  : "set to important"
                              }
                              onClick={(e) => {
                                props.updateTodo(e, todo);
                              }}
                            >
                              <StarRateIcon
                                style={{
                                  color: `${
                                    todo.important ? "yellow" : "grey"
                                  }`,
                                }}
                                size="small"
                              />
                            </IconButton>
                          </>
                          <>
                            <IconButton
                              value={todo._id}
                              title="delete"
                              onClick={(e) => {
                                props.deleteTodo(e, todo);
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
          </>
        )}
      </div>
    </div>
  );
}

export default ImportantTodo;
