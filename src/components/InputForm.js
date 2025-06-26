import { ITEM_BG_COLOR, LABEL_ITEM, LABEL_LUGGAGE, LUGGAGE_BG_COLOR, TRIP_BG_COLOR } from "../constants";
import Button from "./Button";


function InputForm ({ onChange, newValue, onSubmit, placeholder, label }) {
    let bgColor = TRIP_BG_COLOR;

    if (label === LABEL_LUGGAGE) {
        bgColor = LUGGAGE_BG_COLOR;
    } else if (label === LABEL_ITEM) {
        bgColor = ITEM_BG_COLOR;
    }
     return (
        <div className="mb-2 border rounded">
            <div className={bgColor}>
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