import React from 'react';
import { Terminal } from 'lucide-react';

const Logo = () => {
    return (
        <>
            <div className="flex items-center gap-3 cursor-pointer select-none">

                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Terminal className="text-black w-6 h-6" strokeWidth={2.5} />
                </div>
                

                <span className="text-2xl font-bold font-heading tracking-tight text-white">
                    Anas
                </span>
            </div>
        </>
        
    );
};

export default Logo;