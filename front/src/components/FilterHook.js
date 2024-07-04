import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    VStack,
    Text,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    Stack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function FilterHook() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve()
            }, 1000)
        })
    }

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

    const [radioSelected, setRadioSelected] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const handleRadioChange = () => {
        setRadioSelected(true);
        setCheckboxChecked(true);

        console.log(radioSelected)
        console.log(checkboxChecked)
    };

    // const radioValue = watch('radio');

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name}>

                <VStack spacing={4} >
                    <Stack direction={['column', 'row']} width='800px'>
                        <input id="text"
                            style={{ borderColor: 'black', borderWidth: '2px', width: '700px' }}
                            placeholder="Профессия, должность или компания"
                            {...register('text', {
                                minLength: { value: 4, message: 'Minimum length should be 4' },
                            })} />

                        <Button type='submit' width={'100px'} >
                            Найти
                        </Button>
                    </Stack>
                    <Text>{errors.text ? errors.text.message : ""}</Text>
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
                                                <input type="checkbox" value={profession.id} {...register('profession_role')} />
                                                <label>{profession.name}</label>
                                            </div>
                                        ))}
                                    </AccordionPanel>
                                )}
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <Stack direction={['column', 'row']} width='800px'>
                        <input id="salary"
                            style={{ borderColor: 'black', borderWidth: '2px', width: '700px' }}
                            placeholder="Зарплата от"
                            {...register('salary', {
                                // minLength: { value: 4, message: 'Minimum length should be 4' },
                            })} />
                        <input type='radio' id='RUR' value={'RUR'} onClick={handleRadioChange} {...register('currency')} />
                        <label for='RUR'>Рубли, ₽ </label>
                        <input type='radio' id='USD' value={'USD'} onClick={handleRadioChange} {...register('currency')} />
                        <label for='USD'>Доллары, $ </label>
                        <input type='radio' id='EUR' value={'EUR'} onClick={handleRadioChange} {...register('currency')} />
                        <label for='EUR'>Евро, € </label>
                    </Stack>
                    <div>
                        <input type='checkbox'
                            {...register('only_with_salary', {
                            })} />
                        <label>Только с указанием зарплаты</label>
                    </div>
                </VStack>
                <FormErrorMessage>
                    {errors.text && errors.text.message }
                </FormErrorMessage>
            </FormControl>
            <Button type='submit'>
                Применить фильтр
            </Button>
        </form>
    )
}