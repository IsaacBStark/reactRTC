import { useState, createContext, useContext, useRef, useReducer } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
} from "firebase/firestore";

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
    const [state, dispatch] = useReducer(reducer, {displayNumber: null, side: null});
    const roomNumber = useRef(null);
    const [peerConnection, setPeerConnection] = useState(new RTCPeerConnection(servers));

    async function offer() {
        const roomId = Math.floor(Math.random() * 9999);
        roomNumber.current = roomId;
        dispatch({type: 'setDisplay', payload: roomId});
        setDoc(doc(firestore, `calls/${roomNumber.current}`), {});
        const offerCandidates = collection(
            firestore,
            `calls/${roomNumber.current}/offerCandidates`
        );
        const answerCandidates = collection(
            firestore,
            `calls/${roomNumber.current}/answerCandidates`
        );

        peerConnection.onicecandidate = (e) => {
            e.candidate && addDoc(offerCandidates, e.candidate.toJSON());
        };

        const offerDescription = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        await setDoc(doc(firestore, `calls/${roomNumber.current}`), { offer });

        onSnapshot(query(doc(firestore, `calls/${roomNumber.current}`)), (snap) => {
            const data = snap.data();

            !peerConnection.currentRemoteDescription &&
                data.answer &&
                peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
        });

        onSnapshot(answerCandidates, (snap) => {
            snap.docChanges().forEach((change) => {
                change.type === "added" &&
                    peerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
            });
        });
    }

    async function answer() {
        dispatch({type: 'setDisplay', action: roomNumber.current});
        const call = doc(firestore, `calls/${roomNumber.current}`);
        const offerCandidates = collection(
            firestore,
            `calls/${roomNumber.current}/offerCandidates`
        );
        const answerCandidates = collection(
            firestore,
            `calls/${roomNumber.current}/answerCandidates`
        );

        peerConnection.onicecandidate = (e) => {
            e.candidate && addDoc(answerCandidates, e.candidate.toJSON());
        };

        const callData = (await getDoc(call)).data();

        const offerDescription = callData.offer;
        await peerConnection.setRemoteDescription(
            new RTCSessionDescription(offerDescription)
        );

        const answerDescription = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(
            new RTCSessionDescription(answerDescription)
        );

        const answer = {
            sdp: answerDescription.sdp,
            type: answerDescription.type,
        };

        await updateDoc(call, { answer });

        onSnapshot(offerCandidates, (snap) => {
            snap.docChanges().forEach((change) => {
                change.type === "added" &&
                    peerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
            });
        });
    }

    return (
        <callInfo.Provider value={{ roomNumber, peerConnection, setPeerConnection, firestore, offer, answer, servers, state, dispatch }}>
            {children}
        </callInfo.Provider>
    )
}

function reducer(state, action) {
    switch(action.type) {
        case 'setDisplay':
            return {...state, displayNumber: action.payload};

        case 'setSide':
            return {...state, side: action.payload};
    }
}