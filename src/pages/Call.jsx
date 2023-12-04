import { useEffect, useState } from 'react';
import { Video } from '../components/Video';
import { useCallInfo } from '../components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { RiMicFill, RiMicOffFill, RiPhoneFill } from 'react-icons/ri';

export function Call() {
    const [localStream, setLocalStream] = useState(null);
    const [localCam, setLocalCam] = useState(null);
    const [remoteStream, setRemoteStream] = useState(new MediaStream());
    const [muted, setMuted] = useState(false);
    const { roomNumber, peerConnection } = useCallInfo();
    const navigate = useNavigate();

    useEffect(() => {
        localStream && localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, remoteStream);
        });
    },[localStream])

    peerConnection.ontrack = (e) => {
        e.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track, localStream);
        });
    };

    function handleLocalClick() {
        localCam && localCam.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
        localStream && localStream.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
    }

    function handleMute() {
        setMuted(!muted);
        localStream.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
    }

    function handleHangup() {

    }

    useEffect(() => {
        if (roomNumber) {
            async function getCam() {
                setLocalStream(
                    await navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: { facingMode: "user" },
                    })
                );

                setLocalCam(
                    await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: "user" },
                    })
                )
            }
            getCam();
        }
        else {
            navigate('/')
        }

        return () => roomNumber.current=null;
    }, [])

    if (roomNumber) {
        return (
            <div className='h-full p-2 flex justify-center'>
                <div className='relative aspect-video'>
                    {/* local */}
                    <Video source={localCam} onClick={handleLocalClick} className='bg-black object-cover absolute bottom-4 right-4 w-1/3 sm:w-1/4 md:w-1/5 z-[1]' />
                    <div className='flex absolute bottom-4 left-4 gap-x-4'>
                        <Button
                            onClick={handleHangup}
                            isIconOnly
                            radius='none'
                            color='default'
                            size='lg'
                            className='flex items-center justify-center'
                        >
                            <RiPhoneFill
                                color="#f31260"
                                size="2em"
                                style={{ transform: "rotate(135deg)" }}
                            />
                        </Button>
                        <Button
                            color='danger'
                            radius='none'
                            size='lg'
                            isIconOnly
                            onClick={() => handleMute(localStream)}
                            className='flex items-center justify-center'
                        >
                            {!muted ? (
                                <RiMicFill color="white" size="2em" />
                            ) : (
                                <RiMicOffFill color="white" size="2em" />
                            )}
                        </Button>
                    </div>
                    {/* remote */}
                    <Video source={remoteStream} className='bg-black h-full object-contain w-full' />
                </div>
            </div>
        )
    }
}