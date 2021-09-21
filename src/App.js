import logo from './logo.svg';
import './App.css';
import { ErrorBoudary } from './utils/errorUtils';
import { Main } from './components/Main';

function App() {
  return (
    <ErrorBoudary>
      <div className='App'>
        <Main className='main'/>
      </div>
    </ErrorBoudary>
  );
}

export default App;
