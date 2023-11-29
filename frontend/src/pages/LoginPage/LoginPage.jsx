import React, {useState} from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  Collapse,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Info, Close, VisibilityOff, Visibility} from "@mui/icons-material";

import politoLogo from "../../assets/images/politoLogo_bianco.png";
import {useUserContext} from "../../contexts/index.js"; // Ensure this path is correct

const StyleColumn = styled(Stack)(({theme}) => ({
  padding: '2rem',
  display: 'none',
  gap: '80px',
  alignItems: 'flex-start',
  alignContent: 'center',
  flexWrap: 'wrap',
  backgroundColor: '#00284b',
  width: '50%',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const Wrapper = styled(Box)(({theme}) => ({
  display: 'flex', minHeight: '100vh', backgroundColor: 'whitesmoke', flexGrow: '1',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '7rem',
  },

}));

export default function LoginPage() {

  const {login, errorMsg, setErrorMsg} = useUserContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [helper, setHelper] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);

    if (!username || !password) {
      setErrorMsg("Username or password cannot be empty");
      setHelper(true);
    } else {
      setHelper(false);
      login(username, password).catch((err) => {
        setErrorMsg(err.detail ? err.detail : JSON.stringify(err));
      });
    }
  };

  const [open, setOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Wrapper direction='row'>
      <StyleColumn direction='column'>
        <Typography variant="h3" gutterBottom color={'white'} mt={12}>
          Hi, Welcome back
        </Typography>
        <img src={politoLogo} alt="politecnico Di Torino" style={{height: '200px'}}/>
      </StyleColumn>

      <StyleColumn direction='column'
                   sx={{
                     backgroundColor: 'whitesmoke', maxWidth: 400, minWidth: 300, maxHeight: '600px',
                     gap: '0', justifyContent: 'center', display: 'flex', ml: {xs: 'none', md: '2rem', xl: '10rem'},
                   }}
      >
        <Typography variant="h4" component="h1" gutterBottom mb={3}>
          Sign in <br/>to Politecnico di Torino
        </Typography>
        <Collapse in={open}>
          {errorMsg ? (
            <Alert
              severity="error"
              icon={<Info/>}
              sx={{mb: 2, }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Close fontSize="inherit"/>
                </IconButton>
              }>
              Login was unsuccessful: <strong>{errorMsg}</strong>
            </Alert>
          ) : (
            <Alert
              severity="info"
              icon={<Info/>}
              sx={{mb: 2, backgroundColor: '#cafdf5'}}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Close fontSize="inherit"/>
                </IconButton>
              }>
              Use email: <strong>p101@example.com</strong> / password: <strong>p101</strong>
            </Alert>
          )
          }
        </Collapse>

        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            required
            helperText={helper && "cannot be empty"}
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            margin="normal"
            sx={{
              '.MuiInputBase-root, .MuiOutlinedInput-root': {borderRadius: '10px',},
              '.MuiFormHelperText-root': {color: 'red'},
              '& input:invalid + fieldset': {
                borderColor: helper ? 'red' : 'default',
                borderWidth: 2,
              },
            }}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <TextField
            required
            fullWidth
            helperText={helper && "cannot be empty"}
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    sx={{mr: 0}}
                  >
                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '.MuiFormHelperText-root': {color: 'red'},
              '& input:invalid + fieldset': {
                borderColor: helper ? 'red' : 'default',
                borderWidth: 2,
              },
              '.MuiInputBase-root, .MuiOutlinedInput-root': {borderRadius: '10px',},
            }}

            onChange={(ev) => setPassword(ev.target.value)}
          />
          <Box sx={{padding: '0.7rem'}}/>
          <Link href="#" underline="hover">
            Forgot password?
          </Link>
          <Button
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2, backgroundColor: '#212b36', color: 'white', fontSize: 'large', borderRadius: '12px'}}
            onClick={(ev) => handleSubmit(ev)}
          >
            Login
          </Button>
        </form>
      </StyleColumn>
    </Wrapper>
  );
};
