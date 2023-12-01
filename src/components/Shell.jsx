import { Logo } from "./Logo"
import { useCallInfo } from "./CallInfo"
import { Outlet } from "react-router-dom";

export function Shell({ children }) {
    const { roomNumber } = useCallInfo();

    return (
        <div id='shell' className='w-full h-full flex flex-col p-4 relative'>
            <Logo />
            {roomNumber && <h1 className='text-xl fixed bottom-2 right-2'>Room #: <span className='tracking-wider'>{roomNumber}</span></h1>}
            <Outlet />
        </div>
    )
}