import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text, Button, VStack, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import axios from 'axios';

import { Categories } from '../moleculs/Categories';
import { Filter } from '../components/Filter';
import FilterHook from '../components/FilterHook';

const Home = () => {

    return (
        <ChakraProvider>
            <FilterHook />
        </ChakraProvider>
    );

};

export default Home;
