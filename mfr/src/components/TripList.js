import { useFetchTripsQuery, useAddTripMutation } from "../store";
import Button from "./Button";
import TripListItem from './TripListItem'

function TripList ({ trip }) {
  const { data, error, isFetching } = useFetchTripsQuery(trip);

  const [addTrip, results] = useAddTripMutation();

  const handleAddTrip = () => {
    addTrip(trip);
  };

  let content;
  if (isFetching) {
    content = <div>Loading</div>
  } else if (error) {
    content = <div>Error loading trips</div>
  } else {
    return <TripListItem key={trip.id} trip={trip}/>
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h1 className="text-lg font-bold">Trip List</h1>
        <Button onClick={handleAddTrip} loading={results.isLoading}>
          + Add Trip
        </Button>
      </div>
        {content}
    </div>
    )
}

export default TripList;