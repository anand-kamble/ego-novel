import { Box, Button, Heading, Text } from '@radix-ui/themes'
import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/register");
    }

    return (
        <Box width={"100vw"} height={"100vh"} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
        }}>
            <Box maxWidth={"360px"} maxHeight={"48px"} py={"9"}>
                <Heading >
                    Welcome to Ego Novel
                </Heading >
                <Text>
                    A place to write and share your stories
                </Text>

                <Box py={"6"}>

                    <Button onClick={handleGetStarted}>Get Started</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Home
