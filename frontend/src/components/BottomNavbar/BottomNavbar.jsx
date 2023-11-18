import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function BottomNavbar() {
  const [value, setValue] = React.useState(0);
  const matches = useMediaQuery('(max-width:768px)');

  return matches ? (
    <Box sx={{width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          paddingBottom: '0.8rem', 
          backgroundColor: '#FC7A08',
          '& .MuiBottomNavigationAction-root': {
            marginTop: '0.7rem', // add margin on the top of the icon
            color: 'whitesmoke', // default color
            '&.Mui-selected': { // when the BottomNavigationAction is selected
              color: '#003576', // color when active/selected
              '&:after': { // creates a line on top of the selected item
                content: '""', // the content property is required
                display: 'block',
                position: 'absolute',
                bottom: '115%', // positions it at the top of the item
                left: '35%',
                right: 0,
                height: '4px', // thickness of the line
                width: '30%', // width of the line
                borderRadius: '20px',
                backgroundColor: '#003576', // color of the line
              },
            },
          },
          '& .MuiBottomNavigationAction-label': {
            '&.Mui-selected': {
              color: '#003576', // label color when active/selected
            },
            '&.Mui-focusVisible': {
              color: '#003576', // label color when focused (optional)
            }
          },
        }}
      >
        <BottomNavigationAction label="Dashboard" icon={<GridViewOutlinedIcon />} />
        <BottomNavigationAction label="Proposal List" icon={<ListAltIcon />} />
        <BottomNavigationAction label="Logout" icon={<ExitToAppIcon />} />
      </BottomNavigation>
    </Box>
  ) : null;
}
