import React, { useState } from 'react';

import { Box, Typography, Grid, Divider, List, ListItem, ListItemText } from '@mui/material'

// MUI Icons
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

// React Components
import Header from '../components/Header'

function TranscribeFiles() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleDragover = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };



    return (
        <Box p={5}>
            <Box
                display="flex"
                flexDirection="column"
            >
                <Header
                    title="Transcribe Files"
                    subtitle="[POST]: /transcribe-files"
                />

                <Box
                    component="form"
                    m={4}
                >
                    <Grid container my={3}>
                        <Grid item xs={12} md={4} lg={2.5}>
                            <Typography variant="h6">File Format:</Typography>
                        </Grid>
                        <Grid item xs={12} md={8} lg={9.5}>
                            <Typography>mp3, mp4, mpeg, mpga, m4a, wav, webm</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container my={3}>
                        <Grid item xs={12} md={4} lg={2.5}>
                            <Typography>File Size Limit (MB):</Typography>
                        </Grid>
                        <Grid item xs={12} md={8} lg={9.5}>
                            <Typography>25</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container my={3}>
                        <Grid item xs={12} md={4} lg={2.5} mb={3}>
                            <Typography>Selected Files:</Typography>
                        </Grid>
                        <Grid item xs={12} md={8} lg={9.5}>
                            <Grid container spacing={{ xs: 3, lg: 10 }}>
                                <Grid item xs={12} lg={6}>
                                    <Box
                                        onDragOver={handleDragover}
                                        onDrop={handleDrop}
                                        border="2px dashed"
                                        py={5}
                                        textAlign="center"
                                        borderRadius="10px"
                                    >
                                        <DriveFolderUploadOutlinedIcon />
                                        <Typography>Drag and drop files here</Typography>
                                        <Typography> - OR -</Typography>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileSelect}
                                            style={{ display: 'none' }}
                                            id="fileInput"
                                        />
                                        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                                            <Typography color="primary">Click to select files</Typography>
                                        </label>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <Box>
                                        {selectedFiles.length > 0 && (
                                            selectedFiles.map((file, index) => (
                                                <Typography key={index}>
                                                    {file.name}
                                                </Typography>
                                            ))
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container my={3}>
                        <Grid item xs={12} md={4} lg={2.5}>
                            <Typography>Speaker Diarisation:</Typography>
                        </Grid>
                        <Grid item xs={12} md={8} lg={9.5}>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default TranscribeFiles
