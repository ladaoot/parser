import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import axios from 'axios';

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [professionsByCategory, setProfessionsByCategory] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/filters/categories')
            .then(response => setCategories(response.data.detail))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleCategoryClick = (category) => {
        axios.get(`http://localhost:8000/filters/categories/${category}`)
            .then(response => {
                setProfessionsByCategory({
                    ...professionsByCategory,
                    [category]: response.data.detail
                });
            })
            .catch(error => console.error('Error fetching professions:', error));
    };

    return (
        <Box p={4}>
            <VStack spacing={4} >
                <Text fontSize="xl" fontWeight="bold">Categories</Text>
                <Accordion allowMultiple height={'200px'} style={{ overflow: 'auto' }} w={'800px'}>
                    {categories.map(category => (
                        <AccordionItem key={category.id}>
                            <AccordionButton onClick={() => handleCategoryClick(category.id)}>
                                {category.name}
                                <AccordionIcon />
                            </AccordionButton>
                            {professionsByCategory[category.id] && (
                                <AccordionPanel spacing={2}>
                                    {professionsByCategory[category.id].map(profession => (
                                        <div>
                                            <input type="checkbox" value={profession.id} />
                                            <label>{profession.name}</label>
                                        </div>
                                    ))}
                                </AccordionPanel>
                            )}
                        </AccordionItem>
                    ))}
                </Accordion>
            </VStack>
        </Box>
    )
}