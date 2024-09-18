import { Button, Menu, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { GlobalCtx } from "./App";

export default function SignedInMenu() {
    const [user, setUser] = useContext(GlobalCtx);

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
                {user.login + ' - ' + user.email}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    localStorage.removeItem('user');
                    setUser(null);
                    handleClose();
                }}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}