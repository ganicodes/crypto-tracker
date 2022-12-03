import React, { useContext } from 'react'
import { Container } from '@mui/system'
import { AppBar, FormControl, InputBase, MenuItem, Select, styled, Toolbar, Typography } from '@mui/material'
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

        <AppBar position="sticky">
            <Container>
                <Toolbar sx={{ paddingLeft: { md: 0 }, paddingRight: { md: 0 }, }}>
                    <Typography onClick={() => navigate('/')} variant="h6" component="div" sx={{ fontWeight: 700, flexGrow: 1, cursor: "pointer" }}>
                        Cryptoracker
                    </Typography>
                    <FormControl variant='outlined' sx={{ color: "#000", minWidth: 80 }}>
                        <Select input={<BootstrapInput />} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"EUR"}>EUR</MenuItem>
                            <MenuItem selected value={"INR"}>INR</MenuItem>
                        </Select>
                    </FormControl>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default Navbar
