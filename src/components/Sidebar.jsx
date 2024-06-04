import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../themes/MyTheme';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AudioFileOutlinedIcon from '@mui/icons-material/AudioFileOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{ color: colours.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    )
}

function Sidebar() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("pages")

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colours.primary[400]} !important`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#868DFB !important"
                },
                "& .pro-menu-item.active": {
                    color: "#6870FA !important"
                }
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* Logo & Menu Icon */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: '20px 0 20px 0',
                            color: colours.grey[100]
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h2" color={colours.grey[100]}>
                                    WhisperUI
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* Menu Items */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Typography
                            variant="h6"
                            color={colours.grey[300]}
                            sx={{ p: "25px 0 5px 20px" }}
                        >
                            Main
                        </Typography>
                        <Item
                            title="Home"
                            to="/Dashboard"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colours.grey[300]}
                            sx={{ p: "25px 0 5px 20px" }}
                        >
                            APIs
                        </Typography>
                        <Item
                            title="Transcribe Files"
                            to="/transcribefiles"
                            icon={<AudioFileOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Live Transcribe"
                            to="/livetranscribe"
                            icon={<RadioButtonCheckedOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colours.grey[300]}
                            sx={{ p: "25px 0 5px 20px" }}
                        >
                            Docs
                        </Typography>
                        <Item
                            title="Setup Documentation"
                            to="/Setup"
                            icon={<DescriptionOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="API Documentation"
                            to="/"
                            icon={<DataObjectOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box >
    )
}

export default Sidebar