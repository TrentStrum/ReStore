import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { Link } from "react-router-dom";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.account);
    const [ancherEl, setAncherEl] = useState(null);
    const open = Boolean(ancherEl);
    const handleClick = (event: any) => {
        setAncherEl(event.currentTarget);
    };
    const handleClose = () => {
        setAncherEl(null);   
    }
    
    return (
        <>
        <Button 
            color='inherit'
            onClick={handleClick}
            sx={{typography: 'h6'}}
        >
            {user?.email}
        </Button>
        <Menu
            anchorEl={ancherEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem component={Link} to='/orders'>My orders</MenuItem>
            <MenuItem onClick={() => {
                dispatch(signOut());
                dispatch(clearBasket());
            }}>Logout</MenuItem>
        </Menu>
        </>
    )
}