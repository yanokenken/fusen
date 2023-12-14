// import { AppProvider } from '@/providers/app';
import {BrowserRouter as Router} from 'react-router-dom';
import { AppRoutes } from './routes';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <AppRoutes />
      </Router>
    </RecoilRoot>
  );
}

export default App;