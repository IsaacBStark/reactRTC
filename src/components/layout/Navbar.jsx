export default function Navbar() {
    const links = [
        {
            title: 'Home',
            link: '#',
        },
        {
            title: 'Text Chat',
            link: '#',
        },
        {
            title: 'Video Chat',
            link: '#',
        }
    ]

    return (
        <nav className='bg-gray-200 h-20 flex justify-center items-center'>
            <ul className='flex justify-between w-1/4'>
                {links.map((e) => {
                    return <li><a href={e.link}>{e.title}</a></li>
                })}
            </ul>
        </nav>
    );
}