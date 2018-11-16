import { combineReducers } from "redux";
import { Actions } from "./actions";
import { arrayIsIdentical } from "./helpers";
import { GraphAction, Relationship } from "./types";

export const root_reducer = combineReducers({
    relationships
})

function relationships(state: Relationship[] = [], action: GraphAction): Relationship[] {
    switch (action.type) {
        case Actions.FORM_BOND:
            return [...state, [action.parent, action.child]];
        case Actions.BREAK_BOND:
            return state.filter((relationship) => !arrayIsIdentical(relationship, [action.parent, action.child]))
        default:
            return state;
    }
}