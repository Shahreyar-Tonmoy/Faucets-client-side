import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Button, FormControl, Modal, Select } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import { Link, useNavigate } from "react-router-dom";
import UseAxios from "../../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../Hooks/UserAdmin";
import { useAppContext } from "../App context/AppContext";

function Header() {
  const axiosInstance = UseAxios();

  const {isAdmin}=useAdmin()

  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
    width: 500,

    borderRadius: "5px",

    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { selectedValue, setSelectedValue } = useAppContext();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };





  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/profile/user");
      return response.data;
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <AppBar
      sx={{ backgroundColor: "#ffffff", boxShadow: "none" }}
      position="static"
    >
      <Container maxWidth="lg" sx={{ marginY: 1 }}>
        <Toolbar
          className="d-flex-column justify-content-between    "
          disableGutters
        >
          <div>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                fontWeight: 700,
                color: "#9B1FE9",
                textDecoration: "none",
              }}
            >
              Faucets
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </div>

          <div className="d-flex align-items-center gap-2  ">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={selectedValue} onChange={handleChange}
                displayEmpty
                sx={{ height: 40, outlineColor: "white" }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Arbitrum Rinkeby"}>Arbitrum Rinkeby</MenuItem>
                <MenuItem value={"Avalanche Fuji"}>Avalanche Fuji</MenuItem>
                <MenuItem value={"BNB Chain Testnet"}>BNB Chain Testnet</MenuItem>
                <MenuItem value={"Ethereum Rinkeby"}>Ethereum Rinkeby</MenuItem>
                <MenuItem value={"Fantom Testnet"}>Fantom Testnet</MenuItem>
                <MenuItem value={"Harmony Testnet"}>Harmony Testnet</MenuItem>
                <MenuItem value={"POA Network Sokol"}>POA Network Sokol</MenuItem>
                <MenuItem value={"Polygon Mumbai"}>Polygon Mumbai</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleOpen}
              style={{
                backgroundColor: "white",
                color: "#9B1FE9",
                border: "2px solid #9B1FE9",
              }}
            >
              <span style={{ paddingRight: "5px" }}>
                <PaymentsIcon style={{ width: "18px" }} />
              </span>
              Connect Wallet
            </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="d-flex justify-content-between  ">
                  <Typography
                    sx={{ marginBottom: "20px" }}
                    id="modal-modal-title"
                    variant="h5"
                    fontWeight={700}
                    component="h2"
                  >
                    Connect your wallet
                  </Typography>

                  <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
                </div>

                <div className="d-flex justify-content-around gap-3 ">
                  <div
                    className="d-flex flex-column  justify-content-center align-items-center  "
                    style={{
                      backgroundColor: "#F5F7FD",
                      width: "180px",
                      height: "180px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "100px" }}
                      src="https://i.ibb.co/HN1CJJb/Meta-Mask-Fox-svg-d9c41a5680a1daaae624.png"
                      alt=""
                    />
                    <h6 className="text-center ">Metamask</h6>
                  </div>
                  <div
                    className="d-flex flex-column  justify-content-center align-items-center  "
                    style={{
                      backgroundColor: "#F5F7FD",
                      width: "180px",
                      height: "180px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "100px" }}
                      src="https://i.ibb.co/NYvWj2F/Wallet-Connect-d0b10794.png"
                      alt=""
                    />
                    <h6 className="text-center ">WalletConnect</h6>
                  </div>
                </div>
              </Box>
            </Modal>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <div className="flex flex-col  gap-1">
                  {data?.statusCode === 200 ? (
                    <>
                      
                      {
                        isAdmin === true && 
                        
                        <Link
                          to={"/dashboard"}
                          onClick={handleCloseUserMenu}
                          style={{
                            textDecoration: "none",
                            transition: "color 0.3s",
                            display: "block",
                            padding: "8px 40px",
                            width: "100%",
                            backgroundColor:
                              hoveredLink === "/dashboard"
                                ? "#EEF2FE"
                                : "transparent",
                          }}
                          onMouseEnter={() => handleMouseEnter("/dashboard")}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Typography
                            style={{
                              width: "100%",
                              color: "black",
                              textDecoration: "none !important",
                              textAlign: "center",
                            }}
                          >
                            DashBoard
                          </Typography>
                        </Link>
                      }
                      

                      {
                        <button
                          onClick={handleLogout}
                          style={{
                            textDecoration: "none",
                            transition: "background-color 0.3s",
                            display: "block",
                            border: "none",
                            padding: "0px 40px",
                            width: "100%",
                            backgroundColor: "transparent",
                          }}
                        >
                          <Typography
                            style={{
                              width: "100%",
                              color: "black",
                              textDecoration: "none",
                              textAlign: "center",
                            }}
                          >
                            Log Out
                          </Typography>
                        </button>
                      }
                     

                    </>
                  ) : (
                    <>
                      {
                        <Link
                          to={"/login"}
                          onClick={handleCloseUserMenu}
                          style={{
                            textDecoration: "none",
                            transition: "color 0.3s",
                            display: "block",
                            padding: "8px 40px",
                            width: "100%",
                            backgroundColor:
                              hoveredLink === "/login"
                                ? "#EEF2FE"
                                : "transparent",
                          }}
                          onMouseEnter={() => handleMouseEnter("/login")}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Typography
                            style={{
                              width: "100%",
                              color: "black",
                              textDecoration: "none !important",
                              textAlign: "center",
                            }}
                          >
                            Log In
                          </Typography>
                        </Link>
                      }

                      {
                        <Link
                          to={"/signup"}
                          onClick={handleCloseUserMenu}
                          style={{
                            textDecoration: "none",
                            transition: "color 0.3s",
                            display: "block",
                            padding: "8px 40px",
                            width: "100%",
                            backgroundColor:
                              hoveredLink === "/signup"
                                ? "#EEF2FE"
                                : "transparent",
                          }}
                          onMouseEnter={() => handleMouseEnter("/signup")}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Typography
                            style={{
                              width: "100%",
                              color: "black",
                              textDecoration: "none !important",
                              textAlign: "center",
                            }}
                          >
                            Sign Up
                          </Typography>
                        </Link>
                      }
                    </>
                  )}

                  {
                    <Link
                      to={"/faq"}
                      onClick={handleCloseUserMenu}
                      style={{
                        textDecoration: "none",
                        transition: "color 0.3s",
                        display: "block",
                        padding: "8px 40px",
                        width: "100%",
                        backgroundColor:
                          hoveredLink === "/faq" ? "#EEF2FE" : "transparent",
                      }}
                      onMouseEnter={() => handleMouseEnter("/faq")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Typography
                        style={{
                          width: "100%",
                          color: "black",
                          textDecoration: "none !important",
                          textAlign: "center",
                        }}
                      >
                        FAQ
                      </Typography>
                    </Link>
                  }
                </div>

              </Menu>
            </Box>
          </div>
        </Toolbar>
        
      </Container>
    </AppBar>
  );
}
export default Header;
