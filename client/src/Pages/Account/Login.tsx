import { LoadingButton } from "@mui/lab";
import { Box, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import http from "../../Biz/http";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../globalContext";
import { Helper } from "../../Biz/Helper";
import { toast } from "react-toastify";

export default function Login() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginValid, setloginValid] = useState<boolean>(true);
    const [passwordValid, setPasswordValid] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const { setUser, user } = useContext(GlobalContext)
    const navigate = useNavigate();

    async function submitForm(event: any) {

        event.preventDefault();

        setloginValid(login.length > 0);
        setPasswordValid(password.length > 0);

        if (login.length > 0 && password.length > 0) {

            setLoading(true);

            const dtNow = Date.now();
            window.Tracer.traceAdv('login begin', null, dtNow);

            await http.Account.login({
                username: login,
                password: password
            })
                .then(retValue => {
                    toast.success('You are successfully logged in.');
                    window.Tracer.traceAdv('login end', retValue.login, dtNow);
                    localStorage.setItem(Helper.UserKey, JSON.stringify(retValue));
                    setUser && setUser(retValue);
                    navigate('/logs');
                })
                .catch(error => {
                    window.Logger.log(error, user?.login, dtNow);
                    if (error.status === 401)
                    {
                        toast.error('Login or password is not correct.');
                    }
                    else
                    {
                        toast.error('There is some network issue. Please try again later.');
                    }
                })
                .finally(() => setLoading(false));
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