import React, { useContext } from 'react'
import { Container } from '@mui/system'
import { AppBar, Button, FormControl, InputBase, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import CurrencyContext from '../context/CurrencyContext'

const BootstrapInput = styled(InputBase)(() => ({
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        border: '0px',
        fontSize: 16,
        padding: '8px 16px',
        backgroundColor: "#fff",
        color: "#000",
        textAlign: "center"
    },
    '& .MuiInputBase-input:focus': {
        backgroundColor: "#fff",
        borderRadius: 4
    }
}));

const Navbar = () => {
    const navigate = useNavigate();
    const { currency, setCurrency } = useContext(CurrencyContext);

    return (
        <AppBar sx={{ backgroundColor: "#120707" }} position="static">
            <Container>
                <Toolbar>
                    <Typography onClick={() => navigate('/')} variant="h6" component="div" sx={{ fontWeight: 700, flexGrow: 1, cursor: "pointer" }}>
                        Cryptoracker
                    </Typography>
                    <FormControl variant='standard' sx={{ color: "#fff", minWidth: 80 }}>
                        <Select input={<BootstrapInput />} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"EUR"}>EUR</MenuItem>
                            <MenuItem selected value={"INR"}>INR</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" sx={{ backgroundColor: "#fff", marginLeft: 2, color: "#000" }} >Login</Button>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default Navbar
