import { Grid, Stack, FormGroup, FormControlLabel, Switch, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import UpdateIcon from '@mui/icons-material/Update';

interface Props {
    intervalInSeconds: number;
    updateHandler: () => void;
}

export default function TimeUpdaterComponent({ intervalInSeconds, updateHandler }: Props) {
    const [lastUpdate, setLastUpdate] = useState<string>(getCurrentTime());
    const [autoUpdate, setAutoUpdate] = useState<boolean>(true);

    useEffect(() => {
        const id = setInterval(() => {
            updateLogs();
        }, intervalInSeconds * 1000);
        // TODO: how to treat this?
        return () => clearInterval(id);
    }, [autoUpdate]);

    function updateLogs(force = false) {
        if (autoUpdate || force) {
            updateHandler();
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
        </>
    );
}