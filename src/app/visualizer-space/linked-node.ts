class LinkedNode {
  #x_coordinate: number;
  #y_coordinate: number;
  #width: number = 65;
  #height: number = 40;
  #key: string;
  #value: string;
  #next: LinkedNode = null;

  public getX() {
    return this.#x_coordinate;
  }
  public setX(val: number) {
    this.#x_coordinate = val;
  }
  public getY() {
    return this.#y_coordinate;
  }
  public setY(val: number) {
    this.#y_coordinate = val;
  }
  public getKey() {
    return this.#key;
  }
  public setKey(key: string) {
    this.#key = key;
  }
  public getValue() {
    return this.#value;
  }
  public setValue(val: string) {
    this.#value = val;
  }
  public getNext() {
    return this.#next;
  }
  public setNext(val: LinkedNode) {
    this.#next = val;
  }
  public getNodeWidth() {
    return this.#width;
  }
  public getNodeHeight() {
    return this.#height;
  }

  constructor(key: string, value: string) {
    this.#key = key;
    this.#value = value;
  }
}

export class LinkedList {
  #root: LinkedNode = null;
  #size: number = 0;

  public add(
    key: string,
    val: string,
    context: CanvasRenderingContext2D,
    coordinates: object
  ): LinkedNode {
    this.#size += 1;
    let lastNode: LinkedNode = this.#root;
    // location will be given when root is empty.
    if (lastNode == null) {
      this.#root = new LinkedNode(key, val);
      this.#root.setX(coordinates['start_x']);
      this.#root.setY(coordinates['start_y']);
      this.drawNode(this.#root, context);
    } else {
      let prev_x: number = lastNode.getX(),
        prev_y: number = lastNode.getY();
      while (lastNode.getNext() != null) {
        lastNode = lastNode.getNext();
        prev_x = lastNode.getX();
        prev_y = lastNode.getY();
      }
      let newNode = new LinkedNode(key, val);
      lastNode.setNext(newNode);
      newNode.setX(prev_x + 95);
      newNode.setY(prev_y);
      this.drawNode(newNode, context);
    }
    return this.#root;
  }

  public size(): number {
    return this.#size;
  }

  // public drawLinkedList(
  //   // root: LinkedNode,
  //   coordinates: Object,
  //   context: CanvasRenderingContext2D
  // ): void {
  //   if (this.#root == null || coordinates == null) {
  //     return;
  //   }
  //   this.#root.setX(coordinates['start_x']);
  //   this.#root.setY(coordinates['start_y']);
  //   this.drawNode(this.#root, context);
  //   let currNode = this.#root;
  //   while (currNode != null) {
  //     let curr_x = currNode.getX();
  //     let curr_y = currNode.getY();
  //     currNode = currNode.getNext();
  //     // If reached the last node
  //     if (currNode == null) break;
  //     // no change to Y
  //     // for x, 50(arrow length)+5(remaining from 1st section)+35(data-body width)+5(to be covered from 2nd section)
  //     currNode.setX(curr_x + 95);
  //     currNode.setY(curr_y);
  //     this.drawNode(currNode, context);
  //   }
  // }

  private drawNode(node: LinkedNode, context: CanvasRenderingContext2D) {
    this.drawArrow(
      context,
      node.getX(),
      node.getY(),
      node.getX() + 50,
      node.getY()
    );

    this.drawDataBox(
      context,
      node.getX() + 40,
      node.getY() - 20,
      node.getNodeWidth(),
      node.getNodeHeight(),
      node.getKey(),
      node.getValue()
    );
  }

  private drawArrow(
    context: CanvasRenderingContext2D,
    fromx: number,
    fromy: number,
    tox: number,
    toy: number
  ) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 6),
      toy - headlen * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(tox, toy);
    context.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 6),
      toy - headlen * Math.sin(angle + Math.PI / 6)
    );
    context.stroke();
    context.closePath();
  }

  private drawDataBox(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    key: string,
    value: string
  ) {
    context.strokeRect(x, y, width, height);
    context.beginPath();
    context.moveTo(x + 15, y);
    context.lineTo(x + 15, y + height);
    context.moveTo(x + 50, y);
    context.lineTo(x + 50, y + height);
    context.stroke();
    context.closePath();
    context.font = '13px Verdana';
    // context.fillText(key + ':' + value, x + 22, y + 25);
    if (key.length == 1) context.fillText(key + ':' + value, x + 22, y + 25);
    else if (key.length == 2)
      context.fillText(key + ':' + value, x + 18, y + 25);
  }
}
