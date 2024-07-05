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
    Box,
    List,
    Heading,
    Center,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import VacancyInfo from '../moleculs/VacancyInfo'

// import {setVacancies,vacancies} from '../pages/Home'

export default function FilterHook() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const [vacancies, setVacancies] = useState([])
    const [found, setFound] = useState()

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))


                axios.post('http://localhost:8000/vacancies', {
                    text: values.text,
                    salary: values.salary,
                    currency: values.currency,
                    only_with_salary: values.only_with_salary,
                    professional_role: values.professional_role,
                    experience: values.experience
                })
                    .then(response => {
                        setVacancies(response.data.vacancies)
                        // localStorage.setItem('vacancies', JSON.stringify(response.data.vacancies))
                        setFound(response.data.found)
                    })
                    .catch(error => console.error('Error fetching categories:', error));
                // console.log(vacancies)
                // window.dispatchEvent( new Event('storage') )
                // window.dispatchEvent(new Event('storage', ))

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

    const [experience, setExperience] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/filters/experience')
            .then(response => {
                setExperience(response.data);
                // console.log(response.data)
            })
            .catch(error => console.error('Error fetching categories:', error));

    }, []);

    const [radioSelected, setRadioSelected] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const handleRadioChange = () => {
        setRadioSelected(true);
        setCheckboxChecked(true);

        console.log(radioSelected)
        console.log(checkboxChecked)
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name}>

                    <VStack spacing={4} marginTop={'2%'} >
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
                        <Text fontSize="xl" fontWeight="bold">Выбирите категорию</Text>
                        <Accordion allowMultiple height={'300px'} style={{ overflow: 'auto' }} w={'800px'}>
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
                                                    <input type="checkbox" value={profession.id} {...register('professional_role')} />
                                                    <label>{profession.name}</label>
                                                </div>
                                            ))}
                                        </AccordionPanel>
                                    )}
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <Stack direction={['column', 'row']} width='800px'>
                            <input id="salary" type='number'
                                style={{ borderColor: 'black', borderWidth: '2px', width: '700px' }}
                                placeholder="Зарплата от"
                                {...register('salary', {
                                    valueAsNumber: true,
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
                        <Stack direction={['column', 'row']} width={'800px'}>
                            {experience.map(ex => (
                                <Box>
                                    <input type='radio' id={ex.id} value={ex.id} {...register('experience')} />
                                    <label>{ex.name}</label>
                                </Box>
                            ))}
                            <input type='radio' id='null' value={null} {...register('experience')} />
                            <label>Не имеет значения</label>
                        </Stack>

                    </VStack>
                    <FormErrorMessage>
                        {errors.text && errors.text.message}
                    </FormErrorMessage>
                </FormControl>
                <Center>
                    <Button type='submit' justifySelf={'center'}>
                        Применить фильтр
                    </Button>
                </Center>
            </form>
            {
                found ? <Heading marginLeft={'17.5%'} marginTop={'2%'} textColor={'#EE7230'}>Нашлось всего {found} вакансий</Heading> :
                    <Heading marginLeft={'17.5%'} marginTop={'2%'} textColor={'#EE7230'}>Ничего не найдено</Heading>
            }
            {
                vacancies.map(vacancy => (
                    < VacancyInfo name={vacancy.name}
                        experience={vacancy.experience}
                        employer={vacancy.employer}
                        salary_from={vacancy.salary_from}
                        salary_to={vacancy.salary_to}
                        salary_currency={vacancy.salary_currency} />

                ))
            }
        </Box>
    )
}