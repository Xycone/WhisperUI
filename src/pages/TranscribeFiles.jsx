import React, { useEffect, useState } from 'react';

import {
    Box,
    Typography,
    Grid,
    Divider,
    Button,
    TextField,
    Select,
    Checkbox,
    MenuItem,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
    DialogContentText,
    IconButton
} from '@mui/material'

import { tokens } from '../themes/MyTheme';

// MUI Icons
import CloseIcon from '@mui/icons-material/Close';

// Used for backend API call
import http from '../http';

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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleDialogOpen = () => {
        setDialogOpen(true)
        console.log("Dialog Open")
    };

    const handleDialogClose = () => {
        setDialogOpen(false)
        console.log("Dialog Close")
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // Form
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        // Default Form Values
        initialValues: {
            model_size: "base",
            diarisation: true,
            num_speakers: 2
        },

        // Validation Schema
        validationSchema: yup.object({
            model_size: yup.string()
                .oneOf(["tiny", "base", "small", "medium", "large"])
                .required(),

            diarisation: yup.bool()
                .required(),

            num_speakers: yup.number()
                .min(1, "Must be at least 1")
                .max(10, "Must be 10 or less")
        }),

        onSubmit: (data) => {
            data.model_size = data.model_size.trim();

            const formData = new FormData();

            // Append files to formData
            for (const file of selectedFiles) {
                formData.append("files", file);
            }
            console.log("form submitted")

            setLoading(true);

            // POST Request
            http.post("/transcribe-files", formData, {
                params: {
                    model_size: data.model_size,
                    diarisation: data.diarisation,
                    num_speakers: data.num_speakers
                }
            })
                .then((res) => {
                    console.log("API Response:", res.data);
                    setResponse(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    setResponse(error.response);
                    setLoading(false);
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
                        {/* General Information */}
                        <Grid container my={2}>
                            <Grid item xs={12} md={4} lg={2.5}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    height="100%"
                                >
                                    <Typography variant="h6">Device Type:</Typography>
                                </Box>
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
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    height="100%"
                                >
                                    <Typography variant="h6">File Format:</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8} lg={9.5}>
                                <Typography>mp3, mp4, mpeg, mpga, m4a, wav, webm</Typography>
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
                                    <Typography>File Size Limit (MB):</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8} lg={9.5}>
                                <Typography>25</Typography>
                            </Grid>
                        </Grid>

                        <Divider />


                        {/* Select Files */}
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
                                    <Typography
                                        display="inline"
                                        onClick={handleDialogOpen}
                                        sx={{
                                            textDecoration: "underline",
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: colours.greenAccent[300],
                                            }
                                        }}

                                    >
                                        Upload Files
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Divider />


                        {/* ASR Model Size */}
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


                        {/* Speaker Diarisation & Num Speakers */}
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
                                        checked={formik.values.diarisation}
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


                    {/* JSON Response */}
                    <Box>
                        <Typography my={2}>API Response:</Typography>

                        <Divider />

                        <Box
                            my={2}
                            p={5}
                            backgroundColor={colours.primary[400]}
                            borderRadius="5px"
                            minHeight="60vh"
                            maxHeight="60vh"
                            style={{ overflow: "auto" }}
                        >
                            {loading && (
                                <Typography>
                                    Loading...
                                </Typography>
                            )}

                            {response instanceof Error ? (
                                <Typography>
                                    {response.message}
                                </Typography>
                            ) : (
                                <Typography component="pre">
                                    {JSON.stringify(response, null, 2)}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>


            {/* File Select Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent>
                    <Box p={1}>
                        <Box
                            mb={2}
                            display="flex"
                            alignItems="start"
                            justifyContent="space-between"
                        >
                            <Box>
                                <Typography variant="h5">
                                    Upload Files
                                </Typography>
                                <DialogContentText>
                                    <Typography>
                                        Upload & Attach Audio Files To The API Request.
                                    </Typography>
                                </DialogContentText>
                            </Box>

                            <IconButton onClick={handleDialogClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Typography>{selectedFiles.length} file(s) selected</Typography>

                        <Box
                            p={5}
                            minWidth="fit-content"
                            border="2px dashed"
                            borderRadius="5px"
                            textAlign="center"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            style={{
                                backgroundColor: "inherit",
                                background: "repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 20px, rgba(255, 255, 255, 0.05) 20px, rgba(255, 255, 255, 0.05) 40px)"
                            }}
                        >
                            <Typography mb={1}>
                                Drag & Drop Files
                            </Typography>
                            <Typography mb={1}>
                                or
                            </Typography>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                <Typography>Browse</Typography>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    multiple
                                    onChange={handleFileSelect}
                                />
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box >
    )
}

export default TranscribeFiles
