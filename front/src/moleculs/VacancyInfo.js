import React from "react";
import { ChakraProvider, Stack, Button, Box, Text, Input, Accordion, AccordionItem, AccordionButton, AccordionPanel, Tag, RadioGroup, Radio, Center, Flex, List, ListItem, Card, CardBody, Heading, Image, CardFooter } from "@chakra-ui/react";


export default function VacancyInfo(props) {
    return (
            <Center marginTop={'2%'}>

                <Card variant='outline'
                    direction={'row'}
                    justifyContent={'center'}
                    borderWidth={'2px'}
                    w={'65%'}
                    borderRadius={0}
                    shadow={'xl'}>
                    <Stack w={'70%'}>
                        <CardBody>
                            <Heading fontSize={'25'} textColor={'#EE7230'}>{props.name}</Heading>
                            <Stack direction={'row'}>
                                {props.salary_from ? <Text>от {props.salary_from}</Text> : <div></div>}
                                {props.salary_to ? <Text>до {props.salary_to}</Text> : <div></div>}
                                {props.salary_currency ? <Text>{props.salary_currency}</Text> : <div></div>}

                            </Stack>
                            <Text >{props.employer}</Text>
                        </CardBody>
                        <CardFooter>
                            <Stack direction={'row'} justifyContent={'center'}>
                                {/* <IoBriefcaseOutline /> */}
                                <Text fontSize='smaller' h={'16px'}>{props.experience}
                                </Text>
                            </Stack>
                        </CardFooter>
                    </Stack>
                </Card>
            </Center>
    )
}