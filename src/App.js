import Shell from "./components/Shell.jsx";
import Navbar from "./components/Navbar.jsx";
import { useEffect, useState, useCallback, useRef } from "react";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwtjRg_B-YEG7VgU81DgTX4opF_SO6ERI",
    authDomain: "fir-rtc-cd34d.firebaseapp.com",
    projectId: "fir-rtc-cd34d",
    storageBucket: "fir-rtc-cd34d.appspot.com",
    messagingSenderId: "1087318654356",
    appId: "1:1087318654356:web:d18fc9f70b2d42a4c8a381",
    measurementId: "G-CVL1Z37YBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'], // free stun server
        },
    ],
    iceCandidatePoolSize: 10,
};

// global states
const pc = new RTCPeerConnection(servers);

export default function App() {
    const [playing, setPlaying] = useState(true);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    function handleClick(e) {
        setPlaying(!playing)
    }

    useEffect(() => {
        async function getCam() {
            setLocalStream(await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: { facingMode: 'user' },
            })
            )
        }
        getCam();

        async function getRemote() {
            setRemoteStream(new MediaStream())
        }
        getRemote();
    }, [])

    localStream && localStream.getTracks().forEach((track) => {
        console.log(pc.getSenders())
        if (!pc.getSenders().forEach((sender) => {
            sender.track === track;
        })) {
            pc.addTrack(track, localStream)
        }
    })
    if (!pc.ontrack) {
        pc.ontrack = event => {
            event.streams[0].getTracks(track => {
                remoteStream.addTrack(track)
            })
        }
    }

    return (
        <Shell>
            <Navbar />
            <div className='w-full h-full flex items-center p-64'>
                {playing && <Video onClick={handleClick} source={localStream}></Video>}
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
                <Video source={remoteStream}></Video>
            </div>
        </Shell>
    );
}

function Video({ onClick, source }) {
    const sourceRef = useRef(source);

    useEffect(() => {
        return function cleanup() {
            sourceRef.current.getTracks().forEach(track => {
                track.stop();
            });
        }
    }, [])

    useEffect(() => {
        sourceRef.current = source;
    }, [source])

    const refVideo = useCallback(
        (video) => {
            if (video) video.srcObject = source;
        },
        [source],
    );
    return <video ref={refVideo} autoPlay={true} onClick={onClick} className='w-96 aspect-square rounded-full object-cover overflow-hidden' />;
};