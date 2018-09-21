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

import { emptyState } from "./redux-state/reducers";
import { createTasksFromEntityEvents } from "./entities/Task";

export const mergeEntityEventArrays = (entityEventsA, entityEventsB) => {
    if (!Array.isArray(entityEventsA)) {
        throw "entityEventsA must be an array, got " + JSON.stringify(entityEventsA);
    }

    if (!Array.isArray(entityEventsB)) {
        throw "entityEventsB must be an array, got " + JSON.stringify(entityEventsB);
    }

    const mergedEntityEvents = entityEventsA.splice(0);

    console.debug(`Merging entity events ${JSON.stringify(entityEventsB)} into ${JSON.stringify(mergedEntityEvents)}`);

    for (let i = 0; i < entityEventsB.length; i++) {
        if (!mergedEntityEvents.find((entityEvent) => entityEvent.id === entityEventsB[i].id)) {
            console.debug(`Adding entity event ${JSON.stringify(entityEventsB[i])} to ${JSON.stringify(mergedEntityEvents)}`);
            mergedEntityEvents.push(entityEventsB[i])
        } else {
            console.debug(`Entity event ${JSON.stringify(entityEventsB[i])} already in ${JSON.stringify(mergedEntityEvents)}`);
        }
    }
    return mergedEntityEvents;
};

export const mergeStates = (stateA, stateB) => {
    if (stateA == null) {
        console.debug("stateA is null, not merging.");
        return stateB;
    }

    if (stateB == null) {
        console.debug("stateB is null, not merging.");
        return stateA;
    }

    const mergedState = emptyState();

    console.debug(`mergeStates: stateA is ${JSON.stringify(stateA)}, stateB is ${JSON.stringify(stateB)}`);

    mergedState.entities.tasks.allEvents = mergeEntityEventArrays(
        stateA.entities.tasks.allEvents,
        stateB.entities.tasks.allEvents
    );

    mergedState.entities.tasks.unsyncedEvents = mergeEntityEventArrays(
        stateA.entities.tasks.unsyncedEvents,
        stateB.entities.tasks.unsyncedEvents
    );

    mergedState.entities.tasks.calculatedEntities = createTasksFromEntityEvents(mergedState.entities.tasks.allEvents);

    return mergedState;
};

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
