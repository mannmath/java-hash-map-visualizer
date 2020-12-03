class TreeNode {
  #leftNode: TreeNode = null;
  #rightNode: TreeNode = null;
  #key: string;
  #value: string;
  #xPos: number;
  #yPos: number;
  #width: number = 40;
  #height: number = 65;

  constructor(x: number, y: number, key: string, value: string) {
    this.#xPos = x;
    this.#yPos = y;
    this.#key = key;
    this.#value = value;
  }
  public getKey() {
    return this.#key;
  }
  public getValue() {
    return this.#value;
  }
  public getX() {
    return this.#xPos;
  }
  public getY() {
    return this.#yPos;
  }
  public getWidth() {
    return this.#width;
  }
  public getHeight() {
    return this.#height;
  }
  public getLeft() {
    return this.#leftNode;
  }
  public setLeft(node: TreeNode) {
    this.#leftNode = node;
  }
  public getRight() {
    return this.#rightNode;
  }
  public setRight(node: TreeNode) {
    this.#rightNode = node;
  }

  // Returns coordinate for the left child
  public leftCoordinate() {
    return {
      // 40(width)+40(gap)
      endX: this.getX() + 80,
      // 57(left at bottom)+7(next node right bar)+17(next node data bar middle)
      endY: this.getY() + 81,
      // indicator for side
      side: 'left',
    };
  }
  // Same concept as above but for right child
  public rightCoordinate() {
    return {
      // 40(width)+40(gap)
      endX: this.#xPos + 80,
      // 7(right at top)-7(next node left bar)-17(next node data bar middle)
      endY: this.#yPos - 17,
      side: 'right',
    };
  }
}

// Represents the btree logic
export class BinaryTree {
  #root: TreeNode = null;
  #context: CanvasRenderingContext2D;

  // Getter for root
  public getRoot() {
    return this.#root;
  }

  // Adds element to the tree
  public add(
    key: string,
    value: string,
    context: CanvasRenderingContext2D,
    coordinates: any
  ): void {
    // If root exists, then recursively find the place to add the new node
    this.#context = context;
    if (this.#root) {
      this.recursiveAddNode(this.#root, null, null, key, value);
    } else {
      // If not, the add the element as a root
      this.drawArrow(
        coordinates['start_x'],
        coordinates['start_y'],
        coordinates['start_x'] + 50,
        coordinates['start_y']
      );
      this.#root = this.addAndDisplayNode(
        coordinates['start_x'] + 50,
        coordinates['start_y'],
        key,
        value
      );
      return;
    }
  }

  // Recurively traverse the tree and find the place to add the node
  private recursiveAddNode(
    node: TreeNode,
    prevNode: TreeNode,
    callBack: any,
    key: string,
    value: string
  ) {
    if (!node) {
      // This is either node.leftCoordinate or node.rightCoordinate
      // var callBack = coordinateCallback();
      // left at bottom and right at top.
      let yAdjustment = callBack.side == 'left' ? 57 : 7;
      this.drawArrow(
        // start arrow from inside the node.
        prevNode.getX() + 30,
        prevNode.getY() + yAdjustment,
        callBack.endX,
        callBack.endY
      );
      var newNode = this.addAndDisplayNode(
        callBack.endX,
        callBack.endY,
        key,
        value
      );
      return newNode;
    } else {
      if (key <= node.getKey()) {
        node.setLeft(
          this.recursiveAddNode(
            node.getLeft(),
            node,
            node.leftCoordinate(),
            key,
            value
          )
        );
      } else {
        node.setRight(
          this.recursiveAddNode(
            node.getRight(),
            node,
            node.rightCoordinate(),
            key,
            value
          )
        );
      }
      return node;
    }
  }

  // Draws an arrow from one circle(node) to another circle (node)
  private drawArrow(fromx: number, fromy: number, tox: number, toy: number) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    this.#context.beginPath();
    this.#context.moveTo(fromx, fromy);
    this.#context.lineTo(tox, toy);
    this.#context.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 6),
      toy - headlen * Math.sin(angle - Math.PI / 6)
    );
    this.#context.moveTo(tox, toy);
    this.#context.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 6),
      toy - headlen * Math.sin(angle + Math.PI / 6)
    );
    this.#context.stroke();
    this.#context.closePath();
  }

  // Adds the node to the tree and calls the draw function
  private addAndDisplayNode(x: number, y: number, key: string, value: string) {
    // here the x and y we get are the ending coordinates of the arrow.
    // to keep the arrow inside the Node, drawing is started at x-10(arrow head len).
    // y-17-15 to get to y start position to start drawing.
    var node = new TreeNode(x - 10, y - 32, key, value);
    this.drawNode(node);
    return node;
  }

  private drawNode(node: TreeNode) {
    this.#context.strokeRect(
      node.getX(),
      node.getY(),
      node.getWidth(),
      node.getHeight()
    );
    this.#context.beginPath();
    this.#context.moveTo(node.getX(), node.getY() + 15);
    this.#context.lineTo(node.getX() + node.getWidth(), node.getY() + 15);
    this.#context.moveTo(node.getX(), node.getY() + 50);
    this.#context.lineTo(node.getX() + node.getWidth(), node.getY() + 50);
    this.#context.stroke();
    this.#context.closePath();
    this.#context.font = '13px Verdana';
    this.#context.fillText(
      node.getKey() + ':' + node.getValue(),
      node.getX() + 12,
      node.getY() + 37
    );
    // Adjusting text start location as per strlen()
    // if (node.getData().length == 1)
    //   this.#context.fillText(
    //     node.getData().toString(),
    //     node.getX() + 15,
    //     node.getY() + 37
    //   );
    // else if (node.getData().length == 2)
    //   this.#context.fillText(
    //     node.getData().toString(),
    //     node.getX() + 10,
    //     node.getY() + 37
    //  );
  }
}
