import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text, Button, VStack, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import axios from 'axios';

import { Categories } from '../moleculs/Categories';
import { Filter } from '../components/Filter';
import FilterHook from '../components/FilterHook';

const Home = () => {

    // const [vacancies, setVacancies] = useState([])

    // useEffect(() => {
    //     localStorage.removeItem('vacancies')
    //     localStorage.clear()
    // }, []);
    // const [vacancies, setStorageValue] = useState(JSON.parse(localStorage.getItem('vacancies')) || []);

    // useEffect(() => {
    //     const handleStorageChange = (e) => {
    //         if (e.key === 'vacancies') {
    //             // Обработка изменений в localStorage для ключа 'myKey'
    //             console.log('Значение изменилось:', e.newValue);
    //           }
    //     };

    //     window.addEventListener('storage', handleStorageChange, false);

    //     return () => {
    //         window.removeEventListener('storage', handleStorageChange);
    //     };
    // }, []);

    // window.addEventListener("storage", () => {
    //     // When local storage changes, dump the list to
    //     // the console.
    //     console.log(JSON.parse(window.localStorage.getItem("vacancies")));
    //   });


    return (
        <ChakraProvider>

            <FilterHook />

        </ChakraProvider>
    );

};

export default Home;
