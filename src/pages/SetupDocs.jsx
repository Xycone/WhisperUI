import React from 'react'

import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../themes/MyTheme';

// React Components
import Header from '../components/Header';

function SetupDocs() {
  const theme = useTheme();
  const colours = tokens(theme.palette.mode);

  return (
    <Box p={5}>
      <Box
        display="flex"
        flexDirection="column"
      >
        <Header
          title="Setup Documentation"
          subtitle="WhisperAPI Setup Process"
        />

        <Box m={4} p={5} backgroundColor={colours.primary[400]} borderRadius="10px">
          <Box mb={6}>
            <Typography mb={2} variant="h3">
              Docker Desktop Setup
            </Typography>
            <Box mb={1}>
              <Typography variant="h5">Operating System:</Typography>
              <Typography>Windows 11 (21H2 or higher)</Typography>
            </Box>
            <Box>
              <Typography variant="h5">Prerequisites:</Typography>
              <Typography>Enable hardware virtualisation inside BIOS</Typography>
            </Box>
          </Box>

          <Box mb={5}>
            <Typography mb={3} variant="h5">
              Step 1:  Installing Windows Subsystem for Linux (WSL2)
            </Typography>

            <Typography mb={2}>Run Windows Terminal as administrator</Typography>

            <Typography>Enter the following commands into the CLI</Typography>
            <Typography>
              <code>wsl --install</code>
            </Typography>
          </Box>

          <Box mb={5}>
            <Typography mb={3} variant="h5">
              Step 2: Setting up Ubuntu WSL distro
            </Typography>

            <Typography mb={2}>
              Install Ubuntu from the microsoft store and open it
            </Typography>

            <Typography>
              Follow the instructions and create a new UNIX user account
            </Typography>
          </Box>

          <Box mb={10}>
            <Typography mb={3} variant="h5">
              Step 3: Setting up Docker Desktop
            </Typography>

            <Typography>
              Link to download the Docker Desktop Installer:
            </Typography>
            <Typography
              mb={2}
              component="a"
              href="https://docs.docker.com/desktop/install/windows-install/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: colours.greenAccent[300] }}
            >
              https://docs.docker.com/desktop/install/windows-install/
            </Typography>

            <Typography mb={2}>
              Run the installer and open the app after installation is complete
            </Typography>

            <Typography mb={2}>
              Select Ubuntu in <span style={{ fontWeight: "bold" }}>"Settings &gt; Resources &gt; WSL Integration"</span>
            </Typography>

            <Typography>
              Make sure to apply changes and restart
            </Typography>
          </Box>

          <Box mb={6}>
            <Typography variant="h3">
              WhisperAPI App Setup
            </Typography>
          </Box>

          <Box mb={5}>
            <Typography mb={3} variant="h5">
              Creating the Docker image
            </Typography>

            <Typography>
              Link to clone the Github repository:
            </Typography>
            <Typography
              mb={2}
              component="a"
              href="https://github.com/Xycone/WhisperAPI"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: colours.greenAccent[300] }}
            >
              https://github.com/Xycone/WhisperAPI
            </Typography>

            <Typography mb={2}>
              Start the Docker Desktop app
            </Typography>

            <Typography mb={2}>
              Open the Windows Terminal
            </Typography>

            <Typography>
              Replace &lt;file_path&gt; with the path to the project directory
            </Typography>
            <Typography>
              <code>docker build -t whisper-api &lt;file_path&gt;</code>
            </Typography>
          </Box>

          <Box mb={5}>
            <Typography mb={3} variant="h5">
              Running the image using CPU only
            </Typography>

            <Typography mb={2}>
              Open the Windows Terminal
            </Typography>

            <Typography>
              Run the command in the CLI
            </Typography>
            <Typography>
              <code>docker run -p 8000:8000 whisper-api</code>
            </Typography>
          </Box>

          <Box>
            <Typography mb={3} variant="h5">
              Running the image with GPU acceleration
            </Typography>

            <Typography mb={2}>
              Open up the Ubuntu app
            </Typography>

            <Typography>
              Follow instruction to install nvidia container toolkit using Apt
            </Typography>
            <Typography
              mb={1}
              component="a"
              href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: colours.greenAccent[300] }}
            >
              Installing the NVIDIA Container Toolkit
            </Typography>

            <Typography>Verify if installation is successfull</Typography>
            <Typography mb={2}>
              <code>
                nvidia-ctk --version
              </code>
            </Typography>

            <Typography>Configuring Docker to use Nvidia Container Runtime</Typography>
            <Typography>
              <code>
                sudo mkdir -p /etc/docker
              </code>
            </Typography>
            <Typography mb={2}>
              <code>
                sudo tee /etc/docker/daemon.json &lt;&lt;EOF <br />
                {`{`} <br />
                &nbsp;&nbsp;"runtimes": {`{`} <br />
                &nbsp;&nbsp;&nbsp;&nbsp;"nvidia": {`{`} <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"path": "nvidia-container-runtime", <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"runtimeArgs": [] <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{`}`} <br />
                &nbsp;&nbsp;{`}`} <br />
                {`}`} <br />
                EOF
              </code>
            </Typography>

            <Typography mb={2}>
              Make sure Docker Desktop is up to date and reboot Windows
            </Typography>

            <Typography>
              Open up Ubuntu and run the command in the CLI
            </Typography>
            <Typography>
              <code>
                docker run --gpus all -p 8000:8000 whisper-api
              </code>
            </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default SetupDocs