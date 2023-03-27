import React from 'react';
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const style = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

function ModalSample({open, handleClose, neededStatus, neededFunction, userId, userName}) {
  console.log(userId);
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
            Confirmation
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, marginLeft:'5px' }}>
            Do you want to { neededStatus }  <span style={{fontWeight:'bold'}}>{userName} !!</span>
            </Typography>
            <Box sx={{ mt: 2, display:'flex', justifyContent:'right' }}>
                <Button variant="outlined"  color="error" sx={{color:'red'}} onClick={handleClose}>Close</Button>
                
                <Button variant="outlined" sx={{color:'blue', marginLeft:'10px'}} 
                onClick={()=>{
                neededFunction(userId);
                handleClose();
                }}
                >Confirm</Button>
            </Box>
        </Box>
    </Modal>
  );
}

export default ModalSample;
