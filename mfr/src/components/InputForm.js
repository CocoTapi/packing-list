import { useDispatch, useSelector } from "react-redux";
import { changeName, addTrip } from "../store/slices/tripSlice";

function InputForm ({ onSubmit }) {
    const dispatch = useDispatch();

    const { name } = useSelector((state) => {
        return {
            name: state.form.name
        }
    })

    const handleNameChange = (event) => {
        dispatch(changeName(event.target.value));
    }

    const handleSubmit = (event) => {
        event.prevendDefault();
        dispatch(addTrip({ name }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="m-2 flex flex-row items-center justify-between">
                    <div>
                        <label className="label">Trip Name</label>
                        <input 
                            //className="inout is-expanded"
                            value={name}
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