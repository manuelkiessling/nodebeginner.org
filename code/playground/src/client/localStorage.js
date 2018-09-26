export const retrieveStateFromLocalStorage = () => JSON.parse(localStorage.getItem("state"));

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        console.debug(`Writing ${serializedState} to localStorage at "state"`);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.error(e);
    }
};

export const setUpLocalStorageStoreSubscription = (store) => {
    store.subscribe(() => {
        console.debug(`Syncing new state to localStorage`);
        saveStateToLocalStorage(store.getState())
    });
};
