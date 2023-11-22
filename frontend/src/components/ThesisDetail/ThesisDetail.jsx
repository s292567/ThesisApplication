import React, { useState} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  styled,
  useMediaQuery,
  IconButton
} from '@mui/material';
import {Close, WarningRounded} from "@mui/icons-material";
import { applyToProposal } from "../../api/index.js";
import {useUserContext} from "../../contexts/index.js";


const TextWrap = styled(Box)(({theme}) => ({
  backgroundColor: 'whitesmoke',
  borderRadius: '12px',
  padding: '0.3rem 0.8rem',
  marginBottom: '1rem',
  width: "auto",
}));

const MyDialog = styled(Dialog)(({theme}) => ({
  '.MuiPaper-root': {
    borderRadius: '20px',
    padding: '2rem',
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledButton = styled(Button)(({theme}) => ({
  backgroundColor: theme.palette.primary.dark,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  color: theme.palette.common.white,
  fontWeight: '600',
  textTransform: 'none',
  borderRadius: '20px',
  padding: theme.spacing(1, 3),
}));

const ApplyButton = ({isMobile, onCLick}) => {
  return <StyledButton size='large' onClick={() => onCLick()}
                       sx={{display: isMobile ? 'none' : 'block', mt: 2}}>Apply</StyledButton>;
};

export default function ThesisDetail({open, handleClose, thesis, view = ''}) {

  const { userId, user } = useUserContext();

  const isMobile = useMediaQuery('(max-width: 600px)');
  const [warningOpen, setWarningOpen] = useState(false);
  const [confirmedOpen, setConfirmedOpen] = useState(false);
  const [msg, setMsg ] = useState('');

  const handleApply = () => {
    setWarningOpen(true);
  };

  const handleCloseWarning = () => {
    setWarningOpen(false);
    setConfirmedOpen(false);
  };

  const handleApplyed = () => {
    const applyProposal = async () => {
      try {
        const response = await applyToProposal({'studentId': userId, 'proposalId': thesis.id}); // This should be your API call
        setMsg('Correctly Applyed');
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
        setMsg(error);
      }
    };

    applyProposal();
    handleCloseWarning();
    setConfirmedOpen(true);
  }

  return (<>
      <MyDialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="thesis-dialog-title"
        aria-describedby="thesis-dialog-description"
        maxWidth="lg"
        keepMounted={true}
      >
        <DialogTitle id="thesis-dialog-title" sx={{
          fontSize: '1.9rem',
          fontWeight: '600',
          color: theme => theme.palette.primary.dark
        }}>{thesis.title}</DialogTitle>

        <DialogContent>

          <Box sx={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between'}}>
            {/* Left Section */}
            <Box sx={{
              flex: '1 1 auto',
              flexDirection: isMobile ? 'row' : 'column',
              marginRight: 2,
              backgroundColor: theme => theme.palette.primary.lighter,
              borderRadius: '12px'
            }}>
              <TextWrap variant="subtitle1" color="textPrimary"
                        sx={{fontSize: '1.2rem'}}>{thesis.type}</TextWrap>
              <TextWrap variant="subtitle1" color="textPrimary"
                        sx={{fontSize: '1.2rem'}}>{thesis.level}</TextWrap>
              <TextWrap variant="body1" sx={{mt: 1}}>Required
                Knowledge: {thesis.requiredKnowledge}</TextWrap>
              <TextWrap variant="body1">Expiration: {thesis.expiration}</TextWrap>


              {(user.role === "Student") && <ApplyButton key='lateral' isMobile={isMobile} onCLick={handleApply}/>}


            </Box>
            {/* Right Section */}
            <Divider orientation="vertical" flexItem sx={{display: isMobile ? 'none' : 'flex'}}/>
            <Box sx={{flex: '1 1 auto', marginLeft: 2}}>
              <Typography variant="subtitle1" gutterBottom sx={{fontWeight: '500'}}>
                Supervisor: <TextWrap sx={{maxWidth: '200px'}}>{thesis.supervisor}</TextWrap>
              </Typography>
              {thesis.coSupervisors && (
                <Typography variant="subtitle1" gutterBottom sx={{fontWeight: '500'}}>
                  Co-Supervisors: <TextWrap>{thesis.coSupervisors}</TextWrap>
                </Typography>
              )}
              <TextWrap mt={4}>
                <Typography gutterBottom sx={{fontSize: '1.8rem', color: theme => theme.palette.primary.dark}}>
                  Description:
                </Typography>
                <Typography sx={{fontSize: '1.1rem'}}> {thesis.description} </Typography>
              </TextWrap>
              {thesis.notes && (
                <Typography variant="body2" sx={{mt: 6}}>
                  <strong>Notes: </strong> {thesis.notes}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'space-between', alignItems: 'flex-end'}}>


          {(user.role === "Student") && <ApplyButton key='lateral' isMobile={!isMobile} onCLick={handleApply}/>}


          <Button onClick={handleClose} color="error" size='large'>Close</Button>
        </DialogActions>

        <MyDialog key='childApplyModal'
                  open={warningOpen}
                  onClose={handleCloseWarning}
                  aria-labelledby="apply-thesis-title"
                  aria-describedby="apply-thesis-content"
                  maxWidth="sm"
                  keepMounted={true}
                  justifycontent='center'
        >
          <DialogTitle sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'darkred',
            gap: '10px',
            fontSize: 'xx-large'
          }}>
            <WarningRounded fontSize='large'/> Warning!
          </DialogTitle>
          <Divider/>
          <DialogContent>
            <Typography variant='h6'>Are you sure to apply to this Thesis?</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '40px', justifyContent: 'center', mt: 4}}>
              <Button variant='outlined' color='success' sx={{borderRadius: '18px'}} onClick={() => {
                handleApplyed()
              }}>yes</Button>
              <Button variant='outlined' color='error' sx={{borderRadius: '18px'}}
                      onClick={() => handleCloseWarning()}> no </Button>
            </Box>
          </DialogContent>
          <MyDialog key='child-child-ApplyedModal'
                    open={confirmedOpen}
                    onClose={() => {
                      handleClose
                    }}
                    aria-labelledby="applyed-modal"
                    maxWidth="sm"
                    keepMounted={true}
                    justifycontent='center'
          >
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '30px'}}>
              <Typography variant='h5' color='primary.dark'>{msg}</Typography>
              <IconButton onClick={() => handleClose()}><Close size='xx-large'/></IconButton>
            </Box>
          </MyDialog>
        </MyDialog>

      </MyDialog>
    </>
  )
    ;
}
