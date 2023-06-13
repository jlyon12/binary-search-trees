/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import Node from './node.js';
import prettyPrint from './prettyPrint.js';

export default class Tree {
	constructor(array) {
		this.array = this.initializeArray(array);
		this.root = this.buildTree(0, this.array.length - 1, this.array);
	}

	initializeArray(array = this.array) {
		return [...new Set(array.sort((a, b) => (a > b ? 1 : -1)))];
	}

	buildTree(start, end, array = this.array) {
		if (start > end) {
			return null;
		}
		const mid = parseInt((start + end) / 2, 10);
		const node = new Node(array[mid]);
		node.left = this.buildTree(start, mid - 1, array);
		node.right = this.buildTree(mid + 1, end, array);
		return node;
	}

	insert(value, root = this.root) {
		if (root === null) {
			root = new Node(value);
			return root;
		}
		if (value > root.value) {
			root.right = this.insert(value, root.right);
		} else if (value < root.value) {
			root.left = this.insert(value, root.left);
		}
		return root;
	}

	delete(value, root = this.root) {
		if (root === null) {
			return root;
		}

		if (value > root.value) {
			root.right = this.delete(value, root.right);
			return root;
		}
		if (value < root.value) {
			root.left = this.delete(value, root.left);
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

	find(value, root = this.root) {
		const node = root;
		if (node === null) return -1;
		if (value !== node.value) {
			return value > node.value
				? this.find(value, node.right)
				: this.find(value, node.left);
		}
		return node;
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

	height(root = this.root) {
		if (root === null) return -1;
		const leftHeight = this.height(root.left);
		const rightHeight = this.height(root.right);
		return Math.max(leftHeight, rightHeight) + 1;
	}

	depth(nodeValue, root = this.root, depthLevel = 0) {
		const node = this.find(nodeValue);
		if (node === -1) return -1;
		if (node.value === root.value) {
			return depthLevel;
		}
		if (node.value < root.value) {
			return this.depth(nodeValue, root.left, depthLevel + 1);
		}
		return this.depth(nodeValue, root.right, depthLevel + 1);
	}
}
