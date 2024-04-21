/**
 * @file questions.js
 * @description This file contains programming exercises for Week 3 of the
 *              Mobile Application Development course. It includes a series of
 *              JavaScript challenges that focus array functions etc.
 *
 *              Students are expected to write their code solutions within this
 *              file in the designated sections for each exercise. The provided
 *              exercises are designed to enhance understanding of basic JavaScript
 *              syntax and problem-solving skills within the context of web and
 *              mobile app development.
 *
 * @author Larry Wen
 * @created [01/03/2024]
 *
 * INSTRUCTIONS:
 * - Follow the prompts for each exercise and write your code in the specified
 *   areas.
 * - Run the provided tests after completing the exercises to check your work.
 * - Do not modify the structure of the file or the provided code snippets.
 * - Seek assistance if you encounter difficulty understanding the exercises or
 *   implementing the solutions.
 */
/**
 * Exercise 1: Filters out negative numbers from an array.
 * @param {number[]} numbers - The array of nLumbers to filter.
 * @return {number[]} A new array containing only positive numbers.
 */
function filterNegativeNumbers(numbers) {
  const negativeNumbers = numbers.filter((item) => item >= 0);
  return negativeNumbers;
  // Your implementation here
}

/**
 * Exercise 2: Doubling Numbers Divisible by Three
 *
 * Objective:
 * Practice using array methods to identify and transform elements within an array.
 * This exercise focuses on processing numbers in an array to find those divisible by three
 * and then doubling those numbers.
 *
 * Task Description:
 * Write a function named `doubleDivisibleByThree`. This function takes an array of numbers as input,
 * filters out all numbers that are divisible by three, and returns a new array with those numbers doubled.
 *
 * @param {number[]} numbers - An array of numbers to be processed.
 * @return {number[]} A new array containing the numbers divisible by three doubled.
 */
function doubleDivisibleByThree(numbers) {
  // Your implementation here
  const newArray = numbers.filter((item) => item % 3 === 0);
  const doubleNewArray = newArray.map((item) => item * 2);
  return doubleNewArray;
}

/**
 * Exercise 3: Selecting High-Performing Students with a Specific Hobby
 *
 * Objective:
 * Practice advanced array manipulation techniques involving filtering, mapping, and sorting.
 * This exercise focuses on processing an array of student objects based on GPA and hobbies,
 * then transforming the output.
 *
 * Task Description:
 * Write a function named `selectHighPerformingStudents`. This function takes an array of student objects as input.
 * Each student object has the following properties:
 * - id (integer): A unique identifier for the student.
 * - name (string): The student's name.
 * - email (string): The student's email.
 * - GPA (number): The student's GPA, ranging from 1 to 7.
 * - hobbies (array of strings): A list of the student's hobbies.
 *
 * The function should:
 * - Filter students who have a GPA greater than or equal to 5 and have 'coding' as one of their hobbies.
 * - Transform the filtered list to include only the student's name and email.
 * - Sort the resulting array alphabetically by the student's name.
 *
 * @param {Object[]} students - An array of student objects.
 * @return {Object[]} An array of objects containing the name and email of qualifying students, sorted by name.
 */
function selectHighPerformingStudents(students) {
  // Your implementation here
  // filter to filter out students who have a 'coding' property and have a hobby reated to coding
  const filteredStudents = students.filter((student) => {
    return (
      student.hobbies && student.hobbies.includes("coding") && student.GPA >= 5
    );
  });
  //
  filteredStudents.sort((a, b) => {
    return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
  });
  //   return a.name.localeCompare(b.name);
  // });

  // map cannot be used inside the filter method ??
  const newFilteredStudents = filteredStudents.map((student) => {
    return {
      name: student.name,
      email: student.email,
    };
  });
  return newFilteredStudents;
}

