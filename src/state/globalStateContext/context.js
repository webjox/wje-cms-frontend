import {createContext} from 'react';

const globalState = createContext({
    userData: {},
    setUserData: () => {}
});

export default globalState;
