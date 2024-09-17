import { LoadingButton } from "@mui/lab";
import { Box, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Login() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginValid, setloginValid] = useState<boolean>(true);
    const [passwordValid, setPasswordValid] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    function submitForm(event: any) {

        setloginValid(login.length > 0);
        setPasswordValid(password.length > 0);

        if (login.length > 0 && password.length > 0) {
            setLoading(true);

            setLoading(false);
        }
        else {
            event.preventDefault();
        }
    }

    return (
        <Box sx={{ width: '300px', padding: '32px' }}>
            <Typography
                component="h6"
                variant="h6"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                Login
            </Typography>
            <Box
                component="form"
                onSubmit={submitForm}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                    marginTop: '16px'
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <TextField
                        value={login}
                        onChange={(event: any) => { setLogin(event.target.value); setloginValid(true); }}
                        autoFocus
                        fullWidth
                        required={true}
                        sx={{ ariaLabel: 'username' }}
                        error={!loginValid}
                        helperText="Username is required."
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        value={password}
                        onChange={(event: any) => { setPassword(event.target.value); setPasswordValid(true); }}
                        placeholder="••••••"
                        type="password"
                        fullWidth
                        sx={{ ariaLabel: 'password' }}
                        error={!passwordValid}
                        helperText={"Password is required."}
                    />
                </FormControl>
                <LoadingButton
                    loading={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 1 }}
                >
                    Log in
                </LoadingButton>
            </Box>
        </Box>
    );
}