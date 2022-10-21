import 'bootstrap/dist/css/bootstrap.css'
import App from './frontend/components/App';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<App />);

serviceWorker.unregister();