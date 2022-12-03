import { Container, LinearProgress, Stack, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import CurrencyContext from '../context/CurrencyContext';
import axios from 'axios';
import { SingleCoin } from '../endpoints/api';
import parse from 'html-react-parser';
import CoinChart from '../components/CoinChart';

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const descriptionStyles = {
    width: "100%",
    paddingBottom: 2,
    paddingTop: 0,
    textAlign: "justify",
    lineHeight: '24px'
}
const nameStyles = {
    width: '100%',
    fontWeight: '700',
    textAlign: 'center'
}
const headingStyles = {
    fontWeight: "bold",
    marginBottom: 2
}
const marketData = {
    display: 'flex',
    flexDirection: 'column'
}

const CoinPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [coin, setCoin] = useState();
    const { currency, symbol } = useContext(CurrencyContext)

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
    };

    useEffect(() => {
        setLoading(true);
        fetchCoin();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    console.log(coin)
    if (!coin) return <LinearProgress color="info" />;
    return (
        <Container>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flexWrap={'wrap'}
                spacing={{ sm: 8 }}
            >
                {loading ? <CircularProgress color="info" /> :
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={2}
                        flex={2}>

                        <img src={coin?.image.small} alt="logo" style={{ width: '200px', margin: '8px auto' }} />
                        {/* <Avatar src={coin?.image.large} alt="logo" /> */}
                        <Typography variant='h2' component="h2" sx={nameStyles}>{coin?.name}</Typography>
                        <Typography variant='p' component="p" sx={descriptionStyles}>
                            {parse(coin?.description.en.split(". ")[0] + "." || "")}
                        </Typography>
                        <div style={marketData}>
                            <span style={{ display: "flex" }}>
                                <Typography variant="h5" sx={headingStyles}>
                                    Rank:
                                </Typography>
                                &nbsp; &nbsp;
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontFamily: "Montserrat",
                                    }}
                                >
                                    {numberWithCommas(coin?.market_cap_rank || "")}
                                </Typography>
                            </span>
                            <span style={{ display: "flex" }}>
                                <Typography variant="h5" sx={headingStyles}>
                                    CoinGecko Rank:
                                </Typography>
                                &nbsp; &nbsp;
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontFamily: "Montserrat",
                                    }}
                                >
                                    {numberWithCommas(coin?.coingecko_rank || "")}
                                </Typography>
                            </span>
                            <span style={{ display: "flex" }}>
                                <Typography variant="h5" sx={headingStyles}>
                                    CoinGecko Score:
                                </Typography>
                                &nbsp; &nbsp;
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontFamily: "Montserrat",
                                    }}
                                >
                                    {numberWithCommas(coin?.coingecko_score || "")}
                                </Typography>
                            </span>

                            <span style={{ display: "flex" }}>
                                <Typography variant="h5" sx={headingStyles}>
                                    Current Price:
                                </Typography>
                                &nbsp; &nbsp;
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontFamily: "Montserrat",
                                    }}
                                >
                                    {symbol}{" "}
                                    {numberWithCommas(
                                        coin?.market_data.current_price[currency.toLowerCase()] || ""
                                    )}
                                </Typography>
                            </span>
                            <span style={{ display: "flex" }}>
                                <Typography variant="h5" sx={headingStyles}>
                                    Market Cap:
                                </Typography>
                                &nbsp; &nbsp;
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontFamily: "Montserrat",
                                    }}
                                >
                                    {symbol}{" "}
                                    {numberWithCommas(
                                        coin?.market_data.market_cap[currency.toLowerCase()]
                                            .toString()
                                            .slice(0, -6) || ""
                                    )}
                                    M
                                </Typography>
                            </span>
                        </div>
                    </Stack>
                }
                <Stack flex={3} justifyContent="flex-start"
                    alignItems="center">
                    <CoinChart coin={coin} />
                </Stack>
            </Stack>
        </Container >
    )
}

export default CoinPage
