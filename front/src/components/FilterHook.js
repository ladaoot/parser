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
    SimpleGrid,
    Skeleton,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import VacancyInfo from '../moleculs/VacancyInfo'

// import {setVacancies,vacancies} from '../pages/Home'

export default function FilterHook() {
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
    } = useForm()

    const [vacancies, setVacancies] = useState([])
    const [found, setFound] = useState()
    const [pages, setPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setLoading] = useState(true)
    // const [isSubmitting, setSubbmiting]=useState(false)



    function onSubmit(values) {
        return new Promise((resolve) => {
            // console.log(isSubmitting);
            setTimeout(() => {
                // console.log(values)
                // alert(JSON.stringify(values, null, 2))
                setLoading(false)
                localStorage.setItem('filters', JSON.stringify(values))
                setLoading(false)
                do_axios(values,1)
                
                resolve()
            }, 200)
        })
    }

    function do_axios(values, page, fromSubmit) {
        setLoading(false);
        // console.log(isSubmitting);
        axios.post(`http://localhost:8000/vacancies?page=${page}&size=30&flag=${fromSubmit}`, {
            text: values.text,
            salary: values.salary,
            currency: values.currency,
            only_with_salary: values.only_with_salary,
            professional_role: values.professional_role,
            experience: values.experience,
            page: page - 1
        })
            .then(response => {
                setVacancies(response.data.items);
                setFound(response.data.total);
                setPages(response.data.pages);
                setLoading(true);
                // console.log(isLoading);
            })
            .catch(error => {
                setError('fetch', { type: 'VacanciesError', message: `Error fetching vacancies: ${error}` });
                setVacancies([]);
                setFound();
                setPages();
            });

    }

    const [categories, setCategories] = useState([]);
    const [professionsByCategory, setProfessionsByCategory] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/filters/categories')
            .then(response => setCategories(response.data))
            .catch(error => setError('fetch', { type: 'RoleError', message: `Error fetching categories: ${error}` }));
        localStorage.removeItem('filters')
    }, []);

    const handleCategoryClick = (category) => {
        axios.get(`http://localhost:8000/filters/categories/${category}`)
            .then(response => {
                setProfessionsByCategory({
                    ...professionsByCategory,
                    [category]: response.data
                });
            })
            .catch(error => setError('fetch', { type: 'RoleError', message: `Error fetching roles: ${error}` }));
    };

    const [experience, setExperience] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/filters/experience')
            .then(response => {
                setExperience(response.data);
            })
            .catch(error => setError('fetch', { type: 'ExperienceError', message: `Error fetching experience: ${error}` }));

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
        <Box position='relative'>
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
                        <Heading textColor={'red'}>{errors.fetch ? errors.fetch.message : ""}</Heading>
                    </VStack>

                    <FormErrorMessage>

                    </FormErrorMessage>
                </FormControl>
                <Center>
                    <Button type='submit' justifySelf={'center'} onClick={() => {
                        setCurrentPage(1);
                        setLoading(false);
                        // console.log(isSubmitting);
                    }}>
                        Применить фильтр
                    </Button>
                </Center>

            </form>
            {
                found ? <Heading marginLeft={'17.5%'} marginTop={'2%'} textColor={'#EE7230'}>Нашлось всего {found} вакансий</Heading> :
                    localStorage.getItem('filter') ?
                        <Heading marginLeft={'17.5%'} marginTop={'2%'} textColor={'#EE7230'}>Ничего не найдено:</Heading> :
                        <div></div>
            }
            <Center>

                <SimpleGrid columns={3} spacing={10}   >
                    {
                        vacancies.map(vacancy => (
                            <Skeleton isLoaded={isLoading}>
                                < VacancyInfo name={vacancy.name}
                                    experience={vacancy.experience}
                                    employer={vacancy.employer}
                                    salary_from={vacancy.salary_from}
                                    salary_to={vacancy.salary_to}
                                    salary_currency={vacancy.salary_currency}
                                    id={vacancy.id} />
                            </Skeleton>

                        ))
                    }
                </SimpleGrid>

            </Center>
            {
                pages ? <Center marginTop={'2%'}>
                    <Button isDisabled={currentPage == 1} onClick={() => {
                        setCurrentPage(currentPage - 1);
                        const val = JSON.parse(localStorage.getItem('filters'));
                        // setTimeout(()=>
                        do_axios(val, currentPage - 1, false)
                        window.scrollTo(0, 650)

                    }}>
                        Предыдущая страница
                    </Button>
                    <Text>
                        {currentPage}
                    </Text>
                    <Button isDisabled={currentPage == pages} onClick={() => {
                        setCurrentPage(currentPage + 1);
                        const val = JSON.parse(localStorage.getItem('filters'));
                        // setTimeout(()=>console.log('time'),200);
                        do_axios(val, currentPage + 1, false);
                        window.scrollTo(0, 650);


                    }}>
                        Следующая страница
                    </Button>
                </Center>
                    : <div></div>
            }

        </Box >
    )
}