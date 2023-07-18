'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import Box from '@/components/Box';
import SidebarItem from '@/components/SidebarItem';
import Library from '@/components/Library';

interface Props {
    children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
    const pathname = usePathname();

    const routes = useMemo(
        () => [
            {
                label: 'Home',
                icon: HiHome,
                active: pathname !== '/search',
                href: '/',
            },
            {
                label: 'Search',
                icon: BiSearch,
                active: pathname === '/search',
                href: '/search',
            },
        ],
        [pathname],
    );

    return (
        <div className="flex h-full">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((route) => (
                            <SidebarItem key={route.label} {...route} />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
        </div>
    );
};

export default Sidebar;
