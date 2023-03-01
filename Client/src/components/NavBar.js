import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { StyledEngineProvider } from "@mui/material/styles";
import Context from "../context/Context";

function Navbar() {
  const user = useContext(Context);

  const navigate = useNavigate();

  const routeChange = (e) => {
    e.preventDefault();
    navigate(e.currentTarget.value);
  };

  async function logout(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://127.0.0.1:5000/api/user/logout",
          {},
          { withCredentials: true }
        )
        .then(() => {
          user.setEmail("");
          localStorage.removeItem("user");
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <StyledEngineProvider injectFirst>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ float: "right" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="p"
              sx={{ flexGrow: 1, cursor: "default" }}
            >
              TODO
            </Typography>
            {user.email ? (
              <Box
                sx={{
                  "& :hover": { backgroundColor: "inherit" },
                }}
              >
                <IconButton
                  style={{ backgroundColor: "transparent" }}
                  color="inherit"
                  title="logout"
                  size="small"
                  onClick={(e) => {
                    logout(e);
                  }}
                >
                  <LogoutIcon />
                  <div>Logout</div>
                </IconButton>
              </Box>
            ) : (
              <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Box
                  sx={{
                    "& :hover": { backgroundColor: "inherit" },
                  }}
                >
                  <IconButton
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "transparent",
                    }}
                    color="inherit"
                    value="login"
                    title="login"
                    size="small"
                    onClick={(e) => routeChange(e)}
                  >
                    <LoginIcon />
                    <div>Login</div>
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    "& :hover": { backgroundColor: "inherit" },
                  }}
                >
                  <IconButton
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "transparent",
                    }}
                    color="inherit"
                    value="register"
                    title="register"
                    size="small"
                    onClick={(e) => routeChange(e)}
                  >
                    <AppRegistrationIcon />
                    <div>Register</div>
                  </IconButton>
                </Box>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </StyledEngineProvider>
  );
}

export default Navbar;
