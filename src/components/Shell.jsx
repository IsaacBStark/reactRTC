export default function Shell({children}) {
    return (
        <div id='shell' className='w-full h-full flex flex-col p-4'>
            {children}
        </div>
    )
}