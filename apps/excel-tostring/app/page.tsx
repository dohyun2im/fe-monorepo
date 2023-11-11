'use client';

import {
  AddPhotoAlternateRounded,
  ChangeCircle,
  CloudDownloadTwoTone,
  CopyAll,
  Delete,
  FileUploadRounded,
  Mouse,
  PanTool,
  Upload,
} from '@mui/icons-material';
import { Alert, Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material';
import { red, teal } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDropzone } from 'react-dropzone';
import { Appbar } from 'ui-mui';
import * as XLSX from 'xlsx';

const DropZoneContainer = styled('div')`
  width: 100%;
  height: 100%;
`;

export default function Home(): JSX.Element {
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<Array<Array<string>>>([]);

  const imageOnDrop = useCallback((acceptedFiles: Array<File>): void => {
    setError('');
    if (_.isEmpty(acceptedFiles)) {
      setError('Upload only one file.');
      return;
    }

    const file = acceptedFiles[0];
    if (file.size === 0 || _.isEmpty(file)) {
      setError('The file is missing.');
      return;
    }

    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setError('Must be a file with .xlsx extension.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(fileData, { type: 'array', cellText: false });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: Array<Array<string>> = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const arr = jsonData.filter((d: Array<string>) => d.length > 0);
      if (_.isEmpty(arr)) {
        setError('No data in the file.');
        return;
      }
      setData(arr);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { getRootProps, getInputProps, open, isDragActive, isDragAccept } = useDropzone({
    onDrop: imageOnDrop,
    noDragEventsBubbling: true,
    noClick: !_.isEmpty(data),
    maxFiles: 1,
  });

  return (
    <SnackbarProvider maxSnack={3}>
      <Appbar icon={<ChangeCircle fontSize="large" />} title="Excel to String" color={teal[500]} />
      <Box sx={{ p: 2 }}>
        {error && (
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: 'relative',
          height: '80vh',
          border: '2px dashed #eee',
          mx: 2,
          p: !_.isEmpty(data) ? '20px' : undefined,
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <DropZoneContainer {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {!_.isEmpty(data) ? (
            <>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography fontWeight={600}>[</Typography>
                {data.map((d: Array<string>, i) => (
                  <Typography key={i} whiteSpace="nowrap" fontWeight={600} sx={{ mx: 4, letterSpacing: 1.5 }}>
                    {`[ ${d.join(', ')} ]`}
                  </Typography>
                ))}
                <Typography fontWeight={600}>]</Typography>
              </Box>
              <Tooltip title="Copy" arrow placement="top">
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 100,
                  }}
                >
                  <CopyToClipboard
                    text={`[\n\t${data
                      .map((subArray, index, array) => {
                        const isLast = index === array.length - 1;
                        const subArrayStr = `[${subArray.join(', ').replace(/\n/g, '')}]`;
                        return isLast ? subArrayStr : `${subArrayStr},\n\t`;
                      })
                      .join('')}\n]`}
                    onCopy={() =>
                      enqueueSnackbar('Copied on your clipboard', {
                        variant: 'success',
                      })
                    }
                  >
                    <IconButton
                      sx={{
                        background: '#fff',
                        opacity: 0.75,
                        '&:hover': { background: '#fff', opacity: 1 },
                        '@keyframes shake': {
                          '0%': {
                            transform: 'translate(0, 0)',
                          },
                          '50%': {
                            transform: 'translate(0, -12px)',
                          },
                          '100%': {
                            transform: 'translate(0, 0)',
                          },
                        },
                        animation: 'shake 2s ease 3',
                      }}
                    >
                      <CopyAll htmlColor={teal[500]} />
                    </IconButton>
                  </CopyToClipboard>
                </Box>
              </Tooltip>
              <Tooltip title="Upload" arrow placement="top">
                <IconButton
                  onClick={open}
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 55,
                    background: '#fff',
                    opacity: 0.75,
                    '&:hover': { background: '#fff', opacity: 1 },
                  }}
                >
                  <Upload />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow placement="top">
                <IconButton
                  onClick={() => setData([])}
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: '#fff',
                    opacity: 0.75,
                    '&:hover': { background: '#fff', opacity: 1 },
                  }}
                >
                  <Delete htmlColor={red[500]} />
                </IconButton>
              </Tooltip>
            </>
          ) : isDragAccept ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: '100%',
                height: '100%',
                background: 'repeating-linear-gradient(50deg, #fff, #fff 30px, #eee 30px, #eee 60px)',
              }}
              {...getRootProps({ className: 'dropzone' })}
            >
              <CloudDownloadTwoTone
                sx={{
                  color: '#5cb9fb',
                  width: 150,
                  height: 150,
                }}
              />

              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                sx={{
                  padding: '6px 30px',
                  borderRadius: 1,
                  color: '#666',
                  backgroundColor: '#fff',
                  border: '2.5px dashed #5cb9fb',
                  opacity: 0.6,
                }}
              >
                <AddPhotoAlternateRounded sx={{ mr: 1, mb: 0.5 }} />
                Put the file in the zone !
              </Typography>
            </Box>
          ) : (
            !isDragActive && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  width: '100%',
                  height: '100%',
                  ':hover': {
                    transform: 'scale(1.2)',
                  },
                }}
              >
                <Avatar sx={{ p: 5, mb: 2 }}>
                  <FileUploadRounded
                    sx={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </Avatar>

                <Typography
                  variant="subtitle1"
                  display="flex"
                  alignItems="center"
                  sx={{
                    padding: '8px 16px',
                    borderRadius: 1,
                    color: '#666666',
                    backgroundColor: '#eee',
                    mx: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Mouse sx={{ fontSize: 16 }} />
                  Click or
                  <PanTool sx={{ fontSize: 16, ml: 0.5, mr: 0.5 }} />
                  drag & drop your file.
                </Typography>
              </Box>
            )
          )}
        </DropZoneContainer>
      </Box>
    </SnackbarProvider>
  );
}
