import { Tabs, Tab } from "@nextui-org/react";

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
        <div className='flex justify-center'>
            <Tabs items={links} size='lg'>
                {(link) => (
                    <Tab key={link.title} title={link.title}></Tab>
                )}
            </Tabs>
        </div>
    );
}