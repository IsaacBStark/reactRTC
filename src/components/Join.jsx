import { Button, Input } from "@nextui-org/react"
import { useCallInfo } from "./CallInfo"

export function Join({onClick}) {
    const { roomNumber } = useCallInfo();
    return (
        <div className='flex gap-2 items-center'>
            <Input inputMode="numeric" pattern='[0-9]*' label='Room #' radius='none' onChange={(e) => roomNumber.current = e.target.value}></Input>
            <Button color='success' variant='shadow' radius="none" className="text-white" size='lg' onClick={() => {
                roomNumber && onClick();
            }}>Join Room</Button>
        </div>
    )
}