'use client';

import {
  Box,
  Flex,
  IconButton,
  Collapse,
  useDisclosure,
  Button,
  Link,
} from '@chakra-ui/react';
import { DesktopNav, MobileNav } from './Navigation';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';
import PATHS from '../app/paths';

const Header = () => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    router.push(PATHS.LOGIN);
  };

  return (
    <Flex bg='green.600' boxShadow='md'>
      <Box w='full' justifyContent={'space-between'}>
        <Flex
          h={['60px', null, null, '60px']}
          minH={['60px', null, null, '60px']}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={'center'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              _focus={{
                background: 'green.600',
              }}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} color={'white'} />
                ) : (
                  <HamburgerIcon w={5} h={5} color={'white'} />
                )
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Box fontSize='32px' display={{ base: 'none', md: 'flex' }}>
              <Link href={PATHS.HOME} _hover={{ textDecor: 'none' }}>
                ⚡
              </Link>
            </Box>
            <Flex
              display={{ base: 'none', md: 'flex' }}
              justifyContent={'center'}
              alignItems={'center'}
              w={'full'}
            >
              <DesktopNav />
            </Flex>
          </Flex>

          <Button onClick={handleLogout}>Logout</Button>
        </Flex>

        <Box
          position={'absolute'}
          left={0}
          right={0}
          zIndex={'dropdown'}
          display={{ base: 'block', md: 'none' }}
        >
          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
        </Box>
      </Box>
    </Flex>
  );
};

export default Header;
