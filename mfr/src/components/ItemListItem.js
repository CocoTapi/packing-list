import { GoTrash } from "react-icons/go";
import { useRemoveItemMutation } from "../store";

function ItemListItem({ item }){
    const [removeItem] = useRemoveItemMutation();

    const handleRemoveItem = () => {
        removeItem(item);
    }

    return (
    <div onClick={handleRemoveItem} className="relative cursor-pointer m-2">
        <div className="absolute inset-0 flex items-center justify-center hover:bg-red-100 opacity-0 hover:opacity-80">
            <GoTrash className="text-3xl" />
        </div>
        {item.entry}
    </div>
    )
}

export default ItemListItem;