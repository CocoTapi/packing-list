import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrash } from 'react-icons/go';
import LuggageList from "./LuggageList";
import { useRemoveTripMutation } from "../store";

function TripListItem ({ trip }) {
    const [removeTrip, results] = useRemoveTripMutation();

    const handleRemoveTrip = () => {
        removeTrip(trip);
    };

    const header =  (
        <>
          <Button className="mr-3" loading={results.isLoading} onClick={handleRemoveTrip}>
            <GoTrash />
          </Button>
          {results.error && <div>Error deleting trip.</div>}
          {trip.name}
        </>
    ); 

    return (
        <ExpandablePanel header={header}>
            <LuggageList trip={trip} />
        </ExpandablePanel>
    );
}

export default TripListItem;