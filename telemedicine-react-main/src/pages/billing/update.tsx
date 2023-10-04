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
import { createRecord, getAllRecord, updateRecord } from '@/services/BillingService';
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

export default function UpdateBilling() {

    const [formData, setFormData] = useState<MyObject>({});
    const [billingList, setBillingList] = useState<Billing[]>([]);

    async function handleChange(event: any) {
        const obj = { ...formData, [event.target.name]: event.target.value };
        setFormData(obj);
        return obj;
    }

    const attributeList = [
        {
            icon: <CFaUserAlt color="gray.300" />,
            type: 'select',
            name: 'id',
            defaultValue: '',
            placeholder: 'Billing ID',
            data: billingList
        },
        {
            icon: <CFaUserAlt color="gray.300" />,
            type: 'display',
            name: 'patient',
            defaultValue: '',
            placeholder: 'Patient',
        },
        {
            icon: <CFaUserAlt color="gray.300" />,
            type: 'display',
            name: 'doctor',
            defaultValue: '',
            placeholder: 'Doctor',
        },
        {
            icon: <></>,
            type: 'display',
            name: 'amount',
            defaultValue: '',
            placeholder: 'Bill Amount',
        },
        {
            icon: <></>,
            type: 'select',
            name: 'paymentMethod',
            defaultValue: '',
            placeholder: 'Payment Method',
            data: ['Cash', 'Visa/Mastercard', 'Online Banking', 'E-Wallet']
        },
        {
            icon: <></>,
            type: 'select',
            name: 'status',
            defaultValue: '',
            placeholder: 'Billing Status',
            data: ['New', 'In Progress', 'Completed', 'Cancelled']
        },
    ]

    useEffect(() => {
        (async () => {
            const data = await getAllRecord();
            setBillingList(data);
        })();
    }, [])

    useEffect(() => {
        (async () => {
            if (formData.id != undefined && formData.id != null) {
                const billing = billingList.filter(e => e.id === Number(formData.id))[0];
                let inputElement = document.getElementsByName('status')[0] as HTMLInputElement;
                inputElement.value = billing.status ?? '';
                let inputElement2 = document.getElementsByName('paymentMethod')[0] as HTMLInputElement;
                inputElement2.value = billing.paymentMethod ?? '';

                setFormData({
                    id: billing.id,
                    patient: `${billing.patient.firstName} ${billing.patient.lastName}`,
                    doctor: `${billing.doctor.firstName} ${billing.doctor.lastName}`,
                    status: billing.status,
                    paymentMethod: billing.paymentMethod,
                    amount: billing.amount,
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

                <Heading color="teal.400">Update Billing</Heading>
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
