import './globals.css';
import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';
import getActiveProductsByPrices from '@/actions/getActiveProductsByPrices';

const font = Figtree({ subsets: ['latin'] });

export const revalidate = 0;

export const metadata: Metadata = {
    title: 'Spotify clone',
    description: '',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const userSongs = await getSongsByUserId();
    const products = await getActiveProductsByPrices();

    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider products={products} />
                        <Sidebar songs={userSongs}>{children}</Sidebar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
