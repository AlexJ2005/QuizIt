import { shuffle, words, generateWords } from "../helper";

describe("utils/helper", () => {
  describe("shuffle", () => {
    xit("should shuffle an array", () => {
      const actual = shuffle(words);
      const stringify = JSON.stringify(actual);
      expect(stringify).not.toEqual(JSON.stringify(words));
    });
  });
  describe("generateWords", () => {
    it("should generate an array of words with the length 3", () => {
      const actual = generateWords("tests");
      expect(actual.length).toBe(3);
    });
  });
});
