import "./App.css";
import JustForm from "./components/justForm";
import SimpleFileReader from "./components/SimpleFileReader";
import SimpleCheckbox from "./components/SimpleCheckbox";
import FontDialog from "./components/FontDialog";
import SplitContainerWithContent from "./components/SplitContainerWithContent";
import Chart from "./components/Chart";

function App() {
  return (
    <div className="App">
      <h1>Оконное приложение на React</h1>
      <JustForm />
      <SimpleFileReader />
      <SimpleCheckbox />
      <FontDialog />
      <SplitContainerWithContent />
      <Chart />
    </div>
  );
}

export default App;
