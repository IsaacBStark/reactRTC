import { useCallback, useEffect, useRef } from "react";

export function Video({ onClick, source, className }) {
    const sourceRef = useRef(source);

    useEffect(() => {
        return function cleanup() {
            sourceRef.current.getTracks().forEach((track) => {
                track.stop();
            });
        };
    }, []);

    useEffect(() => {
        sourceRef.current = source;
    }, [source]);

    const refVideo = useCallback(
        (video) => {
            if (video) video.srcObject = source;
        },
        [source]
    );
    return (
        <video
            ref={refVideo}
            autoPlay={true}
            onClick={onClick}
            className={className}
            playsInline
        />
    );
}