import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loader = () => {
  return (
    <Box sx={{ display: 'flex', width:'100%', justifyContent:'center', paddingTop:'100px' }}>
      <CircularProgress disableShrink />
    </Box>
  );
}
