import { useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { register } from '@/services/UserServices';
import { Select } from '@chakra-ui/react'

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface MyObject {
    [key: string]: any;
}

export default function SignUp() {
    const [formData, setFormData] = useState<MyObject>({});
    function handleChange(event: any) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const roleList = [
        "doctor",
        "patient",
    ]

    const attributeList = [
        {
            icon: <CFaUserAlt color="gray.300" />,
            type: 'email',
            name: 'email',
            defaultValue: '',
            placeholder: 'email address',
        },
        {
            icon: <></>,
            type: 'text',
            name: 'firstName',
            defaultValue: '',
            placeholder: 'First Name',
        },
        {
            icon: <></>,
            type: 'text',
            name: 'lastName',
            defaultValue: '',
            placeholder: 'Last Name',
        },
        {
            icon: <CFaLock color="gray.300" />,
            type: 'password',
            name: 'password',
            defaultValue: '',
            placeholder: 'Password',
        }
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

                <Heading color="teal.400">Sign Up</Heading>
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
                                            <Input
                                                color="black"
                                                type={attribute.type}
                                                name={attribute.name}
                                                value={formData[attribute.name]}
                                                onChange={handleChange}
                                                placeholder={attribute.placeholder} />
                                        </InputGroup>
                                    </FormControl>
                                )
                            }
                            <Select color="black" name="role" onChange={handleChange} placeholder='Select role'>
                                {
                                    roleList.map(e =>
                                        <option key={e} value={e}>{e}</option>
                                    )
                                }
                            </Select>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                colorScheme="teal"
                                width="full"
                                onClick={async e => {
                                    e.preventDefault();
                                    const result = await register(formData);
                                    if (result) {
                                        alert("Sign Up success")
                                        window.location.href = "/"
                                    } else {
                                        alert("Sign up fail, existing account")
                                    }
                                }}
                            >
                                Register
                            </Button>
                            <Button
                                borderRadius={0}
                                type="submit"
                                variant="solid"
                                color='black'
                                width="full"
                                onClick={async e => {
                                    e.preventDefault();
                                    window.location.href = `${window.location.origin}/`;
                                }}
                            >
                                Back
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Existing user?{" "}
                <Link color="teal.500" href="/">
                    Login
                </Link>
            </Box>
        </Flex>
    )
}
