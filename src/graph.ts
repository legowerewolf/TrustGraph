import { createStore, Store } from "redux";
import { arrayContains } from "./helpers";
import { root_reducer } from "./reducers";
import { GraphAction, StoreShape } from "./types";

export class DirectedGraph {
	store: Store<StoreShape>;
	ROOT_USER: string;

	constructor() {
		this.store = createStore(root_reducer);
	}

	dispatchAction(action: GraphAction) {
		this.store.dispatch(action);
	}

	/** Finds all direct relatives of a given node in a particular direction
	 *
	 * @param node A node's UUID, as given to the graph.
	 * @param direction A direction to search the graph in.
	 */
	getDirect(node: string, direction: DirectedGraph.Direction): string[] {
		return this.store
			.getState() // Get current state...
			.relationships.filter((relationship) => relationship[direction] == node) // Filter for links beginning (downward search) or ending (upward search) with the given node.
			.map((relationship) => relationship[1 - direction]); // Get the nodes at the opposite ends of the links.
	}

	/** Finds all relatives of a given node in a particular direction
	 *
	 * @param node A node's UUID, as given to the graph.
	 * @param direction A direction to search the graph in.
	 */
	getAll(node: string, direction: DirectedGraph.Direction): string[] {
		let nodes = this.getDirect(node, direction);

		// Traverse the graph in the given direction until the list of discovered nodes stops growing
		for (let lastLength = -1; nodes.length > lastLength; ) {
			lastLength = nodes.length; // Keep track of the previous size of the list of discovered nodes

			// For each known node...
			nodes.forEach((element) => {
				// Add the directly related nodes that aren't already in the list of discovered nodes.
				nodes.push(...this.getDirect(element, direction).filter((newAncestor) => !arrayContains(nodes, newAncestor)));
			});
		}
		return nodes;
	}

	/** Counts the shortest number of hops from one node to another in a particular direction
	 *
	 * @param nodeA
	 * @param nodeB
	 * @param direction
	 */
	getSeperation(nodeA: string, nodeB: string, direction: number): number {
		let nodes = this.getDirect(nodeA, direction);
		let hops = 1;

		// Traverse the graph in the given direction until the number of discovered nodes stops growing or we find the destination node
		for (let lastLength = -1; nodes.length > lastLength && !arrayContains(nodes, nodeB); hops++) {
			lastLength = nodes.length; // Keep track of the previous size of the list of discovered nodes

			// For each known node...
			nodes.forEach((element) => {
				// Add the directly related nodes that aren't already in the list of discovered nodes.
				nodes.push(...this.getDirect(element, direction).filter((newAncestor) => !arrayContains(nodes, newAncestor)));
			});
		}

		// If the list of discovered nodes contains the destination, return the number of hops. Else return null.
		return arrayContains(nodes, nodeB) ? hops : null;
	}
}

export namespace DirectedGraph {
	export enum Direction {
		DOWN = 0,
		UP = 1
	}
}
