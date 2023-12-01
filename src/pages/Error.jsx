import { useRouteError, useNavigate } from "react-router-dom";

export function Error() {
    const error = useRouteError();
    const navigate = useNavigate();
    console.error(error);
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }, [])

    return (
        <div className='h-full items-center justify-center'>
            <span>Sowwy Mistew Obama: </span>
            <span>{error.statusText || error.message}</span>
        </div>
    )
}