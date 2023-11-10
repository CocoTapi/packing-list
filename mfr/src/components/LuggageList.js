import { useFetchLuggageQuery, useAddLuggageMutation } from "../store";
import { GoPlus } from "react-icons/go";
//import Skeleton from './Skeleton';
import Button from './Button';
import LuggageListItem from "./LuggageListItem";
import { useState } from 'react';
import InputForm from "./InputForm";

function LuggageList({ trip }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const { data, error, isFetching} = useFetchLuggageQuery(trip);
  //console.log(data);

  //const [addLuggage, results] = useAddLuggageMutation();
  //console.log(results);
  const handleShowForm = () => {
    setFormVisible(true);
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
      {isFormVisible && <InputForm />}
      {content}
    </div>
  );
}

export default LuggageList;
