import React from 'react'
import HeaderProfil from '@/components/profile/header-profil'
import PerjalananProfil from '@/components/profile/perjalanan-profil'
import VisiMisi from '@/components/profile/visi-misi-profil'
import HarapanProfile from '@/components/profile/harapan-profile'

const Profile = () => {
  return (
    <>
      <HeaderProfil />
      <div className='border-b border-2 border-primary-light max-w-[90%] mx-auto '></div>
      <PerjalananProfil />
      <div className='border-b border-2 border-primary-light max-w-[90%] mx-auto '></div>
      <VisiMisi />
      <div className='border-b border-2 border-primary-light max-w-[90%] mx-auto '></div>
      <HarapanProfile />
    </>
  )
}

export default Profile
