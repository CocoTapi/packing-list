import LongTripList from './components/LongTripList';
import ShortTripList from './components/ShortTripList';

function App() {
  return (
    <div>
      <h1>Packing List</h1>
      <h2>Long Trip</h2>
      <LongTripList />
      <h2>Short Trip</h2>
      <ShortTripList />
    </div>
  );
}

export default App;
