'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import usePlayer from '@/hooks/usePlayer';

interface Props {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<Props> = ({ children, className }) => {
    const { onOpen } = useAuthModal();
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const player = usePlayer();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        player.reset();
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Logged out!');
        }
    };

    return (
        <div
            className={twMerge(
                `
                h-fit
                bg-gradient-to-b
                from-emerald-800
                p-6
            `,
                className,
            )}
        >
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                        onClick={() => router.back()}
                    >
                        <RxCaretLeft className="text-white" size={35} />
                    </button>

                    <button
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                        onClick={() => router.forward()}
                    >
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>

                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition">
                        <HiHome className="text-black" size={20} />
                    </button>

                    <button className="rounded-full p-2 bg-white items-center justify-center hover:opacity-75 transition">
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>

                {user ? (
                    <div className="flex gap-x-4 items-center">
                        <Button onClick={handleLogout} className="bg-white px-6 py-2">
                            Logout
                        </Button>
                        <Button onClick={() => router.push('/account')} className="bg-white">
                            <FaUserAlt />
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-between items-center gap-x-4">
                        <div>
                            <Button className="bg-transparent text-neutral-300 font-medium" onClick={onOpen}>
                                Sign up
                            </Button>
                        </div>

                        <div>
                            <Button className="bg-white px-6 py-2" onClick={onOpen}>
                                Log in
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {children}
        </div>
    );
};

export default Header;
