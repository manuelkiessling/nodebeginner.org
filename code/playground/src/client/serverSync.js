import { pushEntityEventsThunk } from "../universal/redux-actions/thunks";
import { entityNamesToClasses } from "../universal/entities/EntityEventFactory";

export default (store) => {

    setInterval(() => {
        console.debug("Checking if any unsynced entity events need to be pushed...");
        if (store.getState().session.isLoggedIn && store.getState().session.userId != null) {
            const userId = store.getState().session.userId;
            for (const entityName in entityNamesToClasses) {
                if (store.getState().entities.hasOwnProperty(userId)) {
                    const unsyncedEvents = store.getState().entities[userId][entityName].unsyncedEvents;
                    if (unsyncedEvents.length > 0) {
                        console.debug(`Found ${unsyncedEvents.length} unsynced ${entityName} events, dispatching pushEntityEventsThunk for userId ${userId}...`);
                        store.dispatch(pushEntityEventsThunk(userId, entityName));
                    }
                }
            }
        } else {
            console.debug("Not logged in, so not pushing unsynced entity events.");
        }
    }, 5000);

};
