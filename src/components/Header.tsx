// src/components/Header/HeaderComponent.tsx

import React from 'react';
import { SearchBarComponent } from './Search';
import { MapPinCheck } from 'lucide-react';

const HeaderComponent = () => {
  return (
    <header className="w-full flex flex-col items-center p-4 pt-2 shadow-md sticky top-0 z-50 rounded-b bg-background gap-1">
        <p className='font-semibold text-gray-500 text-sm flex items-center gap-1'><MapPinCheck size={15}/>Rua antonio de Oliveira Gago 83 </p>
        <SearchBarComponent/>
    </header>
  );
};

export default HeaderComponent;
