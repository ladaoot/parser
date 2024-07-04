// import React, { useEffect, useState } from "react"
// import axios from "axios";
// import { Accordion, AccordionItem, ChakraProvider, List, ListItem, Spinner, Text, AccordionButton, Box, AccordionIcon, AccordionPanel } from "@chakra-ui/react";

// export const Home = ({ route, navigation }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [isActive, setIsActive] = useState(false);

//     // const {id, title} = route.params;

//     // navigation.setOptions({
//     //     title: title
//     // });

//     React.useEffect(() => {
//         axios.get('http://localhost:8000/filters/categories')
//             .then(({ data }) => {
//                 localStorage.setItem('data', JSON.stringify(data.detail))
//                 setIsLoading(false);
//             })
//             .catch(e => alert('Error', 'Error'))
//         // .finally(() => {
//         //     setIsLoading(false);
//         // });
//     }, []);

//     if (isLoading) {
//         return <Spinner />
//     }



//     // useEffect(()=>{
//     //     axios.get('http://localhost:8000/filters/categories')
//     //     .then(function (response){
//     //         console.log(response.data.detail)
//     //         // alert(response.data["message"])
//     //         if (response.data["message"] == "Login failed") {
//     //             alert("Login failed");
//     //         } else {
//     //             if (response.data.detail) {
//     //                 localStorage.setItem('data', JSON.stringify(response.data.detail))
//     //             }
//     //         }
//     //     })
//     //     .catch(function (error) {
//     //         console.log(error, 'error');
//     //     });
//     // })

//     function getRoles(category_id) {
//         axios.get('http://localhost:8000/filters/categories/' + category_id)
//             .then(({ data }) => {
//                 localStorage.setItem(`${category_id}`, JSON.stringify(data.detail))
//                 console.log(localStorage.getItem(`${category_id}`))
//             })
//             .catch(e => alert('Error', 'Error'))


//         setIsActive(!isActive)
//     }

//     return (
//         <ChakraProvider>
//             <Accordion>
//                 {
//                     JSON.parse(localStorage.getItem('data')).map((element) => {
//                         return (
//                             <div>
//                                 <AccordionItem id={element.id} onClick={() => getRoles(element.id)}>
//                                     <AccordionButton>
//                                         <Box as='span' flex='1' textAlign='left'>
//                                             {element.name}
//                                         </Box>
//                                         <AccordionIcon />
//                                     </AccordionButton>
//                                     <AccordionPanel pb={4} >
//                                         {
//                                             console.log(`${element.id}`)
//                                             // JSON.parse(localStorage.getItem(`${element.id}`)).map((role) => {
//                                             //     return (
//                                             //         <input type="checkbox" id={role.id}>
//                                             //             {role.name}
//                                             //         </input>
//                                             //     )
//                                             // })
//                                         }
//                                     </AccordionPanel>

//                                 </AccordionItem>

//                             </div>
//                         )
//                     })
//                 }
//             </Accordion>
//         </ChakraProvider >
//     )

// }

import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text, Button, VStack, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import axios from 'axios';

import { Categories } from '../moleculs/Categories';
import { Filter } from '../components/Filter';
import FilterHook from '../components/FilterHook';

const Home = () => {
    // const [categories, setCategories] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState(null);
    // const [professions, setProfessions] = useState([]);
    // const [professionsByCategory, setProfessionsByCategory] = useState({});

    // useEffect(() => {
    //     axios.get('http://localhost:8000/filters/categories')
    //         .then(response => setCategories(response.data.detail))
    //         .catch(error => console.error('Error fetching categories:', error));
    // }, []);

    // const handleCategoryClick = (category) => {
    //     axios.get(`http://localhost:8000/filters/categories/${category}`)
    //         .then(response => {
    //             setProfessionsByCategory({
    //                 ...professionsByCategory,
    //                 [category]: response.data.detail
    //             });
    //         })
    //         .catch(error => console.error('Error fetching professions:', error));
    // };

    return (
        <ChakraProvider>
            {/* <Box p={4}>
                <VStack spacing={4} >
                    <Text fontSize="xl" fontWeight="bold">Categories</Text>
                    <Accordion allowMultiple height={'200px'} style={{overflow: 'auto'}} w={'800px'}>
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
                                                <input type="checkbox" key={profession.id} />
                                                <label>{profession.name}</label>
                                            </div>
                                        ))}
                                    </AccordionPanel>
                                )}
                            </AccordionItem>
                        ))}
                    </Accordion>
                </VStack>
            </Box> */}
            {/* <Categories/> */}
            <FilterHook/>
        </ChakraProvider>
    );

};

export default Home;
