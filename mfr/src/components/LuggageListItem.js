import { GoTrash } from 'react-icons/go';
import { useRemoveLuggageMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import ItemList from './ItemList';

function LuggageListItem({ luggage }) {
    const [removeLuggage, results] = useRemoveLuggageMutation();

    const handleRemoveLuggage = () => {
        removeLuggage(luggage);
    };

    const header =  (
        <>
          <Button className="mr-3" loading={results.isLoading} onClick={handleRemoveLuggage}>
            <GoTrash />
          </Button>
          {results.error && <div>Error deleting luggage.</div>}
          {luggage.title}
        </>
    ); 


    return (
    <ExpandablePanel key={luggage.id} header={header} bgColor="bg-lime-200">
        <ItemList luggage={luggage}/>
    </ExpandablePanel>
    )
  
}

export default LuggageListItem;