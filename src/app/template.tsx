'use client'
import AuthModal from '@/components/Auth/AuthModal'
import { Provider } from 'jotai'

const template = ({ children }: any) => {
  return (
    <>
      <Provider>
        <AuthModal />
        {children}
      </Provider>
    </>
  )
}

export default template
