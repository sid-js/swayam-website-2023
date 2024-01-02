import Image from 'next/image';
import { Kaleidoscope } from './components/Kaleidoscope/Kaleidoscope';
import Background from './components/Kaleidoscope/Background';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='z-10 w-full items-center justify-between font-mono text-sm lg:flex'>
        <Background />
      </div>
      <div className='text-md z-40 absolute top-5 flex gap-10 font-light'>
        <span>Home</span>
        <span>Events</span>
        <span>Register</span>
      </div>
      <div className='text-5xl z-40'>
        <img src='/swayam.png' alt='logo' />
      </div>
    </main>
  );
}
