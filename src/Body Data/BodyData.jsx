import { useState } from 'react';
import { useAppContext } from '../Components/App context/AppContext';
import WarningIcon from "@mui/icons-material/Warning";
import ReCAPTCHA from "react-google-recaptcha";
import { Button, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient

const BodyData = () => {
  const { selectedValue } = useAppContext();
  const SiteKey = import.meta.env.VITE_SiteKey;

  const [walletAddress, setWalletAddress] = useState('');
  const [requestType1, setRequestType1] = useState('');
  const [requestType2, setRequestType2] = useState('');
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(false);

  // Access the query client
  const queryClient = useQueryClient();

  const handleRecaptchaChange = (value) => {
    if (value) {
      setIsRecaptchaValid(true);
    }
  };

  const handleSubmit = async () => {
    const id = uuidv4().split("-", 5)[0];
    const hash = id;

    try {
      // Make a POST request to the backend API
      const response = await axios.post('https://job-task-server-side-gules.vercel.app/api/submitrequest', {
        walletAddress,
        requestType1,
        requestType2,
        hash
      });

      // Check if the request was successful
      if (response.data.message) {
        console.log('Request submitted successfully!');

        
        queryClient.invalidateQueries(["repoData"]);
        
        // Additional actions after successful submission
      } else {
        console.error('Failed to submit request.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  const recaptchaStyle = {
    marginTop: "20px",
  };

  



  return (
    <div>
      <div style={{ width: "full", backgroundColor: "#EEF2FE" }}>
        <Typography
          variant="body2"
          sx={{ padding: 1, textAlign: "start" }}
          color="textSecondary"
          align="center"
        >
          <span>
            <WarningIcon
              style={{
                color: "#9B1FE9",
                width: "20px",
                marginRight: "5px",
              }}
            ></WarningIcon>
          </span>{" "}
          Your wallet is connected to <span style={{ fontWeight: "bold" }}>{selectedValue}</span>, so you are requesting <span style={{ fontWeight: "bold" }}>{selectedValue}</span> Link / ETH.
        </Typography>
      </div>

      <div>
        <div>
          <p style={{ width: "25%", marginTop: 30, color: "#9B1FE9" }}>
            Wallet Address
          </p>

          <TextField
            style={{ width: "50%" }}
            placeholder="Your Wallet Address..."
            id="outlined-size-small"
            size="small"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <p style={{ width: "25%", marginTop: 10, color: "#9B1FE9" }}>
            Request Type
          </p>
          <div className="d-flex gap-2">
            <TextField
              style={{ width: "25%" }}
              id="outlined-size-small"
              size="small"
              placeholder='Request Type'
              value={requestType1}
              onChange={(e) => setRequestType1(e.target.value)}
            />
            <TextField
              style={{ width: "24.5%" }}
              id="outlined-size-small"
              size="small"
              placeholder='Amount'
              value={requestType2}
              onChange={(e) => setRequestType2(e.target.value)}
            />
          </div>
        </div>
      </div>

      <ReCAPTCHA
        sitekey={SiteKey} // Replace with your actual Site Key
        onChange={handleRecaptchaChange}
        style={recaptchaStyle}
      />

<Button
  sx={{
    backgroundColor: "#9B1FE9",
    borderRadius: "3px",
    mt: '10px',
    color: "white",
    textTransform: "none",
    fontWeight: "bold",
    '&:hover': {
      backgroundColor: "#9B1FE9", 
      color: "white", 
    },
  }}
  onClick={handleSubmit}
  disabled={!isRecaptchaValid} // Disable button if reCAPTCHA is not validated
>
  Send Request
</Button>
    </div>
  );
};

export default BodyData;
