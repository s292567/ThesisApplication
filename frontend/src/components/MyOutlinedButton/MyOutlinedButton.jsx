import {Button} from "@mui/material";

const myOutlineButtonStyle = (color, hoverColor) => ({
  fontWeight: "bold",
  color: `${color}`,
  borderRadius: '9px',
  border: `2px solid ${color}`,
  "&:hover": {
    color: `${hoverColor}`,
    border: `2px solid ${hoverColor}`,
    backgroundColor: 'transparent',
  },
});
export default function MyOutlinedButton({text, colorBorder, colorBorderHover, style, onClick}) {

  if (colorBorderHover === undefined) {
    colorBorderHover = colorBorder;
  }

  return (
    <Button variant='outlined' sx={{...myOutlineButtonStyle(colorBorder, colorBorderHover), ...style}} onClick={onClick}> {text} </Button>
  )
}