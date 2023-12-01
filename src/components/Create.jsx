import { Button } from "@nextui-org/react"

export function Create({onClick}) {
    return (
        <Button size='lg' color='success' variant="shadow" radius='none' className='text-white' onClick={onClick}>Create Room</Button>
    )
}