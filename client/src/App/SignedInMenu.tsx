import { Button, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../globalContext";
import { Helper } from "../Biz/Helper";

export default function SignedInMenu() {
    const { user, setUser } = useContext(GlobalContext)
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                color='inherit'
                onClick={handleClick}
                sx={{ typography: 'h6', fontSize: 12 }}
            >
                {user?.login + ' - ' + user?.email}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    localStorage.removeItem(Helper.UserKey);
                    setUser && setUser(null);
                    handleClose();
                    navigate('/login');
                }}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}