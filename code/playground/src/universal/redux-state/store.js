import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { emptyState, rootReducer } from "./reducers";
import { EntityEventFactory, entityNamesToClasses } from "../entities/EntityEventFactory";
import { mergeEntityEventArrays } from "../entities/EntityEvent";

export const createStoreFromInitialState = (initialState) => createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

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
            mergedState.entities[entityName].allEvents.map(_ => EntityEventFactory.createEntityEventFromObject(_));

        mergedState.entities[entityName].unsyncedEvents =
            mergedState.entities[entityName].unsyncedEvents.map(_ => EntityEventFactory.createEntityEventFromObject(_));

        mergedState.entities[entityName].calculatedEntities = entityNamesToClasses[entityName].entityClass.createFromEntityEvents(mergedState.entities[entityName].allEvents);
    }

    return mergedState;
};
