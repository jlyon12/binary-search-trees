/* eslint-disable import/extensions */
import Tree from './js/tree.js';

function generateRandomNumbers() {
	const array = [];
	for (let i = 0; i < 10; i += 1) {
		array.push(Math.round(Math.random() * 100));
	}
	return array;
}
const randomNumbers = generateRandomNumbers();
const myTree = new Tree(randomNumbers);
console.log(`Beginning Binary Search Tree`);
console.log(`--------------------------------`);
myTree.prettyPrint();
console.log(`Is the tree balanced? \n ${myTree.isBalanced()}`);
console.log(`--------------------------------`);
console.log(`LevelOrder is: \n ${myTree.levelOrder()}`);
console.log(`PreOrder is: \n ${myTree.preOrder()}`);
console.log(`PostOrder is: \n ${myTree.postOrder()}`);
console.log(`InOrder is: \n ${myTree.inOrder()}`);
console.log(`--------------------------------`);
myTree.insert(240);
myTree.insert(420);
myTree.insert(555);
myTree.insert(321);
myTree.insert(808);
myTree.insert(666);
myTree.insert(777);
myTree.insert(1983);
myTree.insert(404);
myTree.insert(1911);
console.log(
	` The following numbers have been inserted into the tree \n'240'\n'420'\n'555'\n'321'\n'808'\n'666'\n'777'\n'1983'\n'404'\n'1911' `
);
console.log(`--------------------------------`);
console.log(`Is the tree balanced? \n ${myTree.isBalanced()}`);
myTree.rebalance();
console.log(`The tree has been rebalanced!`);
console.log(`Is the tree balanced? \n ${myTree.isBalanced()}`);
console.log(`--------------------------------`);
console.log(`LevelOrder is: \n ${myTree.levelOrder()}`);
console.log(`PreOrder is: \n ${myTree.preOrder()}`);
console.log(`PostOrder is: \n ${myTree.postOrder()}`);
console.log(`InOrder is: \n ${myTree.inOrder()}`);
console.log(`--------------------------------`);
myTree.prettyPrint();
