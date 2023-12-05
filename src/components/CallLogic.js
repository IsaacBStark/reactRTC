import { useCallInfo } from "./CallInfo";
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

export async function offer(firestore, roomNumber, peerConnection) {
    setDoc(doc(firestore, `calls/${roomNumber}`), {});
    const offerCandidates = collection(
        firestore,
        `calls/${roomNumber}/offerCandidates`
    );
    const answerCandidates = collection(
        firestore,
        `calls/${roomNumber}/answerCandidates`
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

    await setDoc(doc(firestore, `calls/${roomNumber}`), { offer });

    onSnapshot(query(doc(firestore, `calls/${roomNumber}`)), (snap) => {
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

export async function answer(firestore, roomNumber, peerConnection) {
    const call = doc(firestore, `calls/${roomNumber}`);
    const offerCandidates = collection(
        firestore,
        `calls/${roomNumber}/offerCandidates`
    );
    const answerCandidates = collection(
        firestore,
        `calls/${roomNumber}/answerCandidates`
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