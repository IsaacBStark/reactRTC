import { useState, createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const callInfo = createContext();

export function useCallInfo() {
    return useContext(callInfo);
}

const firebaseConfig = {
    apiKey: "AIzaSyBwtjRg_B-YEG7VgU81DgTX4opF_SO6ERI",
    authDomain: "fir-rtc-cd34d.firebaseapp.com",
    projectId: "fir-rtc-cd34d",
    storageBucket: "fir-rtc-cd34d.appspot.com",
    messagingSenderId: "1087318654356",
    appId: "1:1087318654356:web:d18fc9f70b2d42a4c8a381",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const servers = {
    iceServers: [
        {
            urls: [
                "stun:136.36.160.162:3478",
                "turn:136.36.160.162:3478",
            ],
            username: "test",
            credential: "test",
        },
    ],
    iceCandidatePoolSize: 10,
};

export function CallInfoProvider({ children }) {
    const [roomNumber, setRoomNumber] = useState(null);
    const [peerConnection, setPeerConnection] = useState(new RTCPeerConnection(servers));
    const [side, setSide] = useState(null);

    return (
        <callInfo.Provider value={{ roomNumber, setRoomNumber, peerConnection, setPeerConnection }}>
            {children}
        </callInfo.Provider>
    )
}