import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DescriptionBarComponent } from '../description-bar/description-bar.component';
import { LinkedList } from './linked-node';
import { BinaryTree } from './tree-node';

@Component({
  selector: 'app-visualizer-space',
  templateUrl: './visualizer-space.component.html',
  styleUrls: ['./visualizer-space.component.css'],
})
export class VisualizerSpaceComponent implements OnInit {
  constructor(private http: HttpClient) {
    this.descriptionBarRef = new DescriptionBarComponent();
  }

  descriptionBarRef: DescriptionBarComponent;
  ngOnInit() {
    this.drawOnCanvas();
  }

  bucketToStartObject: Map<any, any> = new Map();
  bucketToElement: Map<any, any> = new Map();
  // TODO: should be removed once one-click draw is configured
  skeletonDrawn: boolean = false;
  processedElements: Map<any, any> = new Map();
  collisionConvertThreshold: number = 3;
  static stepCount: number = 0;

  public drawOnCanvas() {
    // To ensure one time drawing at beginning
    if (this.skeletonDrawn) {
      return;
    }
    this.skeletonDrawn = true;
    let ele = <HTMLCanvasElement>document.getElementById('canvas');
    if (ele == null) {
      throw new Error('canvas not found');
    }

    // keyToBucket will be a Map<Data, Bucket_No>
    this.createKeyValueBucketPairs();

    this.InitializeAndDrawBuckets(ele);
  }

