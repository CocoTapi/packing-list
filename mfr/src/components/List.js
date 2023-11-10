import { useSelector } from "react-redux";

function List () {
    const trips = useSelector((state) => {
        return state.form.name
    });

    console.log(trips);

    return <div>List</div>
}

export default List;