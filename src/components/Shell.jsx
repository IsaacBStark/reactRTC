import { Logo } from "./Logo"
import { useCallInfo } from "./CallInfo"
import { Outlet } from "react-router-dom";

export function Shell() {
    const { state } = useCallInfo();

    return (
        <div id='shell' className='w-full h-full flex flex-col p-4 relative'>
            <Logo />
            {state.displayNumber && <h1 className='text-xl fixed top-2 right-2'>Room: <span className='tracking-wider'>{state.displayNumber}</span></h1>}
            <Outlet />
        </div>
    )
}