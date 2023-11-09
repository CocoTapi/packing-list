import { useDispatch} from "react-redux";
import { changeName, addTrip } from "../store/slices/tripSlice";

function InputForm ({ onSubmit }) {
    const dispatch = useDispatch();

    const handleNameChange = (event) => {
        dispatch(changeName(event.target.value));
    }

    const handleSubmit = (formData) => {
        formData.prevendDefault();
        dispatch(addTrip(formData));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="m-2 flex flex-row items-center justify-between">
                    <div>
                        <label className="label">Trip Name</label>
                        <input 
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