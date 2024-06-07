import React from 'react'

import { Box } from '@mui/material'

// React Components
import Header from '../components/Header';

function LiveTranscribe() {
    return (
        <Box p={5}>
            <Box
                display="flex"
                flexDirection="column"
            >
                <Header
                    title="Live Transcribe"
                    subtitle="[POST]: /live-transcribe"
                />
            </Box>
        </Box>
    )
}

export default LiveTranscribe