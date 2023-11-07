import Shell from "./components/layout/Shell.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import { useEffect, useState, useCallback } from "react";

export default function App() {
    const [source, setSource] = useState();
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
    }, [])

    return (
        <Shell>
            <Navbar />
            <div className='w-full h-full flex items-center p-64'>
                <Video srcObject={source}></Video>
            </div>
        </Shell>
    );
}

export const Video = ({ srcObject }) => {
    const [playing, setPlaying] = useState(true);

    const refVideo = useCallback(
        (video) => {
            if (video) video.srcObject = srcObject;
        },
        [srcObject],
    );

    function handleClick(e) {
        setPlaying(!playing)
    }

    if (playing) {
        return <video ref={refVideo} autoPlay={true} onClick={(e) => handleClick(e)} className='w-96 aspect-square rounded-full object-cover overflow-hidden' />;
    } else {
        return <div
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
                onClick={(e) => handleClick(e)}>Video Muted</div>
    }
};