import './App.css';
import { ErrorBoudary } from './utils/errorUtils';
import MenurRouter from './main/MenurRouter';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';

const App = () => {
  return (
    <ErrorBoudary>
      <BrowserRouter>
        <Auth0ProviderWithHistory >
          <div className='App'>
            <MenurRouter className='main'/>
          </div>
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </ErrorBoudary>
  );
}

export default App;
