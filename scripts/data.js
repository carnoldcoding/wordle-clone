export const grid = {
    rows: 6,
    cols: 5
}

export const player = {
    guess: "",
    currentRow: 0,
    currentCol: 0,
    won: false,
    nextRow: function(){
        this.guess = "";
        this.currentRow += 1;
        this.currentCol = 0;
    },
    reset: function(){
        this.guess = "";
        this.currentCol = 0;
        this.currentRow = 0;
    }
}

export const words = [
    'apple', 'brave', 'charm', 'dance', 'eagle', 'fable', 'grape', 'happy', 'ivory', 'joker',
    'knife', 'lemon', 'mango', 'night', 'ocean', 'peace', 'queen', 'rival', 'study', 'table',
    'union', 'vivid', 'water', 'xenon', 'yacht', 'zebra', 'abide', 'blend', 'cloud', 'drink',
    'eager', 'frost', 'globe', 'house', 'ideal', 'joint', 'kiosk', 'light', 'motor', 'nurse',
    'orate', 'pearl', 'quest', 'round', 'scale', 'trust', 'urban', 'vowel', 'wheat', 'yield',
    'zippy', 'alien', 'baker', 'candy', 'dairy', 'email', 'flame', 'grill', 'honor', 'index',
    'jolly', 'leash', 'magic', 'noisy', 'oasis', 'pride', 'quilt', 'river', 'shoes', 'tiger',
    'valid', 'whale', 'youth', 'zesty', 'adopt', 'beach', 'chalk', 'diver', 'enter', 'fifty',
    'ghost', 'happy', 'image', 'joker', 'knock', 'liver', 'music', 'north', 'olive', 'plant',
    'queen', 'rally', 'sheep', 'tiger', 'urban', 'vivid', 'water', 'yummy', 'zebra', 'admit',
    'bring', 'crane', 'dress', 'eagle', 'flame', 'grape', 'horse', 'input', 'jolly', 'knife',
    'lunch', 'model', 'night', 'occur', 'point', 'quest', 'ruler', 'score', 'train', 'unity',
    'vowel', 'worry', 'yield', 'zooey', 'amber', 'brave', 'chalk', 'dance', 'entry', 'field',
    'grape', 'house', 'image', 'joker', 'kiosk', 'lemon', 'melon', 'night', 'ocean', 'pearl',
    'query', 'river', 'sword', 'towel', 'vivid', 'whale', 'yacht', 'zesty', 'agree', 'blink',
    'crisp', 'depot', 'earth', 'fever', 'gloom', 'happy', 'issue', 'jolly', 'knock', 'liver',
    'minor', 'noble', 'oasis', 'petal', 'quick', 'roast', 'sugar', 'tiger', 'urban', 'vivid',
    'world', 'youth', 'zebra', 'apply', 'beard', 'charm', 'diner', 'email', 'flute', 'grape',
    'happy', 'irony', 'jumpy', 'knife', 'laser', 'music', 'ninja', 'ocean', 'piano', 'query',
    'raise', 'stair', 'trust', 'video', 'waltz', 'xenon', 'young', 'zebra', 'abide', 'blend',
    'cloud', 'douse', 'enter', 'fruit', 'green', 'honor', 'inbox', 'joint', 'known', 'lunar',
    'magic', 'night', 'order', 'peace', 'quiet', 'reply', 'scout', 'table', 'unite', 'vivid',
    'water', 'xenon', 'yummy', 'zooey', 'alert', 'beach', 'candy', 'depot', 'empty', 'fifty',
    'grand', 'house', 'input', 'jolly', 'knife', 'lemon', 'motor', 'night', 'olive', 'piano',
    'query', 'round', 'shine', 'train', 'urban', 'vivid', 'worry', 'yield', 'zebra', 'alien',
    'bless', 'cloud', 'drink', 'early', 'fruit', 'grape', 'heart', 'inbox', 'jumpy', 'knock',
    'lemon', 'mango', 'never', 'oasis', 'peace', 'quick', 'river', 'stone', 'tiger', 'video',
    'wheat', 'young', 'zebra', 'after', 'beach', 'craft', 'dance', 'enjoy', 'focus', 'glove',
    'happy', 'input', 'juice', 'knife', 'lemon', 'major', 'night', 'oasis', 'pride', 'query',
    'round', 'sleep', 'train', 'urban', 'value', 'water', 'xenon', 'yacht', 'zebra', 'align',
    'blink', 'crust', 'drive', 'eagle', 'flame', 'glove', 'heart', 'ivory', 'jolly', 'lucky',
    'mango', 'north', 'order', 'pearl', 'quiet', 'ready', 'sword', 'trust', 'vivid', 'waste',
    'youth', 'zebra', 'apple', 'baker', 'candy', 'dance', 'enter', 'frost', 'globe', 'happy'
];


