import React, { useState } from 'react'

const Header = ({ country }: { country: string }) => {
    const [name, setName] = useState("yash")
    const handleClick = () => setName("kamesh")

    return (
        <>
            <h4>welcome, {name} from {country}</h4>
            <button onClick={() => handleClick}>click and name change </button>
        </>
    )
}

export default Header