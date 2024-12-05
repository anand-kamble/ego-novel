import React, { useState } from 'react'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/userSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router';

const Register = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
    })

    const { loading, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const onInputChange = (key: keyof typeof state, value: string) => {
        setState({
            ...state,
            [key]: value
        })
    }

    const handleRegister = () => {
        //TODO: Add validation for email and password
        dispatch(registerUser(state)).finally(() => {
            if (!error && !loading) {
                console.log("User registered successfully");
                navigate("/stories");
            }
        });
    };

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
                    <Text as='label' size="2" >Email</Text>
                    <TextField.Root size="3" onChange={(e) => onInputChange("email", e.currentTarget.value)} value={state.email} placeholder="example@domain.com" />
                </Box>
                <Flex gap="2">
                    <Box maxWidth="300px">
                        <Text as='label' size="2" >{t('first name')}</Text>
                        <TextField.Root size="3" placeholder="John" onChange={(e) => onInputChange("firstname", e.currentTarget.value)} value={state.firstname} />
                    </Box>
                    <Box maxWidth="300px">
                        <Text as='label' size="2" >{t('last name')}</Text>
                        <TextField.Root size="3" placeholder="Doe" onChange={(e) => onInputChange("lastname", e.currentTarget.value)} value={state.lastname} />
                    </Box>
                </Flex>
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
                    <Box maxWidth="600px" py={"2"}>
                        <Button onClick={handleRegister} loading={loading}>Register</Button>
                    </Box>

                </Flex>
            </Flex>
        </div>
    )
}

export default Register
