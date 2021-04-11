import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  InputRightElement,
  Input,
  InputGroup
} from '@chakra-ui/react';

export default function RegisterForm({ regData, setRegData }) {

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <FormControl isRequired>
     
        <FormLabel textAlign="left">Email</FormLabel>
        <Input 
          placeholder="Enter email" 
          mb={6}
          onChange={(e) => setRegData({...regData, email: e.target.value})}
          />


        <FormLabel>Password</FormLabel>
        <InputGroup size="md" mb={7}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setRegData({...regData, password: e.target.value})}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>



        <FormLabel >Confirm Password</FormLabel>
        <InputGroup size="md" mb={2}>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setRegData({...regData, confirmPassword: e.target.value})}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>


    </FormControl>
  )
}
