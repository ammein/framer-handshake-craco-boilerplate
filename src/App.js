import logo from './logo.svg';
import './App.css';
import AnimatedTextComponent from "https://framer.com/m/AnimatedTextComponent-sApI.js@NDVcK5n2iJsHcfqh5K7E"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AnimatedTextComponent text={["test", "Amin"]} duration={.15} delayDuration={2} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
