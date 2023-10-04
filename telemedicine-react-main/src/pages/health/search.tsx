import { Inter } from 'next/font/google'
import { useState, useEffect } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    chakra,
    Box,
    Avatar,
    FormControl,
    Select,
    Textarea
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { getAllUser } from '@/services/UserServices';
import { getByPatientId } from '@/services/HealthRecordServices';
const CFaUserAlt = chakra(FaUserAlt);

interface User {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface MyObject {
    [key: string]: any;
}

export default function AppointmentIndex() {
    const [formData, setFormData] = useState<MyObject>({ appointment_at: new Date() });
    const [patientList, setPatientList] = useState<User[]>([]);
    const [displayValue, setDisplayValue] = useState("");

    const roleList = [
        "doctor",
        "patient",
    ]

    function handleChange(event: any) {
        if (roleList.includes(event.target.name)) {
            const combined = [...patientList]
            const filtered = combined.filter(e => e.id === Number(event.target.value) && e.role === event.target.name)
            const result = filtered[0];
            setFormData({ ...formData, [event.target.name]: result.id });
        } else {
            setFormData({ ...formData, [event.target.name]: event.target.value });
        }
    }

    const attributeList = [
        {
            icon: <CFaUserAlt color="gray.300" />,
            type: 'select',
            name: 'patient',
            defaultValue: '',
            placeholder: 'Patient',
            data: patientList
        },
    ]

    useEffect(() => {
        (async () => {
            const users = await getAllUser();
            const patient = users.filter((user: any) => user.role === 'patient');
            setPatientList(patient);
        })();
    }, [])
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Heading color="teal.400">Search Health Records</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            {
                                attributeList.map((attribute) =>
                                    <FormControl key={attribute.name}>
                                        <InputGroup>
                                            <Select color="black" name={attribute.name} onChange={handleChange} placeholder={`Select ${attribute.placeholder}`}>
                                                {(attribute.data || []).map((e) => (
                                                    typeof e === 'object' ?
                                                        < option key={e.id} value={e.id} >
                                                            {e.firstName} {e.lastName}
                                                        </option>
                                                        :
                                                        < option key={e} value={e} >
                                                            {e}
                                                        </option>
                                                ))}
                                            </Select>
                                        </InputGroup>
                                    </FormControl>
                                )
                            }
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                                onClick={async e => {
                                    e.preventDefault();
                                    const data = await getByPatientId(formData.patient);
                                    setDisplayValue(JSON.stringify(data, null, 2));
                                }}
                            >
                                Search
                            </Button>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                color='black'
                                width="full"
                                onClick={async e => {
                                    e.preventDefault();
                                    setDisplayValue('');
                                }}
                            >
                                Clear
                            </Button>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                color='black'
                                width="full"
                                onClick={async e => {
                                    e.preventDefault();
                                    window.location.href = `${window.location.origin}/EpicAppMenu`;
                                }}
                            >
                                Back
                            </Button>
                        </Stack>
                        <Stack
                            minHeight={'500px'}
                            // height={displayValue ? 'auto' : 0}
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                        >
                            <Textarea style={{ opacity: 1, minHeight: '500px' }} value={displayValue} isDisabled />
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex >
    )
}
