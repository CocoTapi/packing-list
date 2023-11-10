import { GoPlus } from "react-icons/go";
import { useFetchTripsQuery, useAddTripMutation} from "../store";
import Button from "./Button";
import TripListItem from './TripListItem'
import { useState } from 'react';
import InputForm from "./InputForm";

function TripList() {
  const [isFormVisible, setFormVisible] = useState(false);
  const { data, error, isFetching } = useFetchTripsQuery();
 
  const handleShowForm = () => {
    setFormVisible(true);
  }

  const [newValue, setNewValue] = useState('');
  const [addTrip] = useAddTripMutation();
 
  const handleNameChange = (event) => {
      setNewValue(event.target.value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      addTrip({ name: newValue });
      setNewValue('');
  }

  let content;
  if (isFetching) {
    content = <div>Loading</div>
  } else if (error) {
    console.log(error)
    content = <div>Error loading trips</div>
  } else {
    content = data.map(trip => {
      return <TripListItem key={trip.id} trip={trip} />
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h1 className="text-lg font-bold">Trip List</h1>
        <Button onClick={handleShowForm}><GoPlus /></Button>
      </div>
      {isFormVisible && <InputForm 
        onSubmit={handleSubmit} 
        onChange={handleNameChange} 
        newValue={newValue} 
        placeholder="Enter New Trip"/>}
      {content}
    </div>
  )
}

export default TripList;