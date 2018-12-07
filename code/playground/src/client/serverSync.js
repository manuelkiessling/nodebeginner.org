import { syncEntityEventsThunk } from "../universal/redux-actions/thunks";
import { entityNamesToClasses } from "../universal/entities/EntityEventFactory";

export default (store) => {

    setInterval(() => {
        console.debug("Checking if any unsynced entity events need to be synced.");
        for (const entityName in entityNamesToClasses) {
            const unsyncedEvents = store.getState().entities[entityName].unsyncedEvents;
            if (unsyncedEvents.length > 0) {
                console.debug(`Found ${unsyncedEvents.length} unsynced ${entityName} events, dispatching syncEntityEventsThunk`);
                store.dispatch(syncEntityEventsThunk(entityName));
            }
        }
    }, 5000);

};
