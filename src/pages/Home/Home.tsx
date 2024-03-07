import React, { FC, FormEvent, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import UsersList from '../../components/UserList/UserList'
import SignUpForm from '../../components/SignupForm/SignupForm'
import { User } from '../../types/User'

const Home: FC = () => {
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setUserToEdit(user);

  };

  const handleSave = () => {
    setUserToEdit(null);
  };

 

  return (
    <div>
      <br />
      <div className='d-flex justify-content-center'>
        <SignUpForm userToEdit={userToEdit} onSave={handleSave} />
      </div>
      <br />
      <UsersList onEdit={handleEdit} />
    </div>
  )
}

export default Home