/**
 * Exercise 4: Aggregating Student Data with `reduce()`
 *
 * Objective:
 * Enhance your skills in using the `reduce()` method for complex data aggregation from an array of objects.
 * This exercise involves calculating statistics from a dataset of student objects, focusing on total count,
 * average GPA, and details about students interested in coding.
 *
 * Task Description:
 * Write a function named `aggregateStudentData` that processes an array of student objects. Each object includes
 * the following properties: `id` (integer), `name` (string), `email` (string), `GPA` (number, from 1 to 7),
 * and `hobbies` (array of strings).
 *
 * The function should return an object with these properties:
 * - `studentNum`: Total number of students
 * - `studentAvgGPA`: Average GPA of all students, rounded to two decimal places
 * - `codingStudentNum`: Number of students who list 'coding' as a hobby
 * - `codingStudentGPA`: Average GPA of students who list 'coding' as a hobby, rounded to two decimal places
 *
 * Implement this function using the `reduce()` method to aggregate the data effectively.
 *
 * @param {Object[]} students - An array of student objects.
 * @return {Object} An object containing aggregated student data.
 */
function aggregateStudentData(students) {
  // Your implementation here
  const totalGPA = students.reduce((tot, student) => tot + student.GPA, 0);
  const totalStudentsNuM = students.length;
  const codingStudents = students.filter((student) =>
    student.hobbies.includes("coding")
  );
  const codingStudentNum = codingStudents.length;
  const codingStudentGPA =
    codingStudentNum > 0
      ? codingStudents.reduce((tot, student) => tot + student.GPA, 0) /
        codingStudentNum
      : 0;
  return {
    studentNum: totalStudentsNuM,
    studentAvgGPA:
      totalStudentsNuM > 0 ? +(totalGPA / totalStudentsNuM).toFixed(2) : 0,
    codingStudentNum: codingStudentNum,
    codingStudentGPA: codingStudentNum > 0 ? +codingStudentGPA.toFixed(2) : 0,
  };
}
/**
 * Exercise 5: Swapping Between Sentence and CamelCase Forms
 *
 * Objective:
 * Enhance your string manipulation skills in JavaScript by converting between sentence form and camelCase form.
 * This exercise will challenge you to implement a function that can detect the form of a given string and convert it to the other form.
 *
 * Task Description:
 * Write a function named `swapForm` that processes a string input. The function should behave as follows:
 * - If the input string is in sentence form (i.e., contains spaces), convert it to camelCase. For example,
 *   "open a bank account" should be converted to "openABankAccount".
 * - If the input string is a single word, assumed to be in camelCase, convert it back to a sentence in all lower cases.
 *   For example, "openABankAccount" would be converted to "open a bank account".
 *
 * Note: You may assume that sentence inputs will be all lower case and camelCase inputs will start with a lowercase letter followed by mixed case.
 *
 * @param {string} input - A string in either sentence form or camelCase form.
 * @return {string} The converted string, either in camelCase or sentence form.
 */
function swapForm(input) {
  // Your implementation here
  if (input.includes(" ")) {
    // must convert into an array first??
    // then using the function map
    const modifiedInput = input
      .split(" ")
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        } else {
          // for(let i = 0; i < word.length; i++){
          //     const firstL = word.charAt(0).toUpperCase();
          //     const otherL = word.slice(1);
          //     return firstL + otherL ;
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      })
      .join("");
    return modifiedInput;
  } else {
    // a new str variable needs to be declared for modification purpose
    const result = [];
    for (let i = 0; i < input.length; i++) {
      // nearly there(swapping mind set in between 2 strings declared to get the right condition )
      if (input[i] === input[i].toUpperCase()) {
        result.push(" ");
      }
      result.push(input[i]); // pushing the UpperCase one before .toLowerCase
    }
    return result.join("").toLocaleLowerCase();
  }
}

// Export the function for testing with Jest
module.exports = {
  filterNegativeNumbers,
  doubleDivisibleByThree,
  selectHighPerformingStudents,
  aggregateStudentData,
  swapForm,
};
