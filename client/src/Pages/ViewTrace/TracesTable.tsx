import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TraceDto } from "../../DTOs/TraceDto";
import { PageDto } from "../../DTOs/PageDto";
import http from "../../Biz/http";
import { TracePageFilterParamsDto } from "../../DTOs/TracePageFilterParamsDto";
import { ProductToString } from "../../Biz/Types/Products";
import { Helper } from "../../Biz/Helper";
import { GlobalContext } from "../../globalContext";

interface Props {
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

export default function TracesTable({ updater }: Props) {
    const { traceFilter, user } = useContext(GlobalContext)

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [traces, setTraces] = useState<TraceDto[]>([]);

    useEffect(() => {

        let newFilter = {} as TracePageFilterParamsDto;

        newFilter.product = traceFilter.product;
        newFilter.messageSearchTerm = traceFilter.messageSearchTerm;
        newFilter.userSearchTerm = traceFilter.userSearchTerm;
        newFilter.pageNumber = pageNumber;
        newFilter.pageSize = pageSize;

        const dtNow = Date.now();
        window.Tracer.traceAdv('get traces start', user?.login, dtNow);
        http.Trace.page(newFilter)
            .then((pageData: PageDto<TraceDto>) => {
                window.Tracer.traceAdv('get traces end', user?.login, dtNow);
                setTraces(pageData.rows);
                setTotalAmount(pageData.total);
            });

    }, [traceFilter, pageNumber, pageSize, updater]);

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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" width='70px'>Product</StyledTableCell>
                        <StyledTableCell align="left" width='220px'>Message</StyledTableCell>
                        <StyledTableCell align="center" width='60px'>Date</StyledTableCell>
                        <StyledTableCell align="center" width='70px'>User</StyledTableCell>
                        <StyledTableCell align="center" width='80px'>Ticks, mls</StyledTableCell>
                        <StyledTableCell align="center" width='80px'>SessionId</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {traces.map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell align="center">{ProductToString(row.product)}</StyledTableCell>
                            <StyledTableCell align="left">{Helper.AdaptTextToRowLenthLimit(row.message, 45, 180)}</StyledTableCell>
                            <StyledTableCell align="center">{row.date}</StyledTableCell>
                            <StyledTableCell align="center">{row.username}</StyledTableCell>
                            <StyledTableCell align="center">{row.ticks ? row.ticks / 10000 : 0}</StyledTableCell>
                            <StyledTableCell align="center">{row.sessionId}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            defaultValue={10}
                            rowsPerPageOptions={[10, 25, 50]}
                            colSpan={6}
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
    );
}