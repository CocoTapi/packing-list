import { useState } from "react";

function InputForm ({ onSubmit }) {
    const [text, setText] = useState('');

    const handleNameChange = (event) => {
        event.prevendDefault();
        setText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.prevendDefault();
        onSubmit(text);
        setText('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="m-2 flex flex-row items-center justify-between">
                    <div>
                        <label className="label">Trip Name</label>
                        <input 
                            //className="inout is-expanded"
                            value={text}
                            onChange={handleNameChange} 
                        />
                    </div>
                    <button>+ Add</button>
                </div>
            </form>
        </div>
    )
}

export default InputForm;