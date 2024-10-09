import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, TablePagination } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { LogPageFilterParamsDto } from '../../DTOs/LogPageFilterParamsDto';
import { LogDto } from '../../DTOs/LogDto';
import http from '../../Biz/http';
import { PageDto } from '../../DTOs/PageDto';
import { ProductToString } from '../../Biz/Types/Products';
import { SeverityToString } from '../../Biz/Types/Severity';
import { LayerToString } from '../../Biz/Types/LayerType';
import { Helper } from '../../Biz/Helper';
import Modal from '../../Modal/modal';
import useModal from '../../Hooks/useModal';
import { GlobalContext } from '../../globalContext';

interface Props {
    updater: boolean;
}

const exceptionTextLength = 200;

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

export default function LogsTable({ updater }: Props) {
    const { logFilter } = useContext(GlobalContext)
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [logs, setLogs] = useState<LogDto[]>([]);

    useEffect(() => {

        let newFilter = {} as LogPageFilterParamsDto;

        newFilter.layerType = logFilter.layerType;
        newFilter.severity = logFilter.severity;
        newFilter.product = logFilter.product;
        newFilter.messageSearchTerm = logFilter.messageSearchTerm;
        newFilter.userSearchTerm = logFilter.userSearchTerm;
        newFilter.pageNumber = pageNumber;
        newFilter.pageSize = pageSize;

        http.Log.page(newFilter)
            .then((pageData: PageDto<LogDto>) => {
                setLogs(pageData.rows);
                setTotalAmount(pageData.total);
            });

    }, [logFilter, pageNumber, pageSize, updater]);

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

    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" width='6%'>Product</StyledTableCell>
                            <StyledTableCell align="center" width='6%'>Severity</StyledTableCell>
                            <StyledTableCell align="center" width='15%'>Message</StyledTableCell>
                            <StyledTableCell align="center" width='15%'>Date</StyledTableCell>
                            <StyledTableCell align="center" width='6%'>User</StyledTableCell>
                            <StyledTableCell align="center" width='6%'>Layer</StyledTableCell>
                            <StyledTableCell align="center" width='40%'>Exception</StyledTableCell>
                            <StyledTableCell align="center" width='6%'>Detail</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">{ProductToString(row.product)}</StyledTableCell>
                                <StyledTableCell align="center">{SeverityToString(row.severity)}</StyledTableCell>
                                <StyledTableCell align="center">{Helper.AdaptTextToRowLenthLimit(row.message, 20, 100)}</StyledTableCell>
                                <StyledTableCell align="center">{row.date}</StyledTableCell>
                                <StyledTableCell align="center">{row.username}</StyledTableCell>
                                <StyledTableCell align="center">{LayerToString(row.layerType)}</StyledTableCell>
                                <StyledTableCell align="left">{Helper.AdaptTextToRowLenthLimit(row.exception, 28, exceptionTextLength)}</StyledTableCell>
                                <StyledTableCell align="center"><div>
                                    <button disabled={row.exception === undefined || row.exception?.length < exceptionTextLength} onClick={openModal}>View</button>
                                    <Modal isOpen={isOpen} closeModal={closeModal}>
                                        <h2>Exception details:</h2>
                                        <p>{row.exception}</p>
                                        <button onClick={closeModal}>Закрыть</button>
                                    </Modal>
                                </div></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                defaultValue={10}
                                rowsPerPageOptions={[10, 25, 50]}
                                colSpan={8}
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