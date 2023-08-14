'use client';

import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward as BackwardIcon, AiFillStepForward as ForwardIcon } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';

import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import Slider from '@/components/Slider';

interface Props {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<Props> = ({ song, songUrl }) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(0.5);
    const [previousVolume, setPreviousVolume] = useState(0.5);
    const [isPlaying, setIsPlaying] = useState(false);

    const PlayIcon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    };

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    };

    const [play, { pause, sound }] = useSound(songUrl, {
        volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3'],
    });

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        };
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const onSliderChange = (value: number) => {
        setVolume(value);

        if (value !== 0) {
            setPreviousVolume(value);
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(previousVolume);
        } else {
            setPreviousVolume(volume);
            setVolume(0);
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            {/* Song preview */}
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem song={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div
                    onClick={handlePlay}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                >
                    <PlayIcon size={30} className="text-black" />
                </div>
            </div>

            {/* Desktop controls */}
            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                <BackwardIcon
                    size={30}
                    onClick={onPlayPrevious}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />

                <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
                    onClick={handlePlay}
                >
                    <PlayIcon size={30} className="text-black" />
                </div>

                <ForwardIcon
                    size={30}
                    onClick={onPlayNext}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>

            {/* Volume controls */}
            <div className="hidden md:flex w-dyll justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon size={34} onClick={toggleMute} className="cursor-pointer" />
                    <Slider value={volume} onChange={onSliderChange} />
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;
