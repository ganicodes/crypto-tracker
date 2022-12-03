import { Box, Container, LinearProgress, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import CurrencyContext from '../context/CurrencyContext';
import { CoinList } from '../endpoints/api';
import DataTable from './DataTable';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currency } = useContext(CurrencyContext);

    const [search, setSearch] = useState("");

    const fetchAllCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchAllCoins();
        // eslint-disable-next-line
    }, [currency])

    // console.log(coins);

    return (

        <Box sx={{ color: "#000", minHeight: "600px", padding: { sm: 0, md: 3 } }}>
            <Container sx={{ textAlign: "center" }}>
                <Typography variant='h4' fontWeight='600' marginBottom={2}>Crypto currency</Typography>
                <TextField
                    color="primary"
                    label="Search For a Crypto Currency..."
                    variant="outlined"
                    style={{ marginBottom: 20, width: "100%", color: "#FFF" }}
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                {loading ? (
                    <LinearProgress style={{ backgroundColor: "#CDC5B4" }} />
                ) :
                    <DataTable coins={coins} search={search} />}
            </Container>
        </Box>
    )
}

export default CoinsTable
