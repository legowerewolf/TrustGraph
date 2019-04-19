import { GraphAction } from "./types";

export enum Actions {
	FORM_BOND = "FORM_BOND",
	BREAK_BOND = "BREAK_BOND"
}

/** Form a link in the graph between a pair of nodes.
 *
 * This function creates an action. Dispatch it through DirectedGraph.dispatchAction().
 *
 * @param parent The node to link from
 * @param child The node to link to
 */
export function formBond(parent: string, child: string): GraphAction {
	return {
		type: Actions.FORM_BOND,
		parent,
		child
	};
}

/** Break a link in the graph between a pair of nodes.
 *
 * This function creates an action. Dispatch it through DirectedGraph.dispatchAction().
 *
 * @param parent The head of the link that will be broken
 * @param child The tail of the link that will be broken
 */
export function breakBond(parent: string, child: string): GraphAction {
	return {
		type: Actions.BREAK_BOND,
		parent,
		child
	};
}
