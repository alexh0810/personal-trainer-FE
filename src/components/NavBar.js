import React, {useState} from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    list: {
        width: 250,
    }
})


function NavBar() {
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const classes = useStyles();
  

    return(
        <div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
            <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
            >
            <MenuIcon></MenuIcon>
            </IconButton>
            <SwipeableDrawer
            width={300}
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}>
                <div className={classes.list}>
                    <List>
                        <ListItem button onClick={() => history.push('/customers')}>
                        <ListItemText primary={'Customers'} />
                        </ListItem> 
                        <ListItem button onClick={() => history.push('/trainings')}>
                        <ListItemText primary={'Trainings'} />
                        </ListItem> 
                        <ListItem button onClick={() => history.push('/calendar')}>
                        <ListItemText primary={'Calendar'} />
                        </ListItem> 
                        <ListItem button onClick={() => history.push('/chart')}>
                        <ListItemText primary={'Activity Chart'} />
                        </ListItem> 
                    </List>
                </div>
            </SwipeableDrawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
            
            
        </div>
    )
}

export default NavBar;