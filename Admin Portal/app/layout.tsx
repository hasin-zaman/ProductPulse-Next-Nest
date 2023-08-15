import React, { ReactNode } from 'react'
import '@styles/globals.css';

export const metadata = {
  title: 'Wafaqi Mohtasib Ombudsman Sindh',
  description: 'Admin Portal for managing complaints'
}

interface Props {
  children: ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout
