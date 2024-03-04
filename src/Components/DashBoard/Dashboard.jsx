import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    try {
      const response = await axios.get(
        "https://job-task-server-side-gules.vercel.app/auth/profile/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  const { data: userData } = useQuery({
    queryKey: "user",
    queryFn: fetchUser,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  console.log(user);


  return (
    <Container fluid className="dashboard-container">
      <Row>
        <Col
          md={3}
          style={{ height: "100vh", overflowY: "auto" }}
          className="sidebar bg-light"
        >
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex flex-column  justify-content-center align-items-center my-4 ">
                <Avatar
                  alt="user imgage"
                  src={user?.user?.image}
                  sx={{ width: 56, height: 56 }}
                />
                <h3>{user?.user?.username}</h3>

                <div></div>
              </div>

              <ListGroup>
                <ListGroupItem
                  action
                  href="#"
                  className="d-flex text-black  bg-white  align-items-center"
                >
                  <FaHome size={20} className="me-2" /> Home
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={9} className="content">
          <Outlet></Outlet>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
