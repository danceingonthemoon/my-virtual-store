// function capitalizeSentence(sentence) {
//   // Your implementation here
//   const words = sentence.split(" ");
//   const capitalizedWords = [];
//   //captitalise the first letter of each word
//   words.forEach((element) => {
//     const capitalizedWord = element.charAt(0).toUpperCase() + element.slice(1);
//     capitalizedWords.push(capitalizedWord);
//   });
//   // join the captilised words into a sentence
//   const capitalizedSentence = capitalizedWords.join(" ");
//   return capitalizedSentence;
// }

const sentence = "Hello World how are you ?";
const result = capitalizedSentence(sentence);
console.log(result);

// method 2
// use map to capitalize the first letter of the sentence

function capitalizedSentence(sentence) {
  const words = sentence.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  const capitalizedSentence = capitalizedWords.join(" ");
  return capitalizedSentence;
}
