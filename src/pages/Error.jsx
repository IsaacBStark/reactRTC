import { useRouteError, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@nextui-org/react";

export function Error() {
    const error = useRouteError();
    const navigate = useNavigate();
    console.error(error);
    useEffect(() => {
        setTimeout(() => {
            navigate('/reactRTC')
        }, 3000)
    }, [])

    return (
        <div className='h-full flex items-center justify-center'>
            <Card isBlurred radius="none" className='p-3 gap-3 flex flex-col'><span>Error: {error.statusText || error.message}</span></Card>

        </div>
    )
}