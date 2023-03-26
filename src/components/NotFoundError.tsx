import React, { FC } from 'react'

type NotFoundError = {
    data:any
}

const NotFoundError: FC<NotFoundError> = ({data}) => {
  return (
    <div className='not_found' data-aos="fade-down">
        <h2>Location Not Found <i className='bx bx-confused'></i></h2>
    </div>
  )
}

export default NotFoundError