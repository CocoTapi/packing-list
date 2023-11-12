import { useFetchItemsQuery, useAddItemMutation } from "../store";
import Button from "./Button";
//import Skeleton from "./Skeleton";
import ItemListItem from "./ItemListItem";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import InputForm from "./InputForm";

function ItemsList ({ luggage }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const { data, error, isFetching } = useFetchItemsQuery(luggage);
  const [newValue, setNewValue] = useState('');
  const [addItem] = useAddItemMutation();
  
  const handleShowForm = () => {
    setFormVisible(true);
  }
 
  const handleNameChange = (event) => {
      setNewValue(event.target.value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      addItem({ name: newValue, parentId: luggage.id });
      setNewValue('');
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
                <Button onClick={handleShowForm}>
                    <GoPlus />
                </Button>
            </div>
            {isFormVisible && <InputForm 
                onSubmit={handleSubmit} 
                onChange={handleNameChange} 
                newValue={newValue} 
                placeholder="Enter New Item"/>}
           {content}
        </div>
    )
}

export default ItemsList;
