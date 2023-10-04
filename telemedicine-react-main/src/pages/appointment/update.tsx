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
import { createRecord, getAllRecord, updateRecord } from '@/services/AppointmentService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllUser } from '@/services/UserServices';
const CFaUserAlt = chakra(FaUserAlt);

export const createSyntheticEvent = <T extends Element, E extends Event>(event: E): React.SyntheticEvent<T, E> => {
    let isDefaultPrevented = false;
    let isPropagationStopped = false;
    const preventDefault = () => {
        isDefaultPrevented = true;
        event.preventDefault();
    }
    const stopPropagation = () => {
        isPropagationStopped = true;
        event.stopPropagation();
    }
    return {
        nativeEvent: event,
        currentTarget: event.currentTarget as EventTarget & T,
        target: event.target as EventTarget & T,
        bubbles: event.bubbles,
        cancelable: event.cancelable,
        defaultPrevented: event.defaultPrevented,
        eventPhase: event.eventPhase,
        isTrusted: event.isTrusted,
        preventDefault,
        isDefaultPrevented: () => isDefaultPrevented,
        stopPropagation,
        isPropagationStopped: () => isPropagationStopped,
        persist: () => { },
        timeStamp: event.timeStamp,
        type: event.type,
    };
}

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

export interface Billing {
    id: number;
    patient: User;
    doctor: User;
    appointment: any;
    amount: number;
    paymentMethod?: string;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface MyObject {
    [key: string]: any;
}

export interface Appointment {
    id: number;
    patient: User;
    doctor: User;
    billing?: Billing;
    appointment_at: string;
    createdAt: string;
    updatedAt: string;
}

export default function UpdateAppointment() {

    const [formData, setFormData] = useState<MyObject>({});
    const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);
    const [selectedDateTime, setSelectedDateTime] = useState<Date>();
    const [patientList, setPatientList] = useState<User[]>([]);
    const [doctorList, setDoctorList] = useState<User[]>([]);

    const handleDateTimeChange = (date: any) => {
        setSelectedDateTime(date);
        setFormData({ ...formData, appointment_at: date });
    };

    const roleList = [
        "doctor",
        "patient",
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
            type: 'select',
            name: 'id',
            defaultValue: '',
            placeholder: 'Appointment ID',
            data: appointmentList
        },
        {
            type: 'select',
            name: 'patient',
            defaultValue: '',
            placeholder: 'Patient',
            data: patientList
        },
        {
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
            const data = await getAllRecord();
            setAppointmentList(data);
        })();
    }, [])

    useEffect(() => {
        (async () => {
            if (formData.id != undefined && formData.id != null && formData.id != '') {
                const appointment = appointmentList.filter(e => e.id === Number(formData.id))[0];
                const resultDate = new Date(appointment.appointment_at);

                let inputElement = document.getElementsByName('patient')[0] as HTMLInputElement;
                inputElement.value = appointment.patient.id.toString() ?? '';
                let inputElement2 = document.getElementsByName('doctor')[0] as HTMLInputElement;
                inputElement2.value = appointment.doctor.id.toString() ?? '';

                setSelectedDateTime(resultDate);
                setFormData({
                    id: appointment.id,
                    patient: appointment.patient,
                    doctor: appointment.doctor,
                    appointment_at: resultDate,
                    ...formData,
                });
            }
        })()
    }, [formData.id])

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

                <Heading color="teal.400">Update Appointment</Heading>
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
                                                            'firstName' in e && 'lastName' in e ?
                                                                < option key={e.id} value={e.id} >
                                                                    {e.firstName} {e.lastName}
                                                                </option>
                                                                :
                                                                typeof e === 'object' ?
                                                                    < option key={e.id} value={e.id} >
                                                                        {`No ${e.id}`}
                                                                    </option>
                                                                    :
                                                                    < option key={e} value={e} >
                                                                        {e}
                                                                    </option>
                                                        ))}
                                                    </Select>
                                                    :
                                                    attribute.type === 'display' ?
                                                        <Input
                                                            color="black"
                                                            disabled={true}
                                                            type={attribute.type}
                                                            name={attribute.name}
                                                            value={formData[attribute.name]}
                                                            placeholder={attribute.placeholder} />
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
                                    const result = await updateRecord(formData);
                                    if (result) {
                                        alert('Record Updated Successfully');
                                        window.location.reload();
                                    } else {
                                        alert('record update failed, please contact admin');
                                    }
                                }}
                            >
                                Update
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
