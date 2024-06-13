import React, { useEffect, useState } from 'react';

import { Box, Typography, Grid, Divider, Button, TextField, Select, Checkbox, MenuItem, FormControl, useTheme } from '@mui/material'
import { tokens } from '../themes/MyTheme';

// Used for backend API call
import http from '../http';

// MUI Icons
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

// Form & Form Validation
import * as yup from 'yup';
import { useFormik } from 'formik';

// React Components
import Header from '../components/Header';

function TranscribeFiles() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    // Device model is running on
    const [device, setDevice] = useState(null);
    useEffect(() => {
        http.get("/get-device").then((res) => {
            setDevice(res.data.device);
        });
    }, []);

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

    // Form
    const formik = useFormik({
        // Default Form Values
        initialValues: {
            model_size: "base",
            diarisation: false,
            num_speakers: 1
        },

        // Validation Schema
        validationSchema: yup.object({
            model_size: yup.string()
                .oneOf(["tiny", "base", "small", "medium", "large"])
                .required(),

            diarisation: yup.bool()
                .required(),

            num_speakers: yup.number()
                .min(1, 'Must be at least 1')
                .max(10, 'Must be 10 or less')
        }),

        onSubmit: (data) => {
            data.model_size = data.model_size.trim();

            if (!data.diarisation) {
                data.num_speakers = 1
            };

            const formData = new FormData();

            console.log("model_size:", typeof data.model_size);
            console.log("diarisation:", typeof data.diarisation);
            console.log("num_speakers:", typeof data.num_speakers);

            formData.append('model_size', data.model_size);
            formData.append('diarisation', data.diarisation);
            formData.append('num_speakers', data.num_speakers);

            // Append files to formData
            for (let file of selectedFiles) {
                formData.append('files', file);
            }

            for (const [key, value] of formData.entries()) {
                console.log(key, ":", value);
            }

            console.log(formData);

            // POST Request
            http.post("/transcribe-files", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => {
                    console.log("API Response:", response.data);
                })
                .catch((error) => {
                    console.error("API Error:", error);
                });
        }
    });

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
                    <Box mb={10}>
                        <Grid container my={2}>
                            <Grid item xs={12} md={4} lg={2.5}>
                                <Typography variant="h6">Device Type:</Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={9.5}>
                                <Typography>
                                    {device ? (
                                        device
                                    ) : (
                                        "- N.A. -"
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider />

                        <Grid container my={2}>
                            <Grid item xs={12} md={4} lg={2.5}>
                                <Typography variant="h6">File Format:</Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={9.5}>
                                <Typography>mp3, mp4, mpeg, mpga, m4a, wav, webm</Typography>
                            </Grid>
                        </Grid>

                        <Divider />

                        <Grid container my={2}>
                            <Grid item xs={12} md={4} lg={2.5}>
                                <Typography>File Size Limit (MB):</Typography>
                            </Grid>
                            <Grid item xs={12} md={8} lg={9.5}>
                                <Typography>25</Typography>
                            </Grid>
                        </Grid>

                        <Divider />

                        <Grid container my={2}>
                            <Grid item xs={12} md={4} lg={2.5}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    height="100%"
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
                            </Grid>
                        </Grid>

                        <Divider />

                        <Grid container my={2}>
                            <Grid item xs={12} md={4} lg={2.5}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    height="100%"
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
                                        size="small"
                                        name="model_size"
                                        value={formik.values.model_size}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.model_size && Boolean(formik.errors.model_size)}
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

                        <Grid container my={2}>
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
                                <FormControl error={formik.touched.diarisation && Boolean(formik.errors.diarisation)}>
                                    <Checkbox
                                        name="diarisation"
                                        value={formik.values.diarisation}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        {formik.values.diarisation && (
                            <Grid container my={2}>
                                <Grid item xs={12} md={4} lg={2.5}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        height="100%"
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
                                            disabled={!formik.values.diarisation}
                                            InputProps={{ inputProps: { min: 1, max: 10 } }}
                                            name="num_speakers"
                                            value={formik.values.num_speakers}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.num_speakers && Boolean(formik.errors.num_speakers)}
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
                                type="submit"
                                component="label"
                                size="large"
                                onClick={formik.handleSubmit}
                            >
                                <Typography>Submit</Typography>
                            </Button>
                        </Box>
                    </Box>

                    <Box>
                        <Typography my={2}>API Response:</Typography>

                        <Divider />

                        <Box my={2} p={5} backgroundColor={colours.primary[400]} borderRadius="10px">
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default TranscribeFiles
