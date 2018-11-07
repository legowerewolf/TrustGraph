import { GraphAction } from "./types";

export const Actions = {
    FORM_BOND: "FORM_BOND",
    BREAK_BOND: "BREAK_BOND"
}

export function formBond(parent: string, child: string): GraphAction {
    return {
        type: Actions.FORM_BOND,
        parent,
        child
    }
}

export function breakBond(parent: string, child: string): GraphAction {
    return {
        type: Actions.BREAK_BOND,
        parent,
        child
    }
}