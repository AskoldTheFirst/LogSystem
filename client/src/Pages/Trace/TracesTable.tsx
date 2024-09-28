import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { TraceFilter } from "../../Biz/Types/TraceFilter";
import { useEffect, useState } from "react";
import { TraceDto } from "../../DTOs/TraceDto";
import { PageDto } from "../../DTOs/PageDto";
import http from "../../Biz/http";
import { TracePageFilterParamsDto } from "../../DTOs/TracePageFilterParamsDto";
import { ProductToString } from "../../Biz/Types/Products";

interface Props {
    filter: TraceFilter | undefined;
    updater: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#72906d',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TracesTable({ filter, updater }: Props) {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [traces, setTraces] = useState<TraceDto[]>([]);

    useEffect(() => {

        if (filter === undefined)
            return;

        let newFilter = {} as TracePageFilterParamsDto;

        newFilter.product = filter.product;
        newFilter.messageSearchTerm = filter.messageSearchTerm;
        newFilter.userSearchTerm = filter.userSearchTerm;
        newFilter.pageNumber = pageNumber;
        newFilter.pageSize = pageSize;

        http.Trace.page(newFilter)
            .then((pageData: PageDto<TraceDto>) => {
                setTraces(pageData.rows);
                setTotalAmount(pageData.total);
            });

    }, [filter, pageNumber, pageSize, updater]);

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPageNumber(newPage + 1);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {

        setPageSize(parseInt(event.target.value, 10));
    };

    if (filter === undefined)
        return <></>;

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Product</StyledTableCell>
                            <StyledTableCell align="right">Message</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">User</StyledTableCell>
                            <StyledTableCell align="right">Ticks</StyledTableCell>
                            <StyledTableCell align="right">SessionId</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {traces.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="right">{ProductToString(row.product)}</StyledTableCell>
                                <StyledTableCell align="right">{row.message}</StyledTableCell>
                                <StyledTableCell align="right">{row.dt}</StyledTableCell>
                                <StyledTableCell align="right">{row.username}</StyledTableCell>
                                <StyledTableCell align="right">{row.ticks}</StyledTableCell>
                                <StyledTableCell align="right">{row.sessionId}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                defaultValue={10}
                                rowsPerPageOptions={[10, 25, 50]}
                                colSpan={4}
                                count={totalAmount}
                                rowsPerPage={pageSize}
                                showFirstButton={true}
                                showLastButton={true}
                                page={pageNumber - 1}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                onPageChange={handleChangePage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}