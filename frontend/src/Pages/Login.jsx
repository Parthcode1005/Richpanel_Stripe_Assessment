import {
    Box,
    Container,
    Text,
    Link
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const Login = ({ user, setUser }) => {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/user/login",
                { email: email, password: password },
                config
            );

            console.log(data);

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/dashboard', { user: user })

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response ? error.response.data.message : "Error Occured",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };
    return (
        <Container minH='100%' centerContent padding='20' paddingTop='50px' margin='0 auto'>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" marginTop='50px'>
                <VStack spacing="5px" padding={3}>
                    <Text fontSize="2xl"  >
                        Login to your account
                    </Text>
                    <FormControl id="email" marginTop='20px' isRequired>
                        <FormLabel>Emai Address</FormLabel>
                        <Input
                            value={email}
                            type="email"
                            placeholder="Enter Your Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button bg='#1F4D91'
                        color='white' variant='solid'
                        width="80%"
                        onClick={submitHandler}
                        style={{ marginTop: 15 }}
                        isLoading={loading}
                    >
                        Login
                    </Button>
                    <Text marginTop='10px'>
                        New to my app?{' '}
                        <Link href='/signup' >
                            Sign Up
                            <ExternalLinkIcon mx='2px' />
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Container>
    );
};

export default Login;
