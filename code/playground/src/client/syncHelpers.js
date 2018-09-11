/*

    The localStorage holds two objects: a copy of the redux state, and a list of events that need to be handled.

    There are two execution pathes: One is triggered upon a user action, the other runs in a loop.

    User action triggered execution path:
        - A redux thunk is dispatched when the user wants to create/change/delete an item.
        - The thunk triggers the syncedLocalStorage passing `dispatch`, which in turn adds the create/change/delete
          event to the localStorage log of events that need to be synced into the redux state and to the backend,
          with both targets marked as not yet synced.
        - The syncedLocalStorage immediately dispatches the redux action that updates the redux state, syncs the new
          state to localStorage, and marks the event as "synced to redux" in the localStorage.
        - It then returns to the thunk.

    Looped execution path:
        - The loop is started as soon as the app is initialized, getting passed `dispatch`
        - It regularly iterates over the list of events in the localStorage.
        - For each event it finds that is marked as synced to redux and synced to the backend, it removes the event
          from the list.
        - For each event it finds that is marked as synced to the redux state, but not synced to the backend, it talks
          to the backend, sending it the event, and upon success from the backend, it dispatches the according success
          event to the redux store, syncs the new redux state to the localStorage, and removes the event from the event
          list.
        - It then queries the backend for new events. If the backend responds with new events, the changes from these
          events are immediately applied to the redux state, and the new redux state is synced to localStorage. However,
          for items that are already locally known, only those events are applied where the event timestamp is younger
          than the "last changed" timestamp of the item.




 */


const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.error(e);
    }
};

export const setUpLocalStorageStoreSubscription = (store) => {
    store.subscribe(() => {
        saveState(store.getState())
    });
};

export const handleUserTriggeredChangeEvent = (event) => {
    let events = JSON.parse(localStorage.getItem("events"));
    console.debug(`Type of events in localStorage is ${typeof events}`);
    console.debug(`Content of events in localStorage is ${JSON.stringify(events)}`);
    if (events === null) {
        events = [];
    }
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
};
