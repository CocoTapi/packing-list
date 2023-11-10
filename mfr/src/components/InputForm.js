import { useAddTripMutation } from "../store";
import Button from "./Button";
import { useState } from 'react';


function InputForm () {
    const [newTrip, setNewTrip] = useState('');
    const [addTrip] = useAddTripMutation();
   
    const handleNameChange = (event) => {
        setNewTrip(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addTrip({ name: newTrip });
        setNewTrip('');
    }

    return (
        <div className="mb-2 border rounded">
            <div className="bg-amber-200">
                <form onSubmit={handleSubmit}>
                    <div className="p-2 m-2 flex flex-row items-center justify-between">
                        <div>
                            <label htmlFor="trip-form" className="mr-3">Add Trip</label>
                            <input 
                                type="text"
                                value={newTrip}
                                onChange={handleNameChange}
                                placeholder="Enter new trip"
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