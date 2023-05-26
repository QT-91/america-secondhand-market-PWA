'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { auth } from '@/firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth";
import { useColorMode } from '@chakra-ui/react';


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
    <ul className="flex">
      <li className="flex-1 mr-2">
        <Link 
          className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" 
          href="#"
        >
          Home
        </Link>
      </li>
      <li className="flex-1 mr-2">
        <Link 
          className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" 
          href="/upload"
        >
          Upload
        </Link>
      </li>
      {!user ? (
        <li className="flex-1 mr-2">
          <Link 
            className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4" 
            href="/login"
          >
            Sign In
          </Link>
        </li>
      ) : (
        <li className="flex-1 mr-2">
          <a 
            className="text-center block py-2 px-4 text-gray-400 cursor-not-allowed"
            onClick={handleSignOut}
          >
            Sign Out
          </a>
        </li>
      )}
      <li className="flex-1 mr-2">
        <a 
          className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          onClick={toggleColorMode}
        >
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </a>
      </li>
    </ul>
  )
}

export default Header;