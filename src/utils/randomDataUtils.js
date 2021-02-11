import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

export const generateRandomWord = () => lorem.generateWords(1);
export const generateRandomNumber = (min, max) => {
  const r = Math.random() * (max-min) + min;
  return Math.floor(r);
};

export const generateValidTestGrid = () => ([
  {
    width: 6,
    text: generateRandomWord()
  },
  {
    width: 3,
    text: generateRandomWord()
  },
  {
    width: 3,
    text: generateRandomWord()
  }
]);