import {
    Table,
    Tbody,
    Tr,
    Td,
    Heading,
    Box,
    Tag
} from '@chakra-ui/react';
import {
    Container,
    Text,
    Button,
    // ButtonGroup,
    Flex,
    Square,
    Center,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Stack,
    Spacer
} from "@chakra-ui/react";
import { useState } from "react";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ActivePlan = ({ amount, duration, plan, date, user, setAmount, setDuration, setPlan }) => {
    const navigate = useNavigate();
    const [cancelled, setCancelled] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("test");
        setAmount(200);
        setPlan("basic");
        setDuration("monthly");
        navigate('/dashboard', { plan: plan, duration: duration, amount: amount, date: date, user: user });
    }
    const cancelSubscription = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            await axios.post(
                "http://localhost:5000/api/user/subscribe",
                { user_id: user._id, amount: null, duration: null, plan: null, date: null },
                config
            );

        } catch (error) {
            setLoading(false);
        }
        setCancelled(true);

        setLoading(false);

    }

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    return (
        <Container padding='20' paddingTop='50' margin='0px auto' maxW='2xl'>
            <Box bg="white" w="100%" p={0} borderRadius="lg" borderWidth="1px" margin='0' marginTop='50px'>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >

                    <Container maxW='md' color='white'>
                        <Stack>
                            <CardBody margin='0' pb={2}>
                                <Flex color='white' size='md'>
                                    <Flex>
                                        <Text as='span' mb='5' fontSize='xl' color='black'>Current Plan Details
                                            {cancelled ?
                                                <Tag ml='5px' size='md' key={0} variant='solid' bg='#FBF0F0' color='#E7807D'>
                                                    Cancelled
                                                </Tag> :
                                                <Tag ml='5px' size='md' key={0} variant='solid' bg='#C2DCFC' color='#3268B0'>
                                                    Active
                                                </Tag>
                                            }
                                        </Text>

                                    </Flex>

                                    <Spacer />
                                    <Button colorScheme='blue' variant='ghost' size='sm' onClick={cancelSubscription}>
                                        Cancel
                                    </Button>
                                </Flex>


                                <Text fontSize='lg' color='#535353'>{toTitleCase(plan)}</Text>
                                <Text fontSize='sm' color='#898A8B'>PC + Mobile</Text>

                                <Heading as='h3' size='lg' color='black'>
                                    ₹ {amount}{duration === 'monthly' ? '/mo' : '/yr'}
                                </Heading>
                            </CardBody>

                            <CardFooter p='0px'>
                                <Button colorScheme='teal' variant='outline' color='#1f4d91' onClick={submitHandler}>
                                    Change Plan
                                </Button>
                            </CardFooter>
                            <Box borderRadius='5px' size='sm' bg='tomato' w='100%' p={2} m={0} color='white' bg='#f4f4f6'>
                                <Text fontSize='xs' color='black'>{user.date ? user.date : ""}</Text>
                            </Box>

                        </Stack>
                    </Container>
                </Card>
            </Box>
        </Container>
    );
};

export default ActivePlan;
