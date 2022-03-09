export default class RandomWord {

  constructor() {
    this.fullDeck = [];
    this.currentDeck = [];
    this.hand = [];
  }

  setUpBoard(decksInPlay: number[]) {
    this.getDecks(decksInPlay);
    this.hand = this.initialHand();
  }

  initialHand() {
    const hand = [];
    for (let i =  0; i < 7; i++) {
      const random = this.randomNumber();
      const card = this.pickCardFromDeck(random);
      hand[i] = card;
    }
    return hand;
  }

  randomNumber() {
      return Math.floor(Math.random() * this.currentDeck.length);
  }

  pickCardFromDeck(index: number) {
    const card = this.currentDeck[index];
    this.currentDeck.splice(index, 1);
    return card;
  }

  pickCardFromHand(index: number) {
    const newCard = this.pickCardFromDeck(this.randomNumber());
    if (newCard) {
        this.hand[index] = newCard;
    } else {
        this.hand.splice(index, 1);
    }
  }

  getDecks(deckIndexes: number[]): string[] {
    const decks = [];
    for (let i = 0; i < deckIndexes.length; i++) {
        const deck = this.getDeck(deckIndexes[i]);
        decks.push(...deck);
    }
    this.currentDeck = decks;
    this.fullDeck = decks;
    return decks;
  }

  getDeck(index: number): string[] {
    const decks = [
      null,
      ['river', 'train', 'hammer', 'Shakespeare', 'Antarctica', 'table', 'rodeo', 'fireworks', 'ski', 'ant', 'muscle', 'heart', 'beautiful', 'melt', 'wedding', 'firefighter', 'banana', 'chip'],
      ['rollercoaster', 'horse', 'nose', 'cloud', 'canoe', 'soldier', 'voyage', 'ring', 'ribbon', 'lamp', 'angel', 'cough', 'tropical', 'England', 'Halloween', 'chalk', 'waffle', 'brush'],
      ['ocean', 'wild', 'slippers', 'ketchup', 'peel', 'playground', 'kitchen', 'space', 'actor', 'turtle', 'camping', 'north', 'oatmeal', 'hero', 'boil', 'Mexico', 'strike', 'cup'],
      ['crawl', 'dolphin', 'Canada', 'bicycle', 'fence', 'short', 'bat', 'tree', 'pop', 'maze', 'tower', 'mug', 'doughnut', 'sticky', 'bathtub', 'vacation', 'machine', 'chef'],
      ['cookie', 'couch', 'horn', 'cabin', 'thumb', 'Hawaii', 'ghost', 'pyramid', 'doctor', 'fly', 'tiny', 'Fourth of July', 'coffee', 'flower', 'castle', 'cart', 'bear', 'glove'],
      ['trip', 'ball', 'teacher', 'eagle', 'rock', 'sky', 'owl', 'eye', 'blue', 'whiskey', 'China', 'pretzel', 'airport', 'refrigerator', 'equipment', 'danger', 'brother', 'burger'],
      ['diamond', 'court', 'taco', 'ninja', 'jacket', 'criminal', 'green', 'card', 'supermarket', 'purse', 'job', 'salt', 'waterfall', 'flight attendant', 'movie', 'van', 'leaf', 'car'],
      ['Australia', 'paper', 'dirt', 'phone', 'swamp', 'theater', 'red', 'airplane', 'captain', 'rug', 'magic', 'button', 'finger', 'elephant', 'write', 'chimney', 'almond', 'plumber'],
      ['wave', 'fresh', 'bank', 'tornado', 'rake', 'beach', 'apron', 'pirate', 'Mars', 'camel', 'orange', 'chest', 'shake', 'steam', 'pizza', 'window', 'pipe', 'plate'],
      ['loud', 'grass', 'cotton', 'picnic', 'robot', 'stairs', 'diver', 'yellow', 'crown', 'fair', 'apple', 'sled', 'tool', 'octopus', 'watch', 'drink', 'garage', 'broom'],
      ['bandage', 'white', 'wizard', 'America', 'boot', 'blender', 'circus', 'rose', 'ranger', 'pool', 'glasses', 'mustard', 'beer', 'circle', 'crisp', 'mountain', 'hole', 'office'],
      ['dance', 'fruit', 'star', 'cold', 'basement', 'tiger', 'black', 'astronaut', 'spot', 'hand', 'potato', 'screen', 'sneeze', 'hotel', 'tent', 'desert', 'ear', 'helicopter'],
      ['night', 'money', 'high', 'princess', 'camera', 'game', 'cave', 'cheese', 'oven', 'hospital', 'bee', 'garden', 'detective', 'hang', 'grey', 'club', 'knee', 'fish'],
      ['stadium', 'brain', 'pink', 'gum', 'book', 'jump', 'bus', 'alien', 'pie', 'Caribbean', 'sun', 'statue', 'summer', 'scientist', 'kite', 'telescope', 'shark', 'clock'],
      ['spy', 'zoo', 'toaster', 'triangle', 'rain', 'band', 'slide', 'middle', 'board', 'cross', 'mouth', 'butter', 'giraffe', 'janitor', 'cast', 'state', 'tail', 'drill'],
    ];
    return decks[index];
  }

  getHand() {
    return this.hand;
  }

  setHand(hand: string[]) {
    this.hand = hand;
  }

  getCurrentDeck() {
    return this.currentDeck;
  }
}
