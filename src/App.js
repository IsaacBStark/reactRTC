import React, { useState } from "react";

export default function App() {
    const [clicked, setClicked] = useState(false);
    return <button onClick={() => setClicked(!clicked)}>{clicked ? 'Unclick me' : 'Click me'}</button>
}