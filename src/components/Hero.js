import styled from '@emotion/styled'
import { Box, Container } from '@mui/material'
import React from 'react'
import CoinsCarousel from './CoinsCarousel'

const HeroBanner = styled(Box)(() => ({
    backgroundImage: "url('https://images.unsplash.com/photo-1640826514546-7d2eab70a4e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80')",
    backgroundPosition: 'center top',
    objectFit: "contain",
    color: "#FFF",
    padding: "24px 12px",
    marginBottom: "1rem"
}))

const Hero = () => {
    return (
        <HeroBanner>
            <Container>
                {/* <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: 700, padding: "16px 16px" }} variant="h1" component="h1">Cryptoracker</Typography>
                    <Typography sx={{ fontFamily: "Poppins", fontWeight: 300 }} variant="p" component="h4">A one stop crypto tracker for all your need</Typography>
                </Stack> */}
            </Container>
            <CoinsCarousel />
        </HeroBanner >
    )
}

export default Hero
