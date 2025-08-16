'use client';

import { ReactNode } from 'react';
import { Flex, Heading, Stack, Text, Box, List, ListItem } from '@chakra-ui/react';

const Code = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      as={'code'}
      bg={'gray.100'}
      textColor={'red.600'}
      p={1}
      borderRadius={'md'}
      fontSize={'sm'}
      whiteSpace={'nowrap'}
    >
      {children}
    </Box>
  );
};

export default function Home() {
  return (
    <>
      <Flex maxW={'100vw'} p={8} justify={'center'} flex={1}>
        <Stack maxW={'4xl'}>
          <Heading mb={2}>Welcome to your assignment! 👋</Heading>
          <Text mb={8}>Select one of the pages above to explore this simple application.</Text>

          <Heading>Context and Task</Heading>
          <Text mb={8}>
            This is a simple application with a{' '}
            <Code>Dashboard</Code> page and a{' '}
            <Code>Enter energy usage</Code> page, which displays a multi-step form for entering and saving a new record for energy consumption data. The dashboard displays energy consumption data stored in a JSON format. There is also an API endpoint{' '}
            <Code>/api/nmi-data</Code> that will return JSON energy consumption data. 📊 The application is also secured with a{' '}
            <Code>/login</Code> page that supports basic authentication (username and password). For assignment purposes, the valid username and password are hardcoded, with username: <Code>testuser</Code>, and password: <Code>testuser2025</Code>.
          </Text>

          <Heading mb={4}>Assignment</Heading>
          <List spacing={3} styleType={'disc'} ml={8} mb={8}>
            <ListItem>
              Write tests as you see fit to adequately ensure and maintain the quality of the application for its intended purposes. This can include but is not limited to: happy authentication flow, expected error messages, API testing, etc. 📝
            </ListItem>
            <ListItem>
              Use tools like Playwright or Cypress (or any other preferred testing framework) 🔧
            </ListItem>
            <ListItem>
              Add script(s) that automate the testing process during development 🚀
            </ListItem>
          </List>

          <Heading size={'sm'} mb={4}>Bonus:</Heading>
          <List spacing={3} styleType={'disc'} ml={8} mb={8}>
            <ListItem>
              Include code coverage reports 📈
            </ListItem>
            <ListItem>
              Your code should be as close to production grade implementation as possible, which means it covers:
            </ListItem>
            <ListItem>
              Anything else that you choose for your solution to be production-ready
            </ListItem>
            <ListItem>
              Note that there is no need to make actual development changes - your focus should be on testing.
            </ListItem>
            <ListItem>
              Our estimate for this assignment is about 2 to 3 hours of your time. ⏰
            </ListItem>
          </List>

          <Heading mb={4}>Questions to answer</Heading>
          <List spacing={3} styleType={'disc'} ml={8} mb={8}>
            <ListItem>
              What are the advantages and disadvantages of the QA technologies used for the project? 🤔
            </ListItem>
            <ListItem>
              How are the tests designed and structured?
            </ListItem>
            <ListItem>
              Discuss any design patterns, coding conventions, or documentation practices you implemented to enhance readability and maintainability. 📚
            </ListItem>
            <ListItem>
              What would you do better next time?
            </ListItem>
            <ListItem>
              Reflect on areas where you see room for improvement and describe how you would approach them differently in future projects.
            </ListItem>
            <ListItem>
              What other ways could you have done this project? 💡
            </ListItem>
            <ListItem>
              Explore alternative approaches or technologies that you considered during the development of the project.
            </ListItem>
          </List>
        </Stack>
      </Flex>
    </>
  );
}
