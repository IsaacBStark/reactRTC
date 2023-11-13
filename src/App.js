import Shell from "./components/layout/Shell.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import { useEffect, useState, useCallback, useRef } from "react";

export default function App() {
    const [playing, setPlaying] = useState(true);
    const [source, setSource] = useState();

    function handleClick(e) {
        setPlaying(!playing)
    }

    return (
        <Shell>
            <Navbar />
            <div className='w-full h-full flex items-center p-64'>
                {playing && <Video onClick={handleClick} source={source} setSource={setSource}></Video>}
                {!playing && <div
                    className='
                w-96
                aspect-square
                bg-black
                flex
                items-center
                justify-center
                text-white
                text-lg
                font-bold
                rounded-full'
                    onClick={handleClick}>Video Muted</div>}
            </div>
        </Shell>
    );
}

export const Video = ({ onClick, source, setSource }) => {
    const sourceRef = useRef();

    useEffect(() => {
        sourceRef.current = source;
    },[source])

    useEffect(() => {
        let stream;
        async function getCam() {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: { facingMode: 'user' },
            })
            setSource(stream);
        }
        getCam();

        return function cleanup() {
            sourceRef.current.getTracks().forEach(track => {
                track.stop();
            });
        }
    }, [])

    const refVideo = useCallback(
        (video) => {
            if (video) video.srcObject = source;
        },
        [source],
    );
    return <video ref={refVideo} autoPlay={true} onClick={onClick} className='w-96 aspect-square rounded-full object-cover overflow-hidden' />;
};