import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import LogsTable from "./LogsTable";
import { useContext, useEffect, useState } from "react";
import { LogFilter } from "../../Biz/Types/LogFilter";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Biz/Types/AppState";
import { Ctx } from "../../App/App";
import UpdateIcon from '@mui/icons-material/Update';


export default function Logs() {
    const [messageTerm, setMessageTerm] = useState<string>('');
    const [userTerm, setUserTerm] = useState<string>('');
    const [product, setProduct] = useState<number>(0);
    const [severity, setSeverity] = useState<number>(0);
    const [layer, setLayer] = useState<number>(0);
    const [filter, setFilter] = useState<LogFilter>();

    const [lastUpdate, setLastUpdate] = useState<string>(getCurrentTime());
    const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
    const [flag, setFlag] = useState<boolean>(true);

    const { user } = useContext<AppState>(Ctx);
    const navigate = useNavigate();

    useEffect(() => {
        const id = setInterval(() => {
            updateLogs();
        }, 10000);
        return () => clearInterval(id);
    }, [flag, autoUpdate]);

    useEffect(() => {

        if (user === null) {
            navigate('/login');
        }

        let newFilter = {} as LogFilter;

        newFilter.layerType = layer;
        newFilter.product = product;
        newFilter.severity = severity;
        newFilter.messageSearchTerm = messageTerm;
        newFilter.userSearchTerm = userTerm;

        setFilter(newFilter);

    }, [messageTerm, userTerm, product, severity, layer]);

    function updateLogs(force = false) {
        if (autoUpdate || force) {
            setFlag(!flag);
            setLastUpdate(getCurrentTime());
        }
    }

    function getCurrentTime(): string {
        const dt = new Date();

        const hour = dt.getHours();
        const hourStr = hour < 10 ? '0' + hour.toString() : hour.toString();

        const min = dt.getMinutes();
        const minStr = min < 10 ? '0' + min.toString() : min.toString();

        const sec = dt.getSeconds();
        const secStr = sec < 10 ? '0' + sec.toString() : sec.toString();

        return `${hourStr}:${minStr}:${secStr}`;
    }

    return (
        <>
            <Grid container columnSpacing={4}>
                <Grid item xs={10} sm={10} md={2}>
                </Grid>
                <Grid item xs={10} sm={10} md={9}>
                    <Stack direction='row' sx={{ marginBottom: 2 }}>

                        <FormGroup>
                            <FormControlLabel
                                control={<Switch
                                    checked={autoUpdate}
                                    onChange={() => {
                                        setAutoUpdate(!autoUpdate);
                                    }}
                                />}
                                label="Auto-Update:"
                                labelPlacement="start"
                            />
                        </FormGroup>

                        <Typography sx={{ marginLeft: 8, paddingTop: '7px', minWidth: '260px' }}>
                            Last updated at: {lastUpdate}
                        </Typography>

                        <Button sx={{ minWidth: '36px', border: 1, marginLeft: '195px' }} onClick={() => updateLogs(true)}>
                            <Typography>
                                UPDATE NOW
                            </Typography>
                            <UpdateIcon sx={{ marginLeft: 1 }} />
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container columnSpacing={4}>
                <Grid item xs={10} sm={10} md={2}>
                    <Box sx={{ marginRight: 1, minWidth: 120 }}>

                        <Typography variant="h6">
                            Filters:
                        </Typography>
                        <hr />

                        <FormControl fullWidth sx={{ marginTop: 4 }}>
                            <FormLabel htmlFor="searchInMsg">Search in messages:</FormLabel>
                            <TextField
                                id="searchInMsg"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={messageTerm}
                                onChange={(event: any) => {
                                    setMessageTerm(event.target.value);
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <FormLabel htmlFor="searchInUsers">Search in users:</FormLabel>
                            <TextField
                                id="searchInUsers"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={userTerm}
                                onChange={(event: any) => {
                                    setUserTerm(event.target.value);
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <FormLabel htmlFor="productOpt">Product:</FormLabel>
                            <Select
                                id="productOpt"
                                value={product}
                                size="small"
                                onChange={(event: any) => setProduct(event.target.value)}
                            >
                                <MenuItem value={0}>All</MenuItem>
                                <MenuItem value={1}>Tester</MenuItem>
                                <MenuItem value={2}>PF</MenuItem>
                                <MenuItem value={3}>FCS</MenuItem>
                                <MenuItem value={4}>Logger</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <FormLabel htmlFor="severityLbl">Severity:</FormLabel>
                            <Select
                                id="severitySelect"
                                value={severity}
                                size="small"
                                onChange={(event: any) => setSeverity(event.target.value)}
                            >
                                <MenuItem value={0}>All</MenuItem>
                                <MenuItem value={1}>High</MenuItem>
                                <MenuItem value={2}>Middle</MenuItem>
                                <MenuItem value={3}>Low</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <FormLabel htmlFor="layerSelect">App Layer:</FormLabel>
                            <Select
                                id="layerSelect"
                                value={layer}
                                size="small"
                                onChange={(event: any) => setLayer(event.target.value)}
                            >
                                <MenuItem value={0}>All</MenuItem>
                                <MenuItem value={1}>Front</MenuItem>
                                <MenuItem value={2}>Back</MenuItem>
                                <MenuItem value={3}>Storage</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                </Grid>
                <Grid item xs={10} sm={10} md={10}>
                    <LogsTable filter={filter} updater={flag} />
                </Grid>
            </Grid>
        </>
    );
}