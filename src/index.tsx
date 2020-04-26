import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import 'antd/dist/antd.css';
import {Skeleton} from "antd";

const Game = React.lazy(() => import('./pages/Game'));
const TensorflowDemo = React.lazy(() => import('./pages/TensorflowDemo'));

function App() {
    return (
        <Router>
            <div>
                <div className="main-nav">
                    <ul>
                        <li>
                            <Link to="/">React Game</Link>
                        </li>
                        <li>
                            <Link to="/tf">Tensorflow Js</Link>
                        </li>
                    </ul>
                </div>
                <Suspense fallback={<Skeleton paragraph={{rows: 2}} />}>
                    <Switch>
                        <Route path='/' exact>
                            <Game/>
                        </Route>
                        <Route path='/tf'>
                            <TensorflowDemo />
                        </Route>
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
