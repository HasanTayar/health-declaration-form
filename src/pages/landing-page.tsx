import React from 'react';
import instgramLogo from '/assets/instagram.svg';
import whatsappLogo from '/assets/whatsapp.svg'; 
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gradient-bg">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-center mb-4">
            <img src="/assets/logo.jpg" alt="Logo" className="object-contain mx-auto" />
            מילוי טופס הצארת בריאות
          </h2>
          <div className="flex justify-center space-x-4">
            <a href="https://www.instagram.com/muscle.factorygym/" target='_blank'>
            <img src={instgramLogo} alt="Instagram" className="w-8 h-8"/>
            </a>
            <a href={import.meta.env.VITE_WHATSAPP_LINK}>
            <img src={whatsappLogo} alt="WhatsApp" className="w-8 h-8"/>
            </a>
          </div>
          <div className='mt-5 flex justify-center'>
            <Button className='text-white gradient-bg hover:gradient-bg-reverse'>להתחלה</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
