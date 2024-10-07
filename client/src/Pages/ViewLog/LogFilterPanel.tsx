import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, FormControl, FormLabel, TextField, Select, MenuItem, } from "@mui/material";
import { LogFilter } from "../../Biz/Types/LogFilter";
import { GlobalContext } from "../../globalContext";

export default function LogFilterPanel() {
  const { user, logFilter, setLogFilter } = useContext(GlobalContext)
  const [messageTerm, setMessageTerm] = useState<string>(logFilter.messageSearchTerm);
  const [userTerm, setUserTerm] = useState<string>(logFilter.userSearchTerm);
  const [product, setProduct] = useState<number>(logFilter.product);
  const [severity, setSeverity] = useState<number>(0);
  const [layer, setLayer] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }

    let newFilter = {} as LogFilter;

    newFilter.layerType = layer;
    newFilter.product = product;
    newFilter.severity = severity;
    newFilter.messageSearchTerm = messageTerm;
    newFilter.userSearchTerm = userTerm;

    setLogFilter(newFilter);
  }, [messageTerm, userTerm, product, severity, layer]);

  return (
    <Box sx={{ marginRight: 1, marginBottom: 2, minWidth: 120 }}>
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
  );
}
