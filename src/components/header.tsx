'use client'
import { Button, Box, Text, useColorMode, Flex, Spacer, Link, Image, Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";
import NextLink from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from "next/navigation";
import { auth } from '@/firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth";


const Header = () => {
  const router = useRouter();
  const [user] = useAuthState(auth)
  const { colorMode, toggleColorMode } = useColorMode()

  const handleSignOut = () => {
    if (!user) {
      return;
    }
    signOut(auth).then(() => {
      router.push('/');
    }).catch((error) => {
      alert('Logout Fail')
      console.log(error);
    });
  }

  return (
    <Flex>
      <Box p="2">
        <Link as={NextLink} href="/">
          <Button colorScheme="blue">Home</Button>
        </Link>
      </Box>
      <Box p="2">
        <Link as={NextLink} href="/upload">
          <Button colorScheme="blue">Upload</Button>
        </Link>
      </Box>

      <Spacer />

      <Box p="2">
        <Button onClick={toggleColorMode}>
          <Image 
            src={`/images/color_mode/${colorMode === 'light' ? 'dark': 'light'}.svg`}
            alt={colorMode === 'light' ? 'dark': 'light'}
          />
        </Button>
      </Box>
      {!user ? (
        <Box p="2">
          <Link as={NextLink} href="/login">
            <Button colorScheme="teal">Sign In</Button>
          </Link>
        </Box>
      ) : (
      <Box p="2">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {user.displayName}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleSignOut} minH='40px'>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      )}
    </Flex>
  );
};

export default Header;
