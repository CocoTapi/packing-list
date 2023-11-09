import { useDispatch } from "react-redux";
import { changeName, addTrip } from "../store/slices/formSlice";
import { useAddItemMutation } from "../store";
import Button from "./Button";


function InputForm () {
    const dispatch = useDispatch();
    const { data, error, isLoading } = useAddItemMutation();

    const handleNameChange = (event) => {
        dispatch(changeName(event.target.value));
        //console.log(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            tripName: event.target.elements.tripName.value
        };
        dispatch(addTrip(formData));
    }

    console.log(error)

    return (
        <div className="mb-2 border rounded">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="m-2 flex flex-row items-center justify-between">
                        <div>
                            <label className="label">Trip Name</label>
                            <input 
                                type="text"
                                onChange={handleNameChange}
                                name="tripName"
                            />
                        </div>
                        <Button loading={isLoading}>Add Trip</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InputForm;