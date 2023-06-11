import Tree from './js/tree.js';
import prettyPrint from './js/prettyPrint.js';

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(testArray);

console.log(myTree);
prettyPrint(myTree.root);
