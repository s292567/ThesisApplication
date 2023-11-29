import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import EditForm from './EditProposal';
import Stack from "@mui/material/Stack";
import {MyOutlinedButton} from "../index.js";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {updateProposal} from "../../api/API_proposals.js";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {frontendRoutes} from "../../routes/index.js";

const style = {
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    bgcolor: 'background.paper',
    maxHeight: '70vh',
    overflowY: 'auto',
    border: '2px solid #000',
    boxShadow: 24,
    p: 7,
    borderRadius: '10px',
    textAlign: 'center',
};
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled"  {...props} />;
});

export default function EditModal ({open, setEdit, setSnackbarOpen, thesis, reload}) {
    const [newData, setNewData] = useState(thesis)
    const navigate = useNavigate();
    const location = useLocation();

    /*const handleCancel = () => {
        setOpen(false);
        setSnackbarOpen(false); // Close the Snackbar if it's open when canceling
    };*/

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleUpdate = () => {
        // Add your update logic here
        // ...

        // Show the Snackbar immediately
        setSnackbarOpen(true);

        // Close the modal
        handleClose();
    };

    return (
        <div>
            {/*<Button onClick={handleOpen}>Open modal</Button>*/}
            <Modal
                open={open}
                onClose={() => setEdit(false)}
            aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EditForm thesis={thesis} setNewData={setNewData}/>
                    <Box mt={4}>
                        <Stack direction="row" spacing={5} alignItems="center" justifyContent="center" >
                            <MyOutlinedButton text={'Back'}
                                              colorBorder={'red'}
                                              colorBorderHover={'darkred'}
                                              style={{fontSize: 'large',}}
                                              onClick={() => setEdit(false)}
                            />

                            <MyOutlinedButton text={'Update'}
                                              colorBorder={'green'}
                                              colorBorderHover={'darkgreen'}
                                              style={{fontSize: 'large',}}
                                              onClick={() => {
                                                  updateProposal(thesis.id, newData);
                                                  reload();
                                                  setSnackbarOpen(true);
                                              setEdit(false)}}
                            />

                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
