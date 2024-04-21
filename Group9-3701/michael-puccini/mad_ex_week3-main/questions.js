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
 * @param {number[]} numbers - The array of numbers to filter.
 * @return {number[]} A new array containing only positive numbers.
 */
function filterNegativeNumbers(numbers) {
  // Your implementation here
  if (!numbers) 
    return [];
  
  return numbers.filter(number => number >= 0);
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
  let arr = [];

  if (!numbers) 
    return arr;

  // for (let i = 0; i < numbers.length; i++) {
  //   if (numbers[i] % 3 === 0) {
  //     arr.push(numbers[i] * 2);
  //   }
  // }

  numbers.forEach(function(v) {
    if (v % 3 === 0) {
      arr.push(v * 2);
    }
  })
  return arr;
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
  let selectedStudents = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].GPA >= 5 && students[i].hobbies.includes("coding")) {
      selectedStudents.push({name: students[i].name, email: students[i].email});
    }
  }

  selectedStudents.sort((a, b) => a.name.localeCompare(b.name));

  return selectedStudents;
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
  data = {};
  data.studentNum = students.length;
  gpaSum = students.reduce((acc, student) => acc + student.GPA, 0);
  data.studentAvgGPA = Math.floor(gpaSum/students.length * 100) / 100;
  codingStudents = students.filter(student => student.hobbies.includes("coding"));
  data.codingStudentNum = codingStudents.length;
  gpaSumCoding = codingStudents.reduce((acc, student) => acc + student.GPA, 0);
  data.codingStudentGPA = Math.floor(gpaSumCoding/data.codingStudentNum * 100) / 100;

  return data;
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
  let nextCamel = false;
  let str = "";

  for(let i = 0; i < input.length; i++) {
    if (input[i] === " ") {
      nextCamel = true;
      continue;
    }

    if (nextCamel) {
      str += input[i].toUpperCase();
      nextCamel = false;
      continue;
    }

    if (input[i] != input[i].toLowerCase()) {
      str += ` ${input[i].toLowerCase()}`;
      continue;
    }

    str += input[i];
  }

  return str;
}

// Export the function for testing with Jest
module.exports = {
  filterNegativeNumbers,
  doubleDivisibleByThree,
  selectHighPerformingStudents,
  aggregateStudentData,
  swapForm,
};
