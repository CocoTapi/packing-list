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

    const header = (
      <>
        <Button onClick={handleRemoveLuggage} loading={results.isLoading}>
            <GoTrash />
        </Button>
        {luggage.title}
      </>)

    return (
    <ExpandablePanel key={luggage.id} header={header}>
        <ItemList luggage={luggage}/>
    </ExpandablePanel>
    )
  
}

export default LuggageListItem;