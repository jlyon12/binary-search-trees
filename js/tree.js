/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import Node from './node.js';

export default class Tree {
	constructor(array) {
		this.array = initializeArray(array);
		this.root = buildTree(this.array, 0, this.array.length - 1);
	}

	insert(value) {
		this.root = insertRec(this.root, value);
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

function insertRec(root, value) {
	if (root === null) {
		root = new Node(value);
		return root;
	}
	if (value > root.value) {
		root.right = insertRec(root.right, value);
	} else if (value < root.value) {
		root.left = insertRec(root.left, value);
	}
	return root;
}
