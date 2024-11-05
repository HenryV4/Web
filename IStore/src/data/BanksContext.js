import React, { createContext, useState } from 'react';
import banksData from './banks';

export const BanksContext = createContext();

export function BanksProvider({ children }) {
    const [banks] = useState(banksData);
    return (
        <BanksContext.Provider value={banks}>
            {children}
        </BanksContext.Provider>
    );
}
