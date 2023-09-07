import { Tailwind } from '@react-email/tailwind';
import { Html } from '@react-email/html';
import * as React from 'react';
import { Gift } from 'lucide-react';

export default function EmailTemplate({ children }: { children: JSX.Element }): JSX.Element {
    return (
        <Html lang="en" >
            <Tailwind>
                <body className='w-full'>
                    <div className='w-full p-4 text-center bg-[#1e293b]'>
                        <div className='text-lg font-semibold text-white flex items-center justify-center font-sans gap-1.5'>
                            <Gift />
                            WISHGIFTHUB
                        </div>
                        <span className="text-sm mt-[-1.5rem] text-[#6d6e71] font-sans">Where Wishes Find Their Perfect Presents</span>
                    </div>
                    {children}
                </body>
            </Tailwind >
        </Html >
    );
}
