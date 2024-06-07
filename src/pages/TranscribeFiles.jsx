import React, { useState } from 'react';

import { Box, Typography, Grid, Divider, Button, useTheme, TextField, Select, Checkbox, MenuItem } from '@mui/material'
import { tokens } from '../themes/MyTheme';

// MUI Icons
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

// React Components
import Header from '../components/Header';

function TranscribeFiles() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    // Diarisation Checkbox
    const [checked, setChecked] = useState(false);
    const handleChangeCheckbox = (event) => {
        setChecked(event.target.checked);
    };

    // Model Selection
    const [selectedModel, setSelectedModel] = useState("base");
    const handleModelSelect = (event) => {
        setSelectedModel(event.target.value);
    };

    // File Selection
    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

        event.target.value = null;
    };

    const handleFileRemove = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
                        <Grid item xs={12} md={4} lg={2.5}>
                            <Box
                                display="flex"
                                alignItems="center"
                                height="100%"
                                mb={3}
                            >
                                <Typography>Selected Files:</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8} lg={9.5}>
                            <Box>
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<DriveFolderUploadOutlinedIcon />}
                                    size="large"
                                >
                                    <Typography>Select Files</Typography>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileSelect}
                                        style={{ display: 'none' }}
                                    />
                                </Button>
                            </Box>

                            {/* <Box
                                    display="grid"
                                    gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                                    gridAutoRows="1fr"
                                    gridAutoFlow="row"
                                    gap={2}
                                >
                                    {selectedFiles.length > 0 && (
                                        selectedFiles.map((file, index) => (
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
                                        ))
                                    )}
                                </Box> */}
                        </Grid>
                    </Grid>

                    <Divider />

                    <Grid container my={3}>
                        <Grid item xs={12} md={4} lg={2.5}>
                            <Box
                                display="flex"
                                alignItems="center"
                                height="100%"
                                mb={3}
                            >
                                <Typography>Whisper Model Size:</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={8} lg={9.5}>
                            <Box
                                display="flex"
                                alignItems="center"
                                height="100%"
                            >
                                <Select
                                    autoWidth
                                    value={selectedModel}
                                    size="small"
                                    onChange={handleModelSelect}
                                >
                                    <MenuItem value={"tiny"}>Tiny</MenuItem>
                                    <MenuItem value={"base"}>Base</MenuItem>
                                    <MenuItem value={"small"}>Small</MenuItem>
                                    <MenuItem value={"medium"}>Medium</MenuItem>
                                    <MenuItem value={"large"}>Large</MenuItem>
                                </Select>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider />

                    <Grid container my={3}>
                        <Grid item xs={12} md={4} lg={2.5}>
                            <Box
                                display="flex"
                                alignItems="center"
                                height="100%"
                            >
                                <Typography>Speaker Diarisation:</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={8} lg={9.5}>
                            <Checkbox
                                checked={checked}
                                onChange={handleChangeCheckbox}
                            />
                        </Grid>
                    </Grid>
                    {checked && (
                        <Grid container my={3}>
                            <Grid item xs={12} md={4} lg={2.5}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    height="100%"
                                    mb={3}
                                >
                                    <Typography>Number of speakers:</Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={8} lg={9.5}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    height="100%"
                                >
                                    <TextField
                                        type="number"
                                        size="small"
                                        disabled={!checked}
                                        InputProps={{ inputProps: { min: 0, max: 10 } }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    )}

                    <Divider />

                    <Box
                        display="flex"
                        justifyContent="end"
                        my={3}
                    >
                        <Button
                            variant="contained"
                            component="label"
                            size="large"
                        >
                            <Typography>Submit</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default TranscribeFiles
