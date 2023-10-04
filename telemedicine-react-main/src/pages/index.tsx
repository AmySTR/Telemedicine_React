import { Inter } from 'next/font/google'
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
import { login } from '@/services/UserServices';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const inter = Inter({ subsets: ['latin'] })

export default function SignIn() {

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleEmailChange = (e: any) => setEmail(e.target.value)
  const handlePasswordChange = (e: any) => setPassword(e.target.value)

  const handleShowClick = () => setShowPassword(!showPassword);

  // const login = () => { alert(email + password) }

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
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input
                    color="black"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    color="black"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={async e => {
                  e.preventDefault();
                  const result = await login(email, password)
                  if (result) {
                    alert("Login success")
                    window.location.href = "/EpicAppMenu"
                  } else {
                    alert("Login fail, incorrect email or password")
                  }
                }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="/user/signup">
          Sign Up
        </Link>
      </Box>
    </Flex >
  )
}
