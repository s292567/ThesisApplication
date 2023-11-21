import React from 'react';
import {Modal, Box, Typography, Paper, Button, useMediaQuery, useTheme, Stack, Divider} from '@mui/material';

export default function ThesisDetail({open, setOpen, thesis}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={{padding: theme.spacing(2), borderRadius: '15px'}}>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          {/* Desktop View Sidebar */}
          <Box sx={{flex: '1 1 auto', marginRight: theme.spacing(2)}}>
            <Typography variant="subtitle1">Type: {thesis.type}</Typography>
            <Typography variant="subtitle1">Level: {thesis.level}</Typography>
            <Typography variant="subtitle1">Required Knowledge: {thesis.requiredKnowledge}</Typography>
            <Typography variant="subtitle1">Expiration: {thesis.expiration}</Typography>
            <Button variant="contained" sx={{mt: 2}}>Apply</Button>
          </Box>
          {/* Desktop View Main Content */}
          <Box sx={{flex: '3 1 auto'}}>
            <Typography variant="h5" gutterBottom>
              {thesis.title}
            </Typography>
            <Typography variant="subtitle1">
              Supervisor: {thesis.supervisor}
            </Typography>
            {thesis.coSupervisors && (
              <Typography variant="subtitle1">
                Co-Supervisors: {thesis.coSupervisors}
              </Typography>
            )}
            <Typography variant="body1">{thesis.description}</Typography>
            {thesis.notes && (
              <Typography variant="body2">Notes: {thesis.notes}</Typography>
            )}
          </Box>
        </Box>

      </Paper>

    </Modal>
  );
}
