import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description-bar',
  templateUrl: './description-bar.component.html',
  styleUrls: ['./description-bar.component.css'],
})
export class DescriptionBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.setTextForStepCount(0);
  }

  public setTextForStepCount(step: number) {
    let textHolder = <HTMLDivElement>document.getElementById('text-display');
    textHolder.innerHTML = getTextForStep(step);
    let stickerSource = <HTMLImageElement>document.getElementById('sticker');
    stickerSource.src = getStickerForStep(step);
  }
}

function getStickerForStep(step: number): string {
  let baseUrl = 'assets/';
  let imgIcon = 'face1.png';
  switch (step) {
    case 0:
      imgIcon = 'face1.png';
      break;

    case 1:
      imgIcon = 'face4.png';
      break;

    case 2:
      imgIcon = 'face9.png';
      break;

    case 3:
      imgIcon = 'face6.png';
      break;

    case 4:
      imgIcon = 'face12.png';
      break;

    case 5:
      imgIcon = 'face2.png';
      break;

    case 6:
      imgIcon = 'face1.png';
      break;

    case 7:
      imgIcon = 'face10.png';
      break;

    case 8:
      imgIcon = 'face7.png';
      break;

    case 9:
      imgIcon = 'face11.png';
      break;

    default:
      break;
  }
  return baseUrl + imgIcon;
}

function getTextForStep(step: number): string {
  switch (step) {
    case 0:
      return "Ok. Chill. Now that we know the hash value based bucket destination for each and every item and we have our buckets ready to go, let's start adding them to our target hash map. The very first item is 'b' as key and 'y' as value. since the calculated bucket for 'b' is going to be 2, let's go ahead and add it to the second bucket. Note that, we'll be using a simple map notation in the next steps to symbolize the key value pairs like, key:value. Also, since we're adding the corresponding key to their own buckets, the time taken for lookup for any key and its value should be in overall <a href='https://www.programiz.com/dsa/asymptotic-notations#:~:text=Asymptotic%20notations%20are%20the%20mathematical,linear%20i.e.%20the%20best%20case.' target='_blank'>O(1)</a> order.";

    case 1:
      return "Ok. We can see a node has been added to the second bucket. So what do we do when we face a collision ? Nothing really, elements will continue to be added to the buckets in a <a href='https://www.geeksforgeeks.org/data-structures/linked-list/' target='_blank'>linked list</a> fashion. This strategy is helpful when multiple entries(key-value pairs) of our hash map try to occupy the same bucket, because hash value of their keys happened to be the same. We just keep on adding the new pairs as nodes to the bucket linked list. Cool right? Now with that out of the way, let's move on to the next item on our inventory.";

    case 2:
      return "Next one was 'g' with 't'. With that added to the third bucket as a simple node, let's talk about collisions a bit more. The whole point of storing key and value pairs as a linked list, is to allow multiple values to be stored in the same bucket. Hmm. But if we keep adding elemets to the bucket wise linked-list and for each lookup we have to traverse through the whole linked list, wouldn't that be inefficient? Well, coming up is 'h':'s'.";

    case 3:
      return "Now there is another collision in our map. If you remeber, We added key 'b' and value 'y' to second bucket earlier. You can always just click on any bucket to findout what are the key-value pairs contained within till current step. Since as per our calculation, the pair 'b':'y' was already at the second position, we have simply linked this new key-value pair to the earlier node. let's move on.";

    case 4:
      return "We've now added 'c':'x'. We know that 'c' should be added to the third bucket where we had 'g':'t' earlier. So here we are with another collision. Again, there is no hash function that we've taken. In real-life, the number of collisions will depend on how good the hash function is and what is the bucket size. Usually we want to minimize the number of collisions. But this is good for us, so that we can understand how java hashmap handles collision scenarios. Anyways, 'c':'x' has been added to the third bucket as the second node in the linked list.";

    case 5:
      return "Next item was 'd' as the key and 'w' as the value. Nothing much here. We've added 'd':'w' to the fourth bucket as for 'd' as the key, fourth was the target bucket. Note that, we're always adding both the key and the value to the buckets. We could have added only the value and could always calculate the bucket number using the hash function on the key if we wanted to get the value back from the map. Then why're we storing both the key and value in the linked list? The answer is pretty obvious. Let's go to the next step.";

    case 6:
      return "For this step, the item in our inventory was 'i':'r'. The target for 'i' was the third bucket, which previously had 'c':'x' and 'g':'t'. So we added the current pair after the last element. Now to answer our own question in the previous step, The reason is looking up the value for a specific key after a collision scenario. If we don't store the key, we'll never be able to fetch the exact value that was associated with the key.";

    case 7:
      return "As you have already noticed, we're reaching the end of our inventory items. For this step, we've added 'e':'v' to the fifth bucket. Let's talk about another hashmap feature. In the hashmap properties bar, we can see a few factors. You can hover over them to see what these mean. Note that the initial capacity of our map is 6. But if we keep that fixed and keep adding new entires, even with a good hashing function we'll reach a state where O(1) lookup time will no longer be possible. To avoid that, we increase the bucket size at a threshold(initial Capacity * Load Factor) and rehash all the elements. <a href='https://javabypatel.blogspot.com/2015/10/what-is-load-factor-and-rehashing-in-hashmap.html' target='_blank'>Here is a very good and explanatory resource on this topic</a>. Let's move on to the final item.";

    case 8:
      return "Whoa!! What just happened? We thought we were going to store everything in a linked-list... I know, right? But hear me out. Remember while adding ('c':'x'), we talked about look up in linked-list being inefficient(step-2)? Yeah, that's what this is about. In and after Java8, the bucket based linked-list converts itself into a <a href='https://en.wikipedia.org/wiki/Red%E2%80%93black_tree' target='_blank'>Red-black tree</a>, after a certain number of collisions occur for a bucket(see Treeify Threshold at top). So the time complexity for any search goes down to O(log(n)) from O(n). Yes, we'll have to store left and right node pointers(just one extra, if you think) and that will take up some space, but it'll have a much better performance. So, after adding 'a':'z' to the third bucket, the linked list there switched to a binary tree.";

    case 9:
      return "That's it! We've now seen most of the internal implementation of Java HashMaps. Feel free to give feedbacks and hang around. Ciao !!! :)";

    default:
      return 'place holder for step' + step.toString();
  }
}
