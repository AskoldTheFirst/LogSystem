import { Box, Typography, FormControl, FormLabel, TextField, Select, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TraceFilter } from "../../Biz/Types/TraceFilter";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../globalContext";


export default function TraceFilterPanel() {
  const { traceFilter, setTraceFilter } = useContext(GlobalContext)
  const [messageTerm, setMessageTerm] = useState<string>(traceFilter.messageSearchTerm);
  const [userTerm, setUserTerm] = useState<string>(traceFilter.userSearchTerm);
  const [product, setProduct] = useState<number>(traceFilter.product);

  const { user } = useContext(GlobalContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }

    if (
      traceFilter.product !== product ||
      traceFilter.messageSearchTerm !== messageTerm ||
      traceFilter.userSearchTerm !== userTerm
    ) {
      let newFilter = {} as TraceFilter;

      newFilter.product = product;
      newFilter.messageSearchTerm = messageTerm;
      newFilter.userSearchTerm = userTerm;

      setTraceFilter(newFilter);
    }
  }, [messageTerm, userTerm, product]);

  return (
    <Box sx={{ marginRight: 1, minWidth: 120 }}>
      <Typography variant="h6">Filters:</Typography>
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
    </Box>
  );
}
