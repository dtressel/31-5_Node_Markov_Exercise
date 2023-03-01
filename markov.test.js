const MarkovMachine = require('./markov');

test('should be able to instantiate a new instance of the class', () => {
  const mm = new MarkovMachine('hi');
  expect(mm).toBeInstanceOf(MarkovMachine);
})

test('makechains() should successfully make the Markov chains', () => {
  const mm = new MarkovMachine('the cat in the hat');
  expect(mm.chains).toEqual({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]});
})

test('removeDuplicates() should succesfully remove duplicate values from array', () => {
  const mm = new MarkovMachine('the cat in the hat likes the cat');
  expect(mm.wordsNoDuplicates).toEqual(['the', 'cat', 'in', 'hat', 'likes']);
})

test('makeText() should always return a string that includes that last word of the provided text', () => {
  const mm = new MarkovMachine('the cat in the hat likes the cat');
  expect(mm.makeText()).toEqual(expect.stringContaining('cat'));
  const mm2 = new MarkovMachine('cheese is the best kind of food now and always');
  expect(mm2.makeText()).toEqual(expect.stringContaining('always'));
})

test('makeText() should always return the same one-word string when supplied with that one-word string', () => {
  const mm = new MarkovMachine('hi');
  expect(mm.makeText()).toBe('hi');
})

test('makeText() should never return a string that is longer than 100 words', () => {
  const mm = new MarkovMachine('goat! would not in a mouse. i would not, could not, in a box. not eat them! and i do not eat them in a boat! and in a house. i will eat them with a mouse. i say. sam! if you eat them in the dark. would you, with a box. i would you, on a mouse? i am daniel i will not eat them with a box. and you eat them with a box. i woould not, could not, could not. with a box. and i do not like them with a car! sam! if you may. try')
  for (let i = 0; i < 20; i++) {
    expect(mm.makeText().toLowerCase().split(/[ \r\n]+/).filter(c => c !== "").length).toBeLessThan(101);
  }
})