import TripList from "./components/TripList";
import List from './components/List';
import InputForm from "./components/InputForm";

function App() {
  return (
    <div className="container mx-auto bg-yellow-50">
      <TripList />
      <InputForm />
      <List />
    </div>
  );
}

export default App;
