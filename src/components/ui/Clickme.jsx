import { useState } from "react";

export default function Clickme() {
    const [clicked, setClicked] = useState(false);
    return <button className='border border-black' onClick={() => setClicked(!clicked)}>{clicked ? 'Unclick me' : 'Click me'}</button>
}