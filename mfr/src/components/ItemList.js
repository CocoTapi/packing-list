import { useFetchItemsQuery, useAddItemMutation } from "../store";
import Button from "./Button";
//import Skeleton from "./Skeleton";
import ItemListItem from "./ItemListItem";
import { GoPlus } from "react-icons/go";

function ItemsList ({ luggage }) {
    const {data, isFetching, error} = useFetchItemsQuery(luggage);
    const [addItem, results] = useAddItemMutation();

    const handleAddItem = () => {
        addItem(luggage);
    }

    let content;
    if (isFetching) {
        content = <div>Loading...</div>
    } else if (error) {
        content = <div>Error fetching photos...</div>
    } else {
        content = data.map(item => {
            return <ItemListItem key={item.id} item={item} />
        })
    }

    return (
        <div>
            <div className="m-2 flex flex-row items-center juctify-between">
                <h3 className="text-lg font-bold">Items In {luggage.title}</h3>
                <Button loading={results.isLoading} onClick={handleAddItem}>
                    <GoPlus />
                </Button>
            </div>
           {content}
        </div>
    )
}

export default ItemsList;
