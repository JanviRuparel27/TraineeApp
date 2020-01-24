// import {createStore, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
// import reducer from './reducer'

// const configureStore = () => {
//     const middleware = [thunk];
//     return createStore(reducer, applyMiddleware(...middleware))
// };

// export {configureStore}


import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { createLogger } from 'redux-logger';

const configureStore = () => {
    const middleware = [thunk];
    //open comment
    if (process.env.NODE_ENV !== 'production') {
        const logger = createLogger();
        middleware.push(logger);
      }
    return createStore(reducer, applyMiddleware(...middleware))
};

export {configureStore}
