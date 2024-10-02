import { useState } from "react";
import TimeUpdaterComponent from "../../CommonComponents/TimeUpdaterComponent";
import TracesTable from "./TracesTable";
import { TraceFilter } from "../../Biz/Types/TraceFilter";
import { Grid } from "@mui/material";
import TraceFilterPanel from "./TraceFilterPanel";

export default function Traces() {
    const [filter, setFilter] = useState<TraceFilter>({ messageSearchTerm: '', userSearchTerm: '', product: 0 });
    let [flag, setFlag] = useState<boolean>(true);

    function updateHandler() {
        //console.log(flag);
        
        // TODO - What is this ?!! :O
        setFlag(!flag);
        flag = !flag;
    }

    return (
        <>
            <TimeUpdaterComponent intervalInSeconds={12} updateHandler={updateHandler} />
            <Grid container columnSpacing={4}>
                <Grid item xs={10} sm={10} md={2}>
                    <TraceFilterPanel filter={filter} setFilter={setFilter} />
                </Grid>
                <Grid item xs={10} sm={10} md={10}>
                    <TracesTable filter={filter} updater={flag} />
                </Grid>
            </Grid>
        </>
    );
}