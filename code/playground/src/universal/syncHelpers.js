import { emptyState } from "./redux-state/reducers";
import { createTasksFromEntityEvents } from "./entities/TaskEntity";
import { supportedEntities, createEntityEventFromObject } from "./entities/EntityEvents";

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

export const mergeStatesAndRecalculate = (stateA, stateB) => {
    let mergedState = emptyState();

    if (stateA == null && stateB == null) {
        mergedState = emptyState();
    } else {

        if (stateA == null) {
            console.debug("stateA is null, not merging.");
            mergedState = stateB;
        } else if (stateB == null) {
            console.debug("stateB is null, not merging.");
            mergedState = stateA;
        } else {
            console.debug(`mergeStates: stateA is ${JSON.stringify(stateA)}, stateB is ${JSON.stringify(stateB)}`);

            mergedState.entities.tasks.allEvents = mergeEntityEventArrays(
                stateA.entities.tasks.allEvents,
                stateB.entities.tasks.allEvents
            );

            mergedState.entities.tasks.unsyncedEvents = mergeEntityEventArrays(
                stateA.entities.tasks.unsyncedEvents,
                stateB.entities.tasks.unsyncedEvents
            );
        }

    }

    supportedEntities.forEach((entityName) => {
        const transformedEntityName = entityName.toLowerCase() + "s";

        // EntityEvents from persistent storages are not typed, they are just plain objects.
        // Thus, we map them into "real" EntityEvent objects, which also verifies their correctness
        mergedState.entities[transformedEntityName].allEvents =
            mergedState.entities[transformedEntityName].allEvents.map(_ => createEntityEventFromObject(_));

        mergedState.entities.tasks.unsyncedEvents =
            mergedState.entities[transformedEntityName].unsyncedEvents.map(_ => createEntityEventFromObject(_));

        mergedState.entities[transformedEntityName].calculatedEntities = createTasksFromEntityEvents(mergedState.entities.tasks.allEvents);
    });

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
