import { formBond } from './actions';
import { TrustGraph } from './graph';

var tg = new TrustGraph();

[
    formBond("root", "u001"),
    formBond("u001", "u002"),
    formBond("u001", "u003"),
    formBond("root", "u003"),
]
    .forEach((action) => tg.dispatchAction(action))

console.log(tg.store.getState())

console.log(tg.getDirect('root', TrustGraph.directions.DOWN));