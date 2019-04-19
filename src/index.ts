import { formBond } from "./actions";
import { DirectedGraph } from "./graph";

var graph = new DirectedGraph();

[formBond("root", "u001"), formBond("u001", "u002"), formBond("u001", "u003"), formBond("root", "u003")].forEach((action) => graph.dispatchAction(action));

console.log(graph.store.getState());

console.log(graph.getDirect("root", DirectedGraph.Direction.DOWN));
