import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TableContainer } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';


const columns = [
    {field: 'id', headerName: 'ID', width: 20},
    {field: 'guest_name', headerName: 'Guest Name', width: 200},
    {field: 'guest_count', headerName: 'Guests', width: 70},
    {field: 'booking_time', headerName: 'Horário', width: 100},
    {field: 'guest_phone', headerName: 'Telemóvel', width: 150},
    {field: 'guest_mail', headerName: 'Email', width: 200},
    {field: 'booking_status', headerName: 'Status', width: 200},
    {field: 'booking_source', headerName: 'Source', width: 200}
];

const paginationModel = { page: 0, pageSize: 50 };

export default function RenderedTable(loading, bookingsList) {
    const [rowsBookings, setRowsBookings] = useState([]);
    
    if (loading === false) {
        const bookingsArray = JSON.stringify(bookingsList);

        const mappedRows = bookingsArray.map((row, index) => ({
            id: row.id || index, // Use 'index' como fallback caso não tenha um id
            guest_name: row.guest_name,
            guest_count: row.guest_count,
            booking_time: row.booking_time,
            guest_phone: row.guest_phone,
            guest_mail: row.guest_mail,
            booking_status: row.booking_status,
            booking_source: row.booking_source,
            }));
        setRowsBookings(mappedRows);
    };
    

    if (loading === true) {
        return (
            <>
            <DataGrid
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                stickyHeader
                sx={{zIndex: 0}}
                localeText={{
                    noRowsLabel: 'Loading',
                }}
            />
            </>
        )
    } else {
        return (
            <>
            <DataGrid
                columns={columns}
                rows={rowsBookings}
                initialStateBookings={{ pagination: { paginationModel } }}
                stickyHeader
                sx={{zIndex: 0}}
            />
            </>
        )
    }

};