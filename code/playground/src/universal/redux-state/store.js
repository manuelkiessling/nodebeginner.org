import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { emptyState, rootReducer } from "./reducers";
import { EntityEventFactory, entityNamesToClasses } from "../entities/EntityEventFactory";
import { mergeEntityEventArrays } from "../entities/EntityEvent";

export const createStoreFromInitialState = (initialState) => createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

const getAllUserIds = (entitiesA, entitiesB) => {
    let userIds = [];
    for (const userId in entitiesA) {
        if (entitiesA.hasOwnProperty(userId)) {
            if (!userIds.includes(userId)) {
                userIds.push(userId);
            }
        }
    }
    for (const userId in entitiesB) {
        if (entitiesB.hasOwnProperty(userId)) {
            if (!userIds.includes(userId)) {
                userIds.push(userId);
            }
        }
    }
    return userIds;
};

const getWinningValue = (valueA, valueB, loosingValue) => {
    if ((valueA !== undefined && valueA !== loosingValue) && (valueB !== undefined && valueB !== loosingValue)) {
        return valueA;
    }
    if ((valueB === loosingValue || valueB === undefined) && (valueA !== undefined && valueA !== loosingValue)) {
        return valueA;
    }
    if ((valueA === loosingValue || valueA === undefined) && (valueB !== undefined && valueB !== loosingValue)) {
        return valueB;
    }
    return loosingValue;
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
            console.debug(`mergeStates: stateA is ${JSON.stringify(stateA, null, 4)}, stateB is ${JSON.stringify(stateB, null, 4)}`);

            mergedState.session.isLoggedIn = getWinningValue(stateA.session.isLoggedIn, stateB.session.isLoggedIn, false);
            mergedState.session.userId = getWinningValue(stateA.session.userId, stateB.session.userId, null);

            const userIds = getAllUserIds(stateA.entities, stateB.entities);

            for (let i=0; i < userIds.length; i++) {

                if (!mergedState.entities.hasOwnProperty(userIds[i])) {
                    const entities = {};
                    for (const entityName in entityNamesToClasses) {
                        entities[entityName] = {
                            allEvents: [],
                            unsyncedEvents: [],
                            calculatedEntities: []
                        }
                    }
                    mergedState.entities[userIds[i]] = entities;
                }

                for (const entityName in entityNamesToClasses) {
                    let entitiesStateAllEventsA = [];
                    let entitiesStateUnsyncedEventsA = [];
                    if (stateA.entities.hasOwnProperty(userIds[i])) {
                        entitiesStateAllEventsA = stateA.entities[userIds[i]][entityName].allEvents;
                        entitiesStateUnsyncedEventsA = stateA.entities[userIds[i]][entityName].unsyncedEvents;
                    }

                    let entitiesStateAllEventsB = [];
                    let entitiesStateUnsyncedEventsB = [];
                    if (stateB.entities.hasOwnProperty(userIds[i])) {
                        entitiesStateAllEventsB = stateB.entities[userIds[i]][entityName].allEvents;
                        entitiesStateUnsyncedEventsB = stateB.entities[userIds[i]][entityName].unsyncedEvents;
                    }

                    mergedState.entities[userIds[i]][entityName].allEvents = mergeEntityEventArrays(
                        entitiesStateAllEventsA,
                        entitiesStateAllEventsB
                    );

                    mergedState.entities[userIds[i]][entityName].unsyncedEvents = mergeEntityEventArrays(
                        entitiesStateUnsyncedEventsA,
                        entitiesStateUnsyncedEventsB
                    );
                }
            }
        }

        for (const userId in mergedState.entities) {
            if (mergedState.entities.hasOwnProperty(userId)) {
                for (const entityName in entityNamesToClasses) {
                    mergedState.entities[userId][entityName].allEvents =
                        mergedState.entities[userId][entityName].allEvents.map(_ => EntityEventFactory.createEntityEventFromObject(_));

                    mergedState.entities[userId][entityName].unsyncedEvents =
                        mergedState.entities[userId][entityName].unsyncedEvents.map(_ => EntityEventFactory.createEntityEventFromObject(_));

                    mergedState.entities[userId][entityName].calculatedEntities =
                        entityNamesToClasses[entityName].entityClass.createFromEntityEvents(mergedState.entities[userId][entityName].allEvents);
                }
            }
        }

    }

    return mergedState;
};
