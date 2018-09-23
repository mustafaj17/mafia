import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div className="app-holder">
    <App username="mus"/>
    <App username="muk"/>
    <App username="john"/>
    <App username="mark"/>
    <App username="baby"/>
    <App username="chicken"/>
</div>, document.getElementById('root'));
registerServiceWorker();
