import {
    Table,
    Tbody,
    Tr,
    Td,
    Heading,
    Box
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
    Stack
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { useState } from "react";
import axios from "axios";
// import { useToast } from "@chakra-ui/react";
// import { useNavigate } from 'react-router-dom';
import StripeContainer from '../Components/StripeContainer';

const Payment = ({ duration, plan, amount, date, setDate, user }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        setDate(new Date().toISOString());
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            console.log(amount, duration, plan, date);

            await axios.post(
                "http://localhost:5000/api/user/subscribe",
                { user_id: user._id, amount: amount, duration: duration, plan: plan, date: new Date().toISOString() },
                config
            );

            navigate('/activeplan', { plan: plan, duration: duration, amount: amount, date: date, user: user });

        } catch (error) {
            setLoading(false);
            console.log("error");
        }


    }

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
    // const navigate = useNavigate();
    // const [show, setShow] = useState(false);
    // const handleClick = () => setShow(!show);
    // const toast = useToast();
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    // const [loading, setLoading] = useState(false);

    // const submitHandler = async (e) => {
    //     setLoading(true);
    //     e.preventDefault();
    //     navigate('/activeplan', { plan: plan, duration: duration, amount: amount })
    // }
    return (
        <Container centerContent padding='20' paddingTop='50' margin='0 auto' maxW='4xl'>
            <Box bg="white" w="100%" p={0} borderRadius="lg" borderWidth="1px" marginTop='50px'>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >

                    <Container maxW='md' color='white'>
                        <Stack>
                            <CardBody>
                                <Heading mb='5' size='md' color='black'>Complete Payment</Heading>

                                <Text fontSize='xs' color='gray'>Enter your credit or debit card details below</Text>




                            </CardBody>
                            <StripeContainer />
                            <CardFooter>
                                <Button variant='solid' bg='#1f4d91' color='white' onClick={submitHandler}>
                                    Confirm Payment
                                </Button>
                            </CardFooter>

                        </Stack>
                    </Container>
                    <Container maxW='md' bg='#f4f4f6' color='white'>
                        <CardBody>
                            <Heading size='md' color='black' mb='10'>Order Summary</Heading>

                            <Table size='sm'>
                                <Tbody color='black'>
                                    <Tr borderBottom='1px'>
                                        <Td>Plan Name</Td>
                                        <Td></Td>
                                        <Td isNumeric>{toTitleCase(plan)}</Td>
                                    </Tr>
                                    <Tr borderBottom='1px'>
                                        <Td className='big-cell'>Billing Cycle</Td>
                                        <Td></Td>
                                        <Td isNumeric>{toTitleCase(duration)}</Td>
                                    </Tr>
                                    <Tr borderBottom='1px'>
                                        <Td>Plan Price</Td>
                                        <Td></Td>
                                        <Td isNumeric>₹{amount}{duration === 'monthly' ? '/mo' : '/yr'}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>



                        </CardBody>
                    </Container>
                </Card>
            </Box>
        </Container>
    );
};

export default Payment;
