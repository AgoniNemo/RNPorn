import Reducer from 'reduxs/reducer';
import { createStore } from 'redux';

export default () => {
    const store = createStore(Reducer);
    return store;
}