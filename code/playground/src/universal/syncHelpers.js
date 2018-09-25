import { emptyState } from "./redux-state/reducers";
import { createEntityEventFromObject, entityNamesToClasses } from "./entities/EntityEvents";

export const mergeEntityEventArrays = (entityEventsA, entityEventsB) => {
    if (!Array.isArray(entityEventsA)) {
        throw "entityEventsA must be an array, got " + JSON.stringify(entityEventsA);
    }

    if (!Array.isArray(entityEventsB)) {
        throw "entityEventsB must be an array, got " + JSON.stringify(entityEventsB);
    }

    const mergedEntityEvents = entityEventsA.splice(0);

    console.debug(`Merging entity events ${JSON.stringify(entityEventsB)} into ${JSON.stringify(mergedEntityEvents)}`);

    entityEventsB.forEach((entityEventB) => {
        if (!mergedEntityEvents.find((mergedEntityEvent) => mergedEntityEvent.id === entityEventB.id)) {
            console.debug(`Adding entity event ${JSON.stringify(entityEventB)} to ${JSON.stringify(mergedEntityEvents)}`);
            mergedEntityEvents.push(entityEventB)
        } else {
            console.debug(`Entity event ${JSON.stringify(entityEventB)} already in ${JSON.stringify(mergedEntityEvents)}`);
        }
    });
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

            for (const entityName in entityNamesToClasses) {
                mergedState.entities[entityName].allEvents = mergeEntityEventArrays(
                    stateA.entities[entityName].allEvents,
                    stateB.entities[entityName].allEvents
                );

                mergedState.entities[entityName].unsyncedEvents = mergeEntityEventArrays(
                    stateA.entities[entityName].unsyncedEvents,
                    stateB.entities[entityName].unsyncedEvents
                );
            }
        }

    }

    for (const entityName in entityNamesToClasses) {
        // EntityEvents from persistent storages are not typed, they are just plain objects.
        // Thus, we map them into "real" EntityEvent objects, which also verifies their correctness
        mergedState.entities[entityName].allEvents =
            mergedState.entities[entityName].allEvents.map(_ => createEntityEventFromObject(_));

        mergedState.entities.tasks.unsyncedEvents =
            mergedState.entities[entityName].unsyncedEvents.map(_ => createEntityEventFromObject(_));

        mergedState.entities[entityName].calculatedEntities = entityNamesToClasses[entityName].entityClass.createFromEntityEvents(mergedState.entities.tasks.allEvents);
    }

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
