import { Button, Container, TextField, Typography } from "@mui/material";

import RequestTransaction from "../Request Transaction/RequestTransaction";
import BodyData from "../../Body Data/BodyData";




const Body = () => {






  return (
    <div style={{ backgroundColor: "#EEF2FE", height: "full", paddingBottom:"50px" }}>
      <Container maxWidth="lg">
        <div style={{ paddingTop: "50px" }}>
          <h1 className="fw-semibold" style={{ color: "#9B1FE9" }}>
            Request testnet LINK
          </h1>
          <p className="mt-2 fw-medium opacity-50    ">
            Get testnet LINK for an account on one of the supported blockchain
            testnets so you can <br></br> create and test your own oracle and
            Chainlinked smart contract
          </p>
        </div>

        <div
          style={{ width: "full", backgroundColor: "white", padding: "20px" }}
        >
          <BodyData></BodyData>

          <RequestTransaction></RequestTransaction>




        </div>
      </Container>
    </div>
  );
};

export default Body;
