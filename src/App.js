import TripList from "./components/TripList";

export const SERVER_URL = 'http://192.168.50.164:3005'; //this must change if your IP changes

function App() {
  return (
    <div className="container mx-auto bg-yellow-50">
      <TripList />
    </div>
  );
}

export default App;
