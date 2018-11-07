import { Actions } from "./actions";
import { arrayIsIdentical } from "./helpers";
import { GraphAction, Relationship, StoreShape } from "./types";

export function root(state: any = {}, action: GraphAction): StoreShape {
    return {
        relationships: relationships(state.relationships, action)
    }
}

function relationships(state: Relationship[] = [], action: GraphAction): Relationship[] {
    switch (action.type) {
        case Actions.FORM_BOND:
            return [...state, [action.parent, action.child]];
        case Actions.BREAK_BOND:
            return state.filter((relationship) => !arrayIsIdentical(relationship, [action.parent, action.child]))
    }
}