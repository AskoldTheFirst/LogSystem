import { Grid } from "@mui/material";
import LogsTable from "./LogsTable";
import { useState } from "react";
import TimeUpdaterComponent from "../../CommonComponents/TimeUpdaterComponent";
import LogFilterPanel from "./LogFilterPanel";

export default function Logs() {
  const [flag, setFlag] = useState<boolean>(true);

  function updateHandler() {
    setFlag((prevFlag) => !prevFlag);
  }

  return (
    <>
      <TimeUpdaterComponent
        intervalInSeconds={30}
        updateHandler={updateHandler}
      />
      <Grid container columnSpacing={4}>
        <Grid item xs={10} sm={10} md={2}>
          <LogFilterPanel />
        </Grid>
        <Grid item xs={10} sm={10} md={10}>
          <LogsTable updater={flag} />
        </Grid>
      </Grid>
    </>
  );
}
