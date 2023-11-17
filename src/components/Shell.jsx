import Navbar from "./Navbar"

export default function Shell({children}) {
    return (
        <div id='shell' className='w-full h-full flex flex-col p-4'>
            <Navbar />
            {children}
        </div>
    )
}