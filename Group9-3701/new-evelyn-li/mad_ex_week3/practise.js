// wrong answer ??? why wrong 
// . map cannot be used inside filter method ?
//. 
function selectHighPerformingStudents(students) {
  // Your implementation here
  // filter to filter out students who have a 'coding' property and have a hobby reated to coding
  const filteredStudents = students.filter((student) => {
    student.hobbies &&
      student.coding >=
        (5).map((student) => ({ name: student.name, email: student.email }));
    filteredStudents.sort((a, b) => {
      return a.name.localCompare(b.name);
    });
    return filteredStudents;
  });
}
