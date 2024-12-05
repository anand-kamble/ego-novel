import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import React from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { signInUser } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router'

const SignIn = () => {

    const { loading, loggedIn, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        username: "",
        password: "",
    })


    const onInputChange = (key: keyof typeof state, value: string) => {
        setState({
            ...state,
            [key]: value
        })
    }

    const handleSignIn = () => {
        if (state.username && state.password) {
            dispatch(signInUser(state)).then((res) => {
                if (res.payload.error === undefined) {
                    navigate("/stories");
                }
            })
        }
    };

    const handleRegister = () => {
        navigate("/register");
    }

    return (
        <div style={{
            width: "100vw",
            height: "calc(100vh - 60px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Flex direction="column" gap="3">
                <Box maxWidth="600px">
                    <Text as='label' size="2" >Username</Text>
                    <TextField.Root size="3" placeholder="Username" name='username' onChange={(e) => onInputChange("username", e.currentTarget.value)} value={state.username} />
                </Box>
                <Box maxWidth="600px">
                    <Text as='label' size="2" >Password</Text>
                    <TextField.Root size="3" placeholder="Password" name='Password' onChange={(e) => onInputChange("password", e.currentTarget.value)} value={state.password} />
                </Box>
                <Flex style={{
                    alignItems: "center",
                    justifyContent: "center",
                }} direction={"column"}>
                    <Text as='p' color='red'>{error}</Text>
                    <Flex gap={'3'}>
                        <Box maxWidth="600px" py={"2"}>
                            <Button onClick={handleSignIn} loading={loading}>Sign In</Button>

                        </Box>
                        <Box maxWidth="600px" py={"2"}>
                            {
                                error ? <Button onClick={handleRegister} loading={loading}>Register</Button>
                                    : null
                            }
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    )
}

export default SignIn;
