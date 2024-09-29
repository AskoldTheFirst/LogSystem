import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { LogFilter } from '../../Biz/Types/LogFilter';
import { LogPageFilterParamsDto } from '../../DTOs/LogPageFilterParamsDto';
import { LogDto } from '../../DTOs/LogDto';
import http from '../../Biz/http';
import { PageDto } from '../../DTOs/PageDto';
import { ProductToString } from '../../Biz/Types/Products';
import { SeverityToString } from '../../Biz/Types/Severity';
import { LayerToString } from '../../Biz/Types/LayerType';

interface Props {
    filter: LogFilter | undefined;
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

export default function LogsTable({ filter, updater }: Props) {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [logs, setLogs] = useState<LogDto[]>([]);

    useEffect(() => {

        if (filter === undefined)
            return;

        let newFilter = {} as LogPageFilterParamsDto;
        
        newFilter.layerType = filter.layerType;
        newFilter.severity = filter.severity;
        newFilter.product = filter.product;
        newFilter.messageSearchTerm = filter.messageSearchTerm;
        newFilter.userSearchTerm = filter.userSearchTerm;
        newFilter.pageNumber = pageNumber;
        newFilter.pageSize = pageSize;

        http.Log.page(newFilter)
            .then((pageData: PageDto<LogDto>) => {
                setLogs(pageData.rows);
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
                            <StyledTableCell align="right">Severity</StyledTableCell>
                            <StyledTableCell align="right">Message</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">User</StyledTableCell>
                            <StyledTableCell align="right">Layer</StyledTableCell>
                            <StyledTableCell align="right">Exception</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="right">{ProductToString(row.product)}</StyledTableCell>
                                <StyledTableCell align="right">{SeverityToString(row.severity)}</StyledTableCell>
                                <StyledTableCell align="right">{row.message}</StyledTableCell>
                                <StyledTableCell align="right">{row.dt}</StyledTableCell>
                                <StyledTableCell align="right">{row.username}</StyledTableCell>
                                <StyledTableCell align="right">{LayerToString(row.layerType)}</StyledTableCell>
                                <StyledTableCell align="right">{row.exception}</StyledTableCell>
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