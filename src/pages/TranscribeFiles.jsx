import React, { useState } from 'react';

import { Box, Typography, Grid, Divider, Button, useTheme } from '@mui/material'
import { tokens } from '../themes/MyTheme';

// MUI Icons
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

// React Components
import Header from '../components/Header'

function TranscribeFiles() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

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

    const handleFileRemove = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <Box p={3}>
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
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Box
                                        onDragOver={handleDragover}
                                        onDrop={handleDrop}
                                        border="2px dashed"
                                        py={3}
                                        textAlign="center"
                                        borderRadius="10px"
                                    >
                                        <DriveFolderUploadOutlinedIcon />
                                        <Typography my={1}>Drag and drop files here</Typography>
                                        <Typography my={1}> - OR -</Typography>
                                        <Button
                                            my={1}
                                            variant="contained"
                                            component="label"
                                        >
                                            <Typography>
                                                Choose File(s)
                                            </Typography>
                                            <input
                                                type="file"
                                                multiple
                                                onChange={handleFileSelect}
                                                style={{ display: 'none' }}
                                            />
                                        </Button>
                                    </Box>
                                </Grid>

                                {selectedFiles.length > 0 && (
                                    selectedFiles.map((file, index) => (
                                        <Grid item xs={12} md={6} lg={4}>
                                            <Box
                                                py={1.5}
                                                display="flex"
                                                justifyContent="center"
                                                border="2px solid"
                                                borderRadius="10px"
                                            >
                                                <Typography mr={1} key={index}>
                                                    {file.name}
                                                </Typography>
                                                <ClearOutlinedIcon />
                                            </Box>
                                        </Grid>
                                    ))
                                )}
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
