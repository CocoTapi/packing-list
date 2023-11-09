import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../store/slices/formSlice";
//import { useAddItemMutation } from "../store";
import Button from "./Button";


function InputForm () {
    const dispatch = useDispatch();
    //const { data, error, isLoading } = useAddItemMutation();

    //to get access to the value attribute in <input>
    const name = useSelector((state) => {
        return state.form.name
    })

    const handleNameChange = (event) => {
        dispatch(changeName(event.target.value));
        //console.log(event.target.value)
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = {
    //         tripName: event.target.elements.tripName.value
    //     };
    //     dispatch(addTrip(formData));
    // }

    return (
        <div className="mb-2 border rounded">
            <div>
                <form>
                    <div className="m-2 flex flex-row items-center justify-between">
                        <div>
                            <label>Trip Name</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <Button >Add Trip</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InputForm;