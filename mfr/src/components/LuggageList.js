import { useFetchLuggageQuery, useAddLuggageMutation } from "../store";
import { GoPlus } from "react-icons/go";
//import Skeleton from './Skeleton';
import Button from './Button';
import LuggageListItem from "./LuggageListItem";
import { useState } from 'react';
import InputForm from "./InputForm";

function LuggageList({ trip }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const { data, error, isFetching } = useFetchLuggageQuery(trip);
  const [newValue, setNewValue] = useState('');
  const [addLuggage] = useAddLuggageMutation();
  
  const handleShowForm = () => {
    setFormVisible(true);
  }
 
  const handleNameChange = (event) => {
      setNewValue(event.target.value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      addLuggage({ title: newValue, tripId: trip.id });
      setNewValue('');
  }

  let content;
  if (isFetching) {
    content = <div>Loading...</div>
  } else if (error) {
    console.log(error)
    content = <div>Error loading luggage.</div>
  } else {
    content = data.map(luggage => {
      return <LuggageListItem key={luggage.id} luggage={luggage}/>
    })
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Luggages for {trip.name}</h3>
        <Button onClick={handleShowForm}><GoPlus /></Button>
      </div>
      {isFormVisible && <InputForm 
        onSubmit={handleSubmit} 
        onChange={handleNameChange} 
        newValue={newValue} 
        placeholder="Enter New Luggage"/>}
      {content}
    </div>
  );
}

export default LuggageList;
