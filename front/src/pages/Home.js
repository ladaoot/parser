import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text, Button, VStack, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import axios from 'axios';

import { Categories } from '../moleculs/Categories';
import { Filter } from '../components/Filter';
import FilterHook from '../components/FilterHook';

const Home = () => {

    // const [vacancies, SetVacancies] = useState([])

    // useEffect(() => {
    //     axios.get('http://localhost:8000/vacancies')
    //         .then(response => SetVacancies(response.data.vacancies))
    //         .catch(error => console.error('Error fetching categories:', error));
    // }, []);

    return (
        <ChakraProvider>

            <FilterHook />
            {/* {
                vacancies.map(vacancy => {
                    <Box>
                        <Text>{vacancy.name}</Text>
                        <Text>{vacancy.experience}</Text>
                        <Text>{vacancy.employer}</Text>
                        <Text>{vacancy.salary_from}</Text>
                        <Text>{vacancy.salary_to}</Text>
                        <Text>{vacancy.salary_currency}</Text>
                    </Box>
                })
            } */}
      
        </ChakraProvider>
    );

};

export default Home;
