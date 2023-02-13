import { useState } from "react";

function Enable({ handleChange, value }) {
    return (
        <button onClick={handleChange} value={value}>Button</button>
    );
}

function Button({ handleClick, text, disabled }) {
    return (
        <button disabled={disabled} onClick={handleClick}>
            {text}
        </button>
    );
}

function Demo() {
    const [value, setValue] = useState("");
    const [todoList, setTodoList] = useState([]);

    const handleChange = (event) => {
        setValue([...todoList, value]);
    };

    const handleClear = () => {
        setValue("");
    };

    return (
        <div className="App">
            <div className="container">
                <Enable value={value} handleChange={handleChange} />
                <Button handleClick={handleClear} disabled={!value} text="Clear" />
            </div>
        </div>
    );
}

export default Demo;