  private createKeyValueBucketPairs() {
    let targetMap = new Map();
    targetMap.set('b', 'y');
    targetMap.set('g', 't');
    targetMap.set('h', 's');
    targetMap.set('c', 'x');
    targetMap.set('d', 'w');
    targetMap.set('i', 'r');
    targetMap.set('e', 'v');
    targetMap.set('a', 'z');

    // keyToBucket comes from a backend service(cached at backend)
    let keyToBucket = new Map<any, any>();
    keyToBucket = this.setupBuckets(targetMap, keyToBucket);

    let KeyValueBucketPairs = [];
    for (const [k, v] of targetMap) {
      KeyValueBucketPairs.push([k, v, keyToBucket.get(k)]);
    }

    // bucketToElement => {bucket1:[item_1,...item_n]}
    for (const [key, value, bucket] of KeyValueBucketPairs) {
      try {
        if (!Array.from(this.bucketToElement.keys()).includes(bucket)) {
          this.bucketToElement.set(bucket, [[key, value]]);
        } else {
          if (!isPresentIn(this.bucketToElement.get(bucket), [key, value])) {
            this.bucketToElement.get(bucket).push([key, value]);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  private setupBuckets(targetMap: Map<any, any>, keyToBucket: Map<any, any>) {
    for (let key of Array.from(targetMap.keys())) {
      switch (key.toLowerCase()) {
        case 'b':
          keyToBucket.set(key, 2);
          break;

        case 'c':
          keyToBucket.set(key, 3);
          break;

        case 'h':
          keyToBucket.set(key, 2);
          break;

        case 'g':
          keyToBucket.set(key, 3);
          break;

        case 'd':
          keyToBucket.set(key, 4);
          break;

        case 'i':
          keyToBucket.set(key, 3);
          break;

        case 'e':
          keyToBucket.set(key, 5);
          break;

        case 'a':
          keyToBucket.set(key, 3);
          break;

        default:
          break;
      }
    }

    return keyToBucket;
  }

  private InitializeAndDrawBuckets(ele: HTMLCanvasElement) {
    let {
      context,
      x_margin,
      y_start,
      width,
      height,
      text_x_start,
      text_y_start,
      first_arrow_base_x,
      first_arrow_base_y,
    } = this.drawingInitializer(ele); // beginner node arrow x location. Again fixated.

    ({ y_start, text_y_start, first_arrow_base_y } = this.drawBuckets(
      context,
      x_margin,
      y_start,
      width,
      height,
      text_x_start,
      text_y_start,
      first_arrow_base_x,
      first_arrow_base_y
    ));
  }

  public drawForBucket(canvas: HTMLCanvasElement, bucketId: number) {
    let bucketList = new LinkedList();
    let bucketTree = new BinaryTree();
    let context = canvas.getContext('2d');
    if (!Array.from(this.processedElements.keys()).includes(bucketId)) {
      return;
    }

    let cctReached: boolean = false;
    for (const [key, value] of this.processedElements.get(bucketId)) {
      if (!cctReached) {
        bucketList.add(
          key,
          value,
          context,
          this.bucketToStartObject.get(bucketId)
        );
      }
      if (bucketList.size() > this.collisionConvertThreshold) {
        cctReached = true;
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.InitializeAndDrawBuckets(canvas);
      }
      if (cctReached) {
        for (const [key, value] of this.processedElements.get(bucketId)) {
          bucketTree.add(
            key,
            value,
            context,
            this.bucketToStartObject.get(bucketId)
          );
        }
        break;
      }
    }
  }

  private drawingInitializer(ele: HTMLCanvasElement) {
    let width = 50,
      height = 50;
    let context = ele.getContext('2d');
    context.font = '17px Verdana';
    let y_start = 10,
      text_y_start = 42,
      text_x_start = 27,
      x_margin = 10,
      // 25(mid position)+10(margin)
      first_arrow_base_y = 35,
      // 50 = 10(margin)+40(arrow would be 10px inside)
      first_arrow_base_x = 50; // beginner node arrow x location. Again fixated.
    return {
      context,
      x_margin,
      y_start,
      width,
      height,
      text_x_start,
      text_y_start,
      first_arrow_base_x,
      first_arrow_base_y,
    };
  }

  public findBucketAndDrawForIt(event) {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x >= 10 && x <= 60) {
      if (10 <= y && y <= 60) {
        this.redrawForBucket(canvas, 0);
      } else if (61 <= y && y <= 110) {
        this.redrawForBucket(canvas, 1);
      } else if (111 <= y && y <= 160) {
        this.redrawForBucket(canvas, 2);
      } else if (161 <= y && y <= 211) {
        this.redrawForBucket(canvas, 3);
      } else if (212 <= y && y <= 262) {
        this.redrawForBucket(canvas, 4);
      } else if (263 <= y && y <= 312) {
        this.redrawForBucket(canvas, 5);
      }
    }
    return;
  }

  private redrawForBucket(canvas: HTMLCanvasElement, targetBucket: number) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.InitializeAndDrawBuckets(canvas);
    this.drawForBucket(canvas, targetBucket);
  }

  private drawBuckets(
    context: CanvasRenderingContext2D,
    x_margin: number,
    y_start: number,
    width: number,
    height: number,
    text_x_start: number,
    text_y_start: number,
    first_arrow_base_x: number,
    first_arrow_base_y: number
  ) {
    for (let bucketId = 0; bucketId <= 5; bucketId++) {
      context.strokeRect(x_margin, y_start, width, height);
      context.fillText(bucketId.toString(), text_x_start, text_y_start);

      this.bucketToStartObject.set(bucketId, {
        start_x: first_arrow_base_x,
        start_y: first_arrow_base_y,
      });
      first_arrow_base_y += height;
      y_start += height;
      text_y_start += height;
    }
    return { y_start, text_y_start, first_arrow_base_y };
  }

  private setupNewMapForStep(): number {
    let mapForStep = new Map();
    let targetBucketForLatestStep: number;
    for (
      let currStep = 1;
      currStep <= VisualizerSpaceComponent.stepCount;
      currStep++
    ) {
      const [bucket, count] = getBucketAndItemsForStep(currStep);
      mapForStep.set(bucket, this.bucketToElement.get(bucket).slice(0, count));
      targetBucketForLatestStep = bucket;
    }
    this.processedElements = mapForStep;
    return targetBucketForLatestStep;
  }

  public goNext() {
    if (VisualizerSpaceComponent.stepCount >= 9) {
      (<HTMLButtonElement>document.getElementById('next')).disabled = true;
      return;
    }
    VisualizerSpaceComponent.stepCount += 1;
    if (VisualizerSpaceComponent.stepCount > 0) {
      (<HTMLButtonElement>document.getElementById('prev')).disabled = false;
    }
    this.descriptionBarRef.setTextForStepCount(
      VisualizerSpaceComponent.stepCount
    );
    if (VisualizerSpaceComponent.stepCount == 9) {
      return;
    }
    let targetBucketForThisStep = this.setupNewMapForStep();
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.redrawForBucket(canvas, targetBucketForThisStep);
  }
  public goPrev() {
    if (VisualizerSpaceComponent.stepCount == 0) {
      (<HTMLButtonElement>document.getElementById('prev')).disabled = true;
      return;
    }
    if (VisualizerSpaceComponent.stepCount <= 9) {
      (<HTMLButtonElement>document.getElementById('next')).disabled = false;
    }
    VisualizerSpaceComponent.stepCount -= 1;
    this.descriptionBarRef.setTextForStepCount(
      VisualizerSpaceComponent.stepCount
    );
    if (VisualizerSpaceComponent.stepCount == 9) {
      return;
    }
    let targetBucketForThisStep = this.setupNewMapForStep();
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.redrawForBucket(canvas, targetBucketForThisStep);
  }
}

function getBucketAndItemsForStep(step: number): number[] {
  switch (step) {
    case 1:
      return [2, 1];
    case 2:
      return [3, 1];
    case 3:
      return [2, 2];
    case 4:
      return [3, 2];
    case 5:
      return [4, 1];
    case 6:
      return [3, 3];
    case 7:
      return [5, 1];
    case 8:
      return [3, 4];

    default:
      break;
  }
}

function isPresentIn(haystack: any[], needle: any[]): boolean {
  return JSON.stringify(haystack).indexOf(JSON.stringify(needle)) >= 0;
}
