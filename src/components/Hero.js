import styled from '@emotion/styled'
import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import CoinsCarousel from './CoinsCarousel'

const HeroBanner = styled(Box)(() => ({
    backgroundImage: "url('https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    // backgroundImage: "url('https://images.pexels.com/photos/10771000/pexels-photo-10771000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    // backgroundImage: "url('https://images.pexels.com/photos/45206/roofing-tile-red-wall-45206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    objectFit: "cover",
    color: "#FFF",
    padding: "24px 12px"
}))

const Hero = () => {
    return (
        <HeroBanner>
            <Container>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: 700, padding: "32px 16px" }} variant="h1" component="h1">Cryptoracker</Typography>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: 300 }} variant="p" component="p">A one stop crypto tracker for all your need</Typography>
                </Stack>
            </Container>
            <CoinsCarousel />
        </HeroBanner >
    )
}

export default Hero
