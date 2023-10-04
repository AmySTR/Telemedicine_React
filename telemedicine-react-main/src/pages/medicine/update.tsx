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
import { updateRecord, getAllRecord } from '@/services/MedicineService';
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

export interface Medication {
    id: number;
    healthRecords: any;
    name: string;
    description?: string;
    qty: number;
    uom: string;
    createdAt: Date;
    updatedAt: Date;
}

interface MyObject {
    [key: string]: any;
}

export default function UpdateMedicine() {

    const [formData, setFormData] = useState<MyObject>({});
    const [medicineList, setMedicineList] = useState<Medication[]>([]);

    function handleChange(event: any) {
        if (event.target.name === 'id') {
            selectId(event.target.value);
        } else if (formData.id === undefined) {

        } else {
            setFormData({ ...formData, [event.target.name]: event.target.value });
        }
    }

    useEffect(() => {
        (async () => {
            const data = await getAllRecord();
            setMedicineList(data);
        })()
    }, [])

    const selectId = async (id: any) => {
        const selectedData = medicineList.filter(e => e.id === Number(id))
        if (selectedData.length > 0) {
            const data = selectedData[0];
            const resut = {
                id: data.id,
                name: data.name,
                description: data.description,
                qty: data.qty,
                uom: data.uom,
            }
            let inputElement2 = document.getElementsByName('uom')[0] as HTMLInputElement;
            inputElement2.value = data.uom ?? '';
            setFormData(resut);
        }
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const attributeList = [
        {
            icon: <></>,
            type: 'select',
            name: 'id',
            defaultValue: '',
            placeholder: 'Medicine ID',
            data: medicineList,
        },
        {
            icon: <></>,
            type: 'text',
            name: 'name',
            defaultValue: '',
            placeholder: 'Medicine Name',
        },
        {
            icon: <></>,
            type: 'text',
            name: 'description',
            defaultValue: '',
            placeholder: 'Description',
        },
        {
            icon: <></>,
            type: 'text',
            name: 'qty',
            defaultValue: '',
            placeholder: 'Qty',
        },
        {
            icon: <></>,
            type: 'select',
            name: 'uom',
            defaultValue: '',
            placeholder: 'Unit of Sale',
            data: ['Each', 'Bottle', 'Row']
        },
    ]

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

                <Heading color="teal.400">Medicine</Heading>
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
                                                            typeof e === 'string' ?
                                                                <option key={e} value={e}>
                                                                    {e}
                                                                </option>
                                                                :
                                                                <option key={e.id} value={e.id}>
                                                                    {`${e.name} ${e.qty} ${e.uom}`}
                                                                </option>
                                                        ))}
                                                    </Select>
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
