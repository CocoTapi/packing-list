import { GoPlus } from "react-icons/go";
import { useFetchTripsQuery} from "../store";
import Button from "./Button";
//import InputForm from "./InputForm";
import TripListItem from './TripListItem'
import { useState } from 'react';

function TripList() {

  const [isFormVisible, setFormVisible] = useState(false);
  const { data, error, isFetching } = useFetchTripsQuery();
  //const [addTrip, results] = useAddTripMutation();

  // const handleAddTripName = () => {
  //   addTrip()
  // }

  const handleShowForm = () => {
    setFormVisible(true);
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
        {/* <Button onClick={handleAddTripName} loading={results.isLoading}>
          + Add Trip
        </Button> */}
        <Button onClick={handleShowForm}><GoPlus /></Button>
      </div>
      {content}
      {isFormVisible && <div>Form Screen!</div>}
    </div>
  )
}

export default TripList;