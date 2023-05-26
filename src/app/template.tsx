'use client'
import AuthModal from '@/components/Auth/AuthModal'
import { Provider } from 'jotai'
import { Chakra } from './chakra'


const template = ({ children }: any) => {
  return (
    <>
      <Provider>
        <Chakra>
          <AuthModal />
          {children}
        </Chakra>
      </Provider>
    </>
  )
}

export default template
