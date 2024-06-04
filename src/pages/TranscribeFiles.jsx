import { Box, Typography } from '@mui/material'
import React from 'react'
import Header from '../components/Header'

function TranscribeFiles() {
    return (
        <Box p={4}>
            <Box
                display="flex"
                flexDirection="column"
            >
                <Header
                    title="Transcribe Files"
                    subtitle="Audio File Transcription"
                />
                
                <Box mt={4}>

                </Box>
            </Box>
        </Box>
    )
}

export default TranscribeFiles
