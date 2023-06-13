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

	find(value) {
		this.root = findRec(this.root, value);
	}

	levelOrder(callback) {
		const q = [];
		const visitedNodes = [];
		q.push(this.root);

		while (q.length) {
			const currentNode = q.shift();
			visitedNodes.push(currentNode.value);
			if (currentNode.left) {
				q.push(currentNode.left);
			}
			if (currentNode.right) {
				q.push(currentNode.right);
			}
			if (callback) {
				callback(currentNode);
			}
		}
		return visitedNodes;
	}

	// 	Inorder => Left, Root, Right.
	inOrder(callback, node = this.root, visitedNodes = []) {
		if (node === null) {
			return;
		}
		this.inOrder(callback, node.left, visitedNodes);
		if (callback) {
			callback(node);
		}
		visitedNodes.push(node.value);

		this.inOrder(callback, node.right, visitedNodes);
		return visitedNodes;
	}

	// Preorder => Root, Left, Right.
	preOrder(callback, node = this.root, visitedNodes = []) {
		if (node === null) {
			return;
		}
		if (callback) {
			callback(node);
		}
		visitedNodes.push(node.value);
		this.preOrder(callback, node.left, visitedNodes);
		this.preOrder(callback, node.right, visitedNodes);
		return visitedNodes;
	}

	// Post order => Left, Right, Root.
	postOrder(callback, node = this.root, visitedNodes = []) {
		if (node === null) {
			return;
		}
		this.postOrder(callback, node.left, visitedNodes);
		this.postOrder(callback, node.right, visitedNodes);
		if (callback) {
			callback(node);
		}
		visitedNodes.push(node.value);
		return visitedNodes;
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

function findRec(root, value) {
	if (root === null || root.value === value) {
		return root;
	}
	if (value > root.value) {
		root.right = findRec(root.right, value);
		return root;
	}
	if (value < root.value) {
		root.left = findRec(root.left, value);
		return root;
	}
}
