import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducers from './reducer'
import {createStore, applyMiddleware, compose} from 'redux'
import {BrowserRouter, Route,Redirect,Switch} from 'react-router-dom'
import Register from "./container/register/register";
import Login from "./container/login/login";

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension() : f=>f
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path='/login' component={Login}></Route>
                <Route path='/signup' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));


