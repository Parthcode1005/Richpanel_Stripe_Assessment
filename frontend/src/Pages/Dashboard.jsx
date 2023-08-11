import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading
} from '@chakra-ui/react'
import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Button,
} from "@chakra-ui/react";
import React from 'react'
import { useState, useEffect } from 'react';

import "./dashboard.css";
import { useNavigate } from 'react-router-dom';

function Dashboard({ plan, setPlan, duration, setDuration, amount, setAmount, date, setDate, user }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        navigate('/payment', { plan: plan, duration: duration, amount: amount, date: date, user: user });
    }

    useEffect(() => {
        setLoading(false);
    }, [amount, plan, duration, date])
    return (
        <div class='dashboard-bg'>
            <Container centerContent padding='20' paddingTop='50' margin='0 auto' >
                <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" marginTop='20px'>
                    <Container centerContent padding='7'>
                        <Heading fontSize="2xl">
                            Choose the right plan for you
                        </Heading>
                    </Container>
                    <TableContainer width='1000px' >
                        <Table variant='simple' border='0px'>
                            <TableCaption>
                                <Button bg='#1F4D91'
                                    color='white' variant='solid'
                                    width="40%"
                                    onClick={!loading && submitHandler}
                                    style={{ marginTop: 15 }}
                                    isLoading={loading}
                                    isDisabled={loading}
                                >
                                    Next
                                </Button>
                            </TableCaption>
                            <Thead>
                                <Tr><Th className='plan-column'>
                                    <div class='switch-custom' >
                                        <Tabs isFitted variant="soft-rounded">
                                            <TabList mb="1em" margin='0 auto'>
                                                <Tab className={duration === 'monthly' ? "selected-switch" : "not-selected-switch"} onClick={(e) => {
                                                    setDuration('monthly');
                                                    if (amount >= 1000) setAmount(amount / 10);
                                                }}>Monthly</Tab>
                                                <Tab
                                                    className={duration === 'yearly' ? "selected-switch" : "not-selected-switch"} margin='0 auto' onClick={(e) => {
                                                        if (amount < 1000) setAmount(amount * 10);
                                                        setDuration("yearly");
                                                    }}>Yearly</Tab>
                                            </TabList>
                                        </Tabs>
                                    </div>
                                </Th>
                                    <Th>
                                        <div class={plan === 'mobile' ? "square selected-plan" : 'square not-selected-plan'}
                                            onClick={(e) => {
                                                if (plan !== 'mobile')
                                                    setLoading(true);
                                                setPlan('mobile');
                                                setAmount(duration === 'monthly' ? 100 : 1000);

                                            }}>
                                            Mobile</div></Th>
                                    <Th>
                                        <div class=
                                            {plan === 'basic' ? "square selected-plan" : 'square  not-selected-plan'}
                                            onClick={(e) => {
                                                if (plan !== 'basic')
                                                    setLoading(true);
                                                setPlan('basic');
                                                setAmount(duration === 'monthly' ? 200 : 2000);
                                            }}>Basic</div></Th>
                                    <Th>
                                        <div class={plan === 'standard' ? "square selected-plan" : 'square not-selected-plan'}
                                            onClick={(e) => {
                                                if (plan !== 'standard')
                                                    setLoading(true);
                                                setPlan('standard');
                                                setAmount(duration === 'monthly' ? 500 : 5000);
                                            }}
                                        >Standard</div></Th>
                                    <Th>
                                        <div class={plan === 'premium' ? "square selected-plan" : 'square not-selected-plan'}
                                            onClick={(e) => {
                                                if (plan !== 'premium')
                                                    setLoading(true);
                                                setPlan('premium');
                                                setAmount(duration === 'monthly' ? 700 : 7000);
                                            }}>Premium</div></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr borderBottom={'1px'}>
                                    <Td>Monthly Price</Td>
                                    <Td isNumeric className={plan === 'mobile' ? 'selected-text' : ''}>{duration === "monthly" ? 100 : 1000}</Td>
                                    <Td isNumeric className={plan === 'basic' ? 'selected-text' : ''}>{duration === "monthly" ? 200 : 2000}</Td>
                                    <Td isNumeric className={plan === 'standard' ? 'selected-text' : ''}>{duration === "monthly" ? 500 : 5000}</Td>
                                    <Td isNumeric className={plan === 'premium' ? 'selected-text' : ''}>{duration === "monthly" ? 700 : 7000}</Td>
                                </Tr>
                                <Tr borderBottom={'1px'}>
                                    <Td>Video Quality</Td>
                                    <Td className={plan === 'mobile' ? 'selected-text' : ''}>Good</Td>
                                    <Td className={plan === 'basic' ? 'selected-text' : ''}>Good</Td>
                                    <Td className={plan === 'standard' ? 'selected-text' : ''}>Better</Td>
                                    <Td className={plan === 'premium' ? 'selected-text' : ''}>Best</Td>
                                </Tr>
                                <Tr borderBottom={'1px'}>
                                    <Td>Resolution</Td>
                                    <Td className={plan === 'mobile' ? 'selected-text' : ''}>480p</Td>
                                    <Td className={plan === 'basic' ? 'selected-text' : ''}>480p</Td>
                                    <Td className={plan === 'standard' ? 'selected-text' : ''}>1080p</Td>
                                    <Td className={plan === 'premium' ? 'selected-text' : ''}>4k+HDR</Td>
                                </Tr>
                                <Tr>
                                    <Td>Devices you can use to watch</Td>
                                </Tr>
                                <Tr class="no-line">
                                    <Td></Td>
                                    <Td className={plan === 'mobile' ? 'selected-text' : ''}>Phone</Td>
                                    <Td className={plan === 'basic' ? 'selected-text' : ''}>Phone</Td>
                                    <Td className={plan === 'standard' ? 'selected-text' : ''}>Phone</Td>
                                    <Td className={plan === 'premium' ? 'selected-text' : ''}>Phone</Td>
                                </Tr>
                                <Tr class="no-line">
                                    <Td></Td>
                                    <Td className={plan === 'mobile' ? 'selected-text' : ''}>Tablet</Td>
                                    <Td className={plan === 'basic' ? 'selected-text' : ''}>Tablet</Td>
                                    <Td className={plan === 'standard' ? 'selected-text' : ''}>Tablet</Td>
                                    <Td className={plan === 'premium' ? 'selected-text' : ''}>Tablet</Td>
                                </Tr>
                                <Tr class='no-line'>
                                    <Td></Td>
                                    <Td className={plan === 'mobile' ? 'selected-text' : ''}></Td>
                                    <Td className={plan === 'basic' ? 'selected-text' : ''}>Computer</Td>
                                    <Td className={plan === 'standard' ? 'selected-text' : ''}>Computer</Td>
                                    <Td className={plan === 'premium' ? 'selected-text' : ''}>Computer</Td>
                                </Tr>
                                <Tr class='no-line'>
                                    <Td></Td>
                                    <Td className={plan === 'mobile' ? 'selected-text' : ''}></Td>
                                    <Td className={plan === 'basic' ? 'selected-text' : ''}>TV</Td>
                                    <Td className={plan === 'standard' ? 'selected-text' : ''}>TV</Td>
                                    <Td className={plan === 'premium' ? 'selected-text' : ''}>TV</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </div >
    )
}

export default Dashboard;