import React, { FC, ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}
const ContainerFluid: FC<ContainerProps> = ({children}) => {
  return (
    <div className="container-fluid">
      {children}
    </div>
  )
}

export default ContainerFluid;
