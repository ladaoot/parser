import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { Categories } from "../moleculs/Categories";

export const Filter = () => {
    return (
        <Box>
            <VStack>
                <input name="text" 
                style={{ borderColor: 'black', borderWidth: '2px', width:'800px' }} 
                placeholder="Профессия, должность или компания" />
            </VStack>
            <Categories />
        </Box>
    )
}