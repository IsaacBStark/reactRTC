import { useEffect, useState } from "react";

export default function App() {
    const [calling, setCalling] = useState(false);
    const [callNumber, setCallNumber] = useState();
    const [peerConnection, setPeerConnection] = useState(new RTCPeerConnection(servers));

    function handleCallClick() {
        if (calling) {
            peerConnection.close();
            setPeerConnection(null)
            setPeerConnection(new RTCPeerConnection(servers));
            peerConnection.restartIce();
            setCallNumber(null);
        } else if (!calling) {
            if (localStream) {
            }
        }
        setCalling(!calling);
    }
}
