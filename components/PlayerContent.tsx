'use client';

import { useState } from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward as BackwardIcon, AiFillStepForward as ForwardIcon } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

import { Song } from '@/types';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import Slider from '@/components/Slider';

interface Props {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<Props> = ({ song, songUrl }) => {
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const PlayIcon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem song={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div
                    onClick={() => {}}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                >
                    <PlayIcon size={30} className="text-black" />
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                <BackwardIcon
                    size={30}
                    onClick={() => {}}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />

                <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
                    onClick={() => {}}
                >
                    <PlayIcon size={30} className="text-black" />
                </div>

                <ForwardIcon
                    size={30}
                    onClick={() => {}}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>

            <div className="hidden md:flex w-dyll justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon size={34} onClick={() => {}} className="cursor-pointer" />
                    <Slider value={volume} onChange={(value) => setVolume(value)} />
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;
