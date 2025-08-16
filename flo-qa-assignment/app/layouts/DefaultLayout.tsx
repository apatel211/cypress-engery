import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from '../../components';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <main>
      <Header />
      <Flex
        justifyContent={'center'}
        borderBottom={1}
        py={{ base: 12 }}
        px={{ base: 4 }}
        flex={1}
      >
        <Box w='100vw'>{children}</Box>
      </Flex>
    </main>
  );
};

export default DefaultLayout;
