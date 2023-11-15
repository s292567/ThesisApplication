import { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const RoundShapeLabel = styled("div")(({ checked }) => ({
  borderRadius: "15px",
  padding: "5px 10px",
  backgroundColor: checked ? "blue" : "whitesmoke",
  color: checked ? "white" : "black",
  cursor: "pointer",
  userSelect: "none",
  margin: "5px 0",
  display: "inline-block",
}));

const CheckBoxes = () => {
  const defaultChecked = {
    title: false,
    supervisor: false,
    coSupervisors: false,
    keywords: false,
    type: false,
    groups: false,
    description: false,
    requiredKnowledge: false,
    notes: false,
    expiration: false,
    Msc: false,
    Bsc: false,
    cds: false,
  };
  
  const [checked, setChecked] = useState({ ...defaultChecked });
  const [open, setOpen] = useState(false);

  const handleCheckChange = (key) => {
    setChecked({ ...checked, [key]: !checked[key] });
  };

  const handleClear = () => {
    setChecked({ ...defaultChecked });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {Object.keys(checked).map((key) => (
              <RoundShapeLabel
                key={key}
                checked={checked[key]}
                onClick={() => handleCheckChange(key)}
              >
                {key}
              </RoundShapeLabel>
            ))}
          </Box>
          <Button onClick={handleClear}>Clear Filters</Button>
          <Button onClick={handleClose}>Apply</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckBoxes;
