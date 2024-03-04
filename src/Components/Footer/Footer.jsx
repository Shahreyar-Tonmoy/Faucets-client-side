import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


// TODO remove, this demo shouldn't need to reset the theme.

export default function Footer() {
  return (
      <Box
      
      >

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
           
          }}
        >
          <Container maxWidth="sm">
            <Typography sx={{textAlign: "center", color:"black",fontSize: "12px"}}>
            © copyright 2022 - All Right Reserved by Faucet
            </Typography>
          </Container>
        </Box>
      </Box>
  );
}