import './App.css';
import Routes from "./routes";
import DataProvider from './containers/DataProvider'

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes />
      </DataProvider>
    </div>
  );
}

export default App;
