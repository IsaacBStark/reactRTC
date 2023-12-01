import { useEffect, useState } from 'react';
import { Video } from '../components/Video';
import { useCallInfo } from '../components';
import { useNavigate } from 'react-router-dom';

export function Call() {
    const [localStream, setLocalStream] = useState(null);
    const [localCam, setLocalCam] = useState(null);
    const [remoteStream, setRemoteStream] = useState(new MediaStream());
    const { roomNumber } = useCallInfo();
    const navigate = useNavigate();

    function handleLocalClick() {
        localCam && localCam.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
        localStream && localStream.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
    }

    useEffect(() => {
        async function getCam() {
            setLocalCam(
                await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" },
                })
            )
        }
        getCam();
    }, [])

    return (
        <div className='h-full'>
            <Video source={localCam} onClick={handleLocalClick} />
            <Video source={remoteStream} />
        </div>
    )
}