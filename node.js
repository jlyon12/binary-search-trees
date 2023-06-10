export default class Node {
	constructor(value, leftChild, rightChild) {
		this.value = value || null;
		this.leftChild = leftChild || null;
		this.rightChild = rightChild || null;
	}
}
