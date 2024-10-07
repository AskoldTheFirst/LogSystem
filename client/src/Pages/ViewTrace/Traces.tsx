import { useState } from "react";
import TimeUpdaterComponent from "../../CommonComponents/TimeUpdaterComponent";
import TracesTable from "./TracesTable";
import { Grid } from "@mui/material";
import TraceFilterPanel from "./TraceFilterPanel";

export default function Traces() {
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
          <TraceFilterPanel />
        </Grid>
        <Grid item xs={10} sm={10} md={10}>
          <TracesTable updater={flag} />
        </Grid>
      </Grid>
    </>
  );
}
