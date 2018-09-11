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


    General questions: always derive state only from a timeseries of events, or use events and state?

    Scenarios that need to be handled:

    - App is online, a full page reload occurs, and the SSR page delivers initial state, potentially containing stuff
      that the App not yet has. The localStorage also contains state, potentially containing stuff that the backend does
      not yet have.

      How do we get to a valid initial redux state? One solution could be to put a "last-modified"
      timestamp onto every task in the state. When the page initializes, we take the SSR state and the localStorage
      state, and create a resulting state containing all the tasks that occur only in one of the sources, and for tasks
      that occur in both states, take the one with the latest "last-modified". This would require to never really delete
      tasks, but to flag them as deleted, or else we would end up with "zombies" of a task does not occur in the SSR
      state because the backend already knows it is deleted and therefore doesn't include it in the SSR state, and the
      app that was offline still has it in its localStorage.

 */

import {emptyState} from "../universal/redux-state/reducers";

const containsMoreUpToDateTask = (task, arr) => {
    for (let i=0; i < arr.length; i++) {
        if (task.id === arr[i].id && task.lastModified >= arr[i].task) {
            return true;
        }
    }
    return false;
};

export const mergeSsrAndLocalStorageState = (ssrState, localStorageState) => {
    const mergedState = emptyState();

    console.debug(`mergeSsrAndLocalStorageState: ssrState is ${JSON.stringify(ssrState)}, localStorageState is ${JSON.stringify(localStorageState)}`);

    if (ssrState !== null && ssrState !== undefined && ssrState.tasks !== undefined) {
        console.debug(`Checking ${ssrState.tasks.length} tasks from ssrState for merge...`);
        for (let i = 0; i < ssrState.tasks.length; i++) {
            const task = ssrState.tasks[i];
            if (!containsMoreUpToDateTask(task, mergedState)) {
                console.debug(`Pushing task ${JSON.stringify(task)} from ssrState to mergedState.`);
                mergedState.push(task);
            }
        }
    }

    if (localStorageState !== null && localStorageState !== undefined && localStorageState["tasks"] !== undefined) {
        console.debug(`Checking ${localStorageState.tasks.length} tasks from localStorageState for merge...`);
        for (let i = 0; i < localStorageState.tasks.length; i++) {
            const task = localStorageState.tasks[i];
            if (!containsMoreUpToDateTask(task, mergedState)) {
                console.debug(`Pushing task ${JSON.stringify(task)} from localStorageState to mergedState.`);
                mergedState.push(task);
            }
        }
    }

    return mergedState;
};

export const retrieveStateFromLocalStorage = () => JSON.parse(localStorage.getItem("state"));

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
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
