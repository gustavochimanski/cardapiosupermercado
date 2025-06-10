// src/components/Header/HeaderComponent.tsx

import React from 'react';
import { SearchBarComponent } from './Search';

const HeaderComponent = () => {
  return (
    <header className="w-full flex flex-col items-center p-4 pt-2 shadow-md sticky top-0 z-50 rounded-b bg-background">
        <p className='font-semibold text-gray-500 text-sm '>Rua antonio de Oliveira Gago 83 </p>
        <SearchBarComponent/>
    </header>
  );
};

export default HeaderComponent;
