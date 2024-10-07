import {
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import UpdateIcon from "@mui/icons-material/Update";

interface Props {
  intervalInSeconds: number;
  updateHandler: () => void;
}

export default function TimeUpdaterComponent({
  intervalInSeconds,
  updateHandler,
}: Props) {
  const [lastUpdate, setLastUpdate] = useState<string>(getCurrentTime());
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);

  useEffect(() => {
    const id = setInterval(() => {
      updateLogs();
    }, intervalInSeconds * 1000);
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
    const hourStr = hour < 10 ? "0" + hour.toString() : hour.toString();

    const min = dt.getMinutes();
    const minStr = min < 10 ? "0" + min.toString() : min.toString();

    const sec = dt.getSeconds();
    const secStr = sec < 10 ? "0" + sec.toString() : sec.toString();

    return `${hourStr}:${minStr}:${secStr}`;
  }

  return (
    <Grid container columnSpacing={4} sx={{ width: '100%' }}>
      <Grid item xs={10} sm={10} md={2}></Grid>
      <Grid item xs={10} sm={10} md={9}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoUpdate}
                    onChange={() => {
                      setAutoUpdate(!autoUpdate);
                    }}
                  />
                }
                label="Auto-Update:"
                labelPlacement="start"
              />
            </FormGroup>
            <Typography
              sx={{ marginLeft: 4, minWidth: "80px" }}
            >
              Last updated at: {lastUpdate}
            </Typography>
          </div>
          <Button
            sx={{ minWidth: "50px", border: 1, marginBottom: 2 }}
            onClick={() => updateLogs(true)}
          >
            <Typography>UPDATE NOW</Typography>
            <UpdateIcon sx={{ marginLeft: 1 }} />
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}
