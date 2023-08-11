import {
    Box,
    Container,
    Text,
    Link,
    Center
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const history = useNavigate();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();

    const submitHandler = async () => {
        if (!name || !email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5000/api/user/",
                {
                    name,
                    email,
                    password,
                    duration: null,
                    plan: null,
                    amount: null,
                },
                config
            );

            console.log(data);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response ? error.response.data.message : "Error Occured",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    return (
        <Container centerContent padding='20' paddingTop='50' margin='0 auto'>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" marginTop='40px'>
                <VStack spacing="5px">
                    <Text fontSize="2xl" >
                        Create Account
                    </Text>
                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Enter Your Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter Your Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup size="md">
                            <Input
                                type={show ? "text" : "password"}
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
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
                        Sign Up
                    </Button>
                    <Text marginTop='10px'>
                        Already have an account?{' '}
                        <Link href='/'>
                            Login
                            <ExternalLinkIcon mx='2px' />
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Container >
    );
};

export default Signup;