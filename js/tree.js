/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import Node from './node.js';
import prettyPrint from './prettyPrint.js';

export default class Tree {
	constructor(array) {
		this.array = initializeArray(array);
		this.root = buildTree(this.array, 0, this.array.length - 1);
	}

	insert(value) {
		this.root = insertRec(this.root, value);
	}

	delete(value) {
		this.root = deleteRec(this.root, value);
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

function deleteRec(root, value) {
	if (root === null) {
		return root;
	}

	if (value > root.value) {
		root.right = deleteRec(root.right, value);
		return root;
	}
	if (value < root.value) {
		root.left = deleteRec(root.left, value);
		return root;
	}
	if (root.right === null) {
		const temp = root.left;
		root = null;
		return temp;
	}
	if (root.left === null) {
		const temp = root.right;
		root = null;
		return temp;
	}
	let parent = root;
	let next = root.right;

	while (next.left !== null) {
		parent = next;
		next = next.left;
	}
	if (parent !== root) {
		parent.left = next.right;
	} else {
		parent.right = next.right;
	}
	root.value = next.value;
	next = null;
	return root;
}
