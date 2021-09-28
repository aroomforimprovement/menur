import './App.css';
import { ErrorBoudary } from './utils/errorUtils';
import { Main } from './components/Main';

const App = () => {
  return (
    <ErrorBoudary>
      <div className='App'>
        <Main className='main'/>
      </div>
    </ErrorBoudary>
  );
}

export default App;
