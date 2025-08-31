import { modules, students, mentors, classes } from "./hyf.js";

/**
 * We would like to have a list of everyone that is currently participating in a class.
 * This means the students, but also the mentors that are currently teaching the class.
 * The students should be self explanatory, but to find the mentors you will need to follow these steps:
 * - Check what the `currentModule` of the class is
 * - Find the mentor(s) that are `nowTeaching` that module
 *
 * Should return the list of names and their roles. So something like:
 *
 *  [{ name: 'John', role: 'student' }, { name: 'Mary', role: 'mentor' }]
 */
const getPeopleOfClass = (className) => {
    const existingClass = classes.find((c) => c.name === className);
    if (!existingClass) {
        return;
    }

    // find the current module for this class (only if active)
    const currentModule = existingClass.active && existingClass.currentModule;

    // get all students of this class
    const currentStudents = students
        .filter((student) => student.class === className)
        .map((student) => {
            return {
                name: student.name,
                role: "student",
            };
        });

    // get mentors teaching this module
    const currentMentors = mentors
        .filter((mentor) => mentor.nowTeaching.includes(currentModule))
        .map((mentor) => {
            return {
                name: mentor.name,
                role: "mentor",
            };
        });

    return [...currentStudents, ...currentMentors];
};
// You can uncomment out this line to try your function
console.log(getPeopleOfClass("class34"));

/**
 * We would like to have a complete overview of the current active classes.
 * First find the active classes, then for each get the people of that class.
 *
 * Should return an object with the class names as properties.
 * Each class name property contains an array identical to the return from `getPeopleFromClass`. So something like:
 *
 *  {
 *    class34: [{ name: 'John', role: 'student' }, { name: 'Mary', role: 'mentor' }],
 *    class35: [{ name: 'Jane', role: 'student' }, { name: 'Steve', role: 'mentor' }]
 *  }
 */
const getActiveClasses = () => {
    const activeClasses = classes.filter((c) => c.active === true);
    const result = {};

    activeClasses.forEach((activeClass) => {
        result[activeClass.name] = getPeopleOfClass(activeClass.name);
    });

    return result;
};
// You can uncomment out this line to try your function
console.log(getActiveClasses());
