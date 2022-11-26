import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import CellList from './components/cell-list/cell-list';
import { store } from './state';

const App = () => {    
    return (
        <Provider store={store}>
            <div>
                <CellList />
            </div>
        </Provider>
    );
}

const root = createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
