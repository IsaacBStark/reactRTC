import Shell from "./components/Shell.jsx";
import Navbar from "./components/Navbar.jsx";
import { useEffect, useState, useCallback, useRef } from "react";
import { RiMicFill, RiMicOffFill, RiPhoneFill } from "react-icons/ri";


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
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [muted, setMuted] = useState(false);
    1
    function handleVideoClick(source) {
        source.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
        })
    }

    function handleAudioClick(source) {
        setMuted(!muted);
        source.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
        })
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

    useEffect(() => {
        localStream && localStream.getTracks().forEach((track) => {
                pc.addTrack(track, localStream)
        })
        pc.ontrack = event => {
            event.streams[0].getTracks(track => {
                remoteStream.addTrack(track)
            })
        }
    }, [localStream])



    return (
        <Shell>
            <div className='w-full flex grow items-center'>
                <div className='flex flex-col items-center gap-4 px-4 py-8 bg-gray-100 shadow-inner'>
                    <Video onClick={() => handleVideoClick(localStream)} source={localStream} className='w-96 aspect-square rounded-full object-cover overflow-hidden shadow-lg hover:scale-[105%] active:scale-100 transition-transform' />
                    <button className="aspect-square w-fit flex items-center justify-center p-4 rounded-full bg-red-500 shadow-md hover:scale-110 active:scale-100 transition-transform" onClick={() => handleAudioClick(localStream)}>
                        {!muted ? <RiMicFill color='white' size='2em' /> : <RiMicOffFill color='white' size='2em' />}
                    </button>
                </div>
                <div className='flex flex-col items-center gap-4 px-4 py-8 bg-gray-100 shadow-inner'>
                    <Video source={remoteStream} className='w-96 aspect-square rounded-full object-cover overflow-hidden shadow-lg' />
                    <button className="aspect-square w-fit flex items-center justify-center p-4 rounded-full bg-white shadow-md hover:scale-110 active:scale-100 transition-transform">
                        <RiPhoneFill color='rgb(239 68 68)' size='2em' style = {{transform: 'rotate(135deg)' }}/>
                    </button>
                </div>
            </div>
        </Shell>
    );
}

function Video({ onClick, source, className }) {
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
    return <video ref={refVideo} autoPlay={true} onClick={onClick} className={className}/>;
};