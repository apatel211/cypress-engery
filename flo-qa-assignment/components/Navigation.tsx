import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import PATHS from '../app/paths';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  subLabel?: string;
  children?: Array<NavItem>;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: PATHS.HOME,
  },
  {
    label: 'Dashboard',
    href: PATHS.DASHBOARD,
  },
  {
    label: 'Usage form',
    href: PATHS.ENTER_USAGE,
  },
];

export const DesktopNav = () => {
  const path = usePathname();

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box
          key={navItem.label}
          backgroundColor={path === navItem.href ? '#00000066' : 'none'}
          borderRadius={8}
        >
          <Link href={navItem.href}>
            <Text
              p={2}
              fontSize={'md'}
              fontWeight={600}
              color={'white'}
              _hover={{
                textDecoration: 'underline',
                color: 'white',
              }}
            >
              {navItem.label}
            </Text>
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

export const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} href={child.href}>
                <Text py={2}>{child.label}</Text>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
