import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TraceFilter } from "../../Biz/Types/TraceFilter";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Biz/Types/AppState";
import { Ctx } from "../../App/App";

interface Props {
  filter: TraceFilter;
  setFilter: (newFilter: TraceFilter) => void;
}

export default function TraceFilterPanel({ filter, setFilter }: Props) {
  const [messageTerm, setMessageTerm] = useState<string>(
    filter.messageSearchTerm
  );
  const [userTerm, setUserTerm] = useState<string>(filter.userSearchTerm);
  const [product, setProduct] = useState<number>(filter.product);

  const { user } = useContext<AppState>(Ctx);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }

    if (
        filter.product !== product ||
        filter.messageSearchTerm !== messageTerm ||
        filter.userSearchTerm !== userTerm
    ) {
      let newFilter = {} as TraceFilter;

      newFilter.product = product;
      newFilter.messageSearchTerm = messageTerm;
      newFilter.userSearchTerm = userTerm;

      setFilter(newFilter);
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
