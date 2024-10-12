import * as React from 'react';
import Paper from '@mui/material/Paper';
import LoadingOverlay from './LoadingOverlay';
import RenderedTable from './RenderedTable';
import { useState } from 'react';
import { useEffect } from 'react';


export default function BookingsTable({tableWidth, tableMt, loading, bookingsList}) {

    if (loading === true) {
        return (
            <Paper 
                sx={{
                    width: `calc(100% - ${tableWidth}px) !important`,
                    ml: `${tableWidth}px`,
                    marginTop: `${tableMt}px`,
                    position: 'absolute',
                    height: '100svh'
                }}>
                
                <LoadingOverlay />
    
                <RenderedTable loading={true} bookingsList={bookingsList}/>
                
            </Paper>
        )
    } else {
        return (
            <Paper 
                sx={{
                    width: `calc(100% - ${tableWidth}px)`,
                    ml: `${tableWidth}px`,
                    marginTop: `${tableMt}px`,
                    position: 'absolute',
                }}>                
    
                <RenderedTable loading={false} bookingsList={bookingsList}/>
                
            </Paper>
        )
    }
};