/* eslint-disable no-use-before-define */
import Node from './node.js';

export default class Tree {
	constructor(array) {
		this.array = initializeArray(array);
		this.root = buildTree(this.array, 0, this.array.length - 1);
	}
}

function initializeArray(array) {
	return [...new Set(array.sort((a, b) => (a > b ? 1 : -1)))];
}

function buildTree(array, start, end) {
	if (start > end) {
		return null;
	}
	const mid = parseInt((start + end) / 2, 10);
	const node = new Node(array[mid]);
	node.left = buildTree(array, start, mid - 1);
	node.right = buildTree(array, mid + 1, end);
	return node;
}
