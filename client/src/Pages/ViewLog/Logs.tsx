import { Grid } from "@mui/material";
import LogsTable from "./LogsTable";
import { useState } from "react";
import { LogFilter } from "../../Biz/Types/LogFilter";
import TimeUpdaterComponent from "../../CommonComponents/TimeUpdaterComponent";
import LogFilterPanel from "./LogFilterPanel";

export default function Logs() {
  const [filter, setFilter] = useState<LogFilter>({
    messageSearchTerm: "",
    userSearchTerm: "",
    product: 0,
    severity: 0,
    layerType: 0
  });
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
          <LogFilterPanel filter={filter} setFilter={setFilter} />
        </Grid>
        <Grid item xs={10} sm={10} md={10}>
          <LogsTable filter={filter} updater={flag} />
        </Grid>
      </Grid>
    </>
  );
}
