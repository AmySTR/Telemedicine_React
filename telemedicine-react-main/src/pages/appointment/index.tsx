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
    Select
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { getAllUser } from '@/services/UserServices';
import { createRecord } from '@/services/AppointmentService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

function isUser(obj: any): obj is User {
    return (
        typeof obj === "object" && // make sure obj is an object
        typeof obj.id === "number" &&
        typeof obj.firstName === "string" &&
        typeof obj.lastName === "string" &&
        typeof obj.role === "string" &&
        typeof obj.email === "string" &&
        typeof obj.password === "string" &&
        obj.createdAt instanceof Date &&
        obj.updatedAt instanceof Date
    );
}

export default function AppointmentIndex() {
    const [formData, setFormData] = useState<MyObject>({ appointment_at: new Date() });
    const [patientList, setPatientList] = useState<User[]>([]);
    const [doctorList, setDoctorList] = useState<User[]>([]);
    const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());

    const handleDateTimeChange = (date: any) => {
        setSelectedDateTime(date);
        setFormData({ ...formData, appointment_at: date });
    };

    const roleList = [
        "doctor",
        "patient",
    ]

    function handleChange(event: any) {
        if (roleList.includes(event.target.name)) {
            const combined = [...doctorList, ...patientList]
            const filtered = combined.filter(e => e.id === Number(event.target.value) && e.role === event.target.name)
            const result = filtered[0];
            setFormData({ ...formData, [event.target.name]: result });
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
        {
            icon: <CFaUserAlt color="gray.300" />,
            type: 'select',
            name: 'doctor',
            defaultValue: '',
            placeholder: 'Doctor',
            data: doctorList
        },
        {
            icon: <></>,
            type: 'datepicker',
            name: 'appointment_at',
            defaultValue: '',
            placeholder: 'Appointment time',
        },
    ]

    useEffect(() => {
        (async () => {
            const users = await getAllUser();
            const doctor = users.filter((user: any) => user.role === 'doctor');
            const patient = users.filter((user: any) => user.role === 'patient');
            setDoctorList(doctor);
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

                <Heading color="teal.400">Appointment</Heading>
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
                                            {
                                                attribute.type === 'select' ?
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
                                                    :
                                                    attribute.type === 'datepicker' ?
                                                        <div style={{ zIndex: 999 }}>
                                                            <DatePicker
                                                                selected={selectedDateTime}
                                                                onChange={handleDateTimeChange}
                                                                showTimeSelect
                                                                dateFormat="yyyy/MM/dd h:mm aa"
                                                            />
                                                        </div>
                                                        :
                                                        <Input
                                                            color="black"
                                                            type={attribute.type}
                                                            name={attribute.name}
                                                            value={formData[attribute.name]}
                                                            onChange={handleChange}
                                                            placeholder={attribute.placeholder} />
                                            }
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
                                    const result = await createRecord(formData);
                                    if (result) {
                                        alert('record created successfully');
                                        window.location.reload();
                                    }
                                }}
                            >
                                Create
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
                    </form>
                </Box>
            </Stack>
        </Flex >
    )
}
