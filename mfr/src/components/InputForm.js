import Button from "./Button";


function InputForm ({ onChange, newValue, onSubmit, placeholder, label }) {
     return (
        <div className="mb-2 border rounded">
            <div className="bg-amber-200">
                <form onSubmit={onSubmit}>
                    <div className="p-2 m-2 flex flex-row items-center justify-between">
                        <div>
                            <label htmlFor="trip-form" className="mr-3">Add {label}</label>
                            <input 
                                type="text"
                                value={newValue}
                                onChange={onChange}
                                placeholder={placeholder}
                                id="trip-form"
                            />
                        </div>
                        <Button >Add</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InputForm;