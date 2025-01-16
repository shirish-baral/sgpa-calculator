// JavaScript for CGPA and SGPA Calculators

const semestersData = {
    1: [
        { name: 'Physics', credits: 3 },
        { name: 'Differential Equations and Linear Algebra', credits: 4 },
        { name: 'Science Elective', credits: 2 },
        { name: 'Engineering Elective II', credits: 2 },
        { name: 'Science of Living Systems', credits: 2 },
        { name: 'Environmental Science', credits: 2 },
        { name: 'Physics Lab', credits: 1 },
        { name: 'Programming Lab', credits: 4 },
        { name: 'Engineering Drawing & Graphics', credits: 1 },
    ],
    2: [
        { name: 'Chemistry', credits: 3 },
        { name: 'Transform Calculus and Numerical Analysis', credits: 4 },
        { name: 'English', credits: 2 },
        { name: 'Basic Electronics', credits: 2 },
        { name: 'Engineering Elective I', credits: 2 },
        { name: 'HASS Elective I', credits: 2 },
        { name: 'Chemistry Lab', credits: 1 },
        { name: 'Engineering Lab', credits: 1 },
        { name: 'Workshop', credits: 1 },
        { name: 'Communication Lab', credits: 1 },
    ],
    3: [
        { name: 'Scientific and Technical Writing', credits: 2 },
        { name: 'Probability and Statistics', credits: 4 },
        { name: 'Industry 4.0 Technologies', credits: 2 },
        { name: 'Data Structures', credits: 4 },
        { name: 'Digital Systems Design', credits: 3 },
        { name: 'Automata Theory and Formal Languages', credits: 4 },
        { name: 'Data Structures Laboratory', credits: 1 },
        { name: 'Digital Systems Design Laboratory', credits: 1 },
    ],
    4: [
        { name: 'HASS Elective II', credits: 3 },
        { name: 'Discrete Structures', credits: 4 },
        { name: 'Operating Systems', credits: 3 },
        { name: 'Object Oriented Programming using Java', credits: 3 },
        { name: 'Database Management Systems', credits: 3 },
        { name: 'Computer Organization and Architecture', credits: 4 },
        { name: 'Operating Systems Laboratory', credits: 1 },
        { name: 'Java Programming Laboratory', credits: 1 },
        { name: 'Database Management Systems Laboratory', credits: 1 },
        { name: 'Vocational Electives', credits: 1 },
    ],
    5: [
        { name: 'Engineering Economics', credits: 3 },
        { name: 'Design and Analysis of Algorithms', credits: 3 },
        { name: 'Software Engineering', credits: 4 },
        { name: 'Computer Networks', credits: 3 },
        { name: 'Professional Elective-I', credits: 3 },
        { name: 'Professional Elective-II', credits: 3 },
        { name: 'Algorithms Laboratory', credits: 1 },
        { name: 'Computer Networks Laboratory', credits: 1 },
        { name: 'K-Explore Open Elective-I', credits: 1 },
    ],
    6: [
        { name: 'HASS Elective-III', credits: 3 },
        { name: 'Machine Learning', credits: 4 },
        { name: 'Artificial Intelligence', credits: 3 },
        { name: 'Professional Elective-III', credits: 3 },
        { name: 'Open Elective-II/ MI-I', credits: 3 },
        { name: 'Universal Human Values', credits: 3 },
        { name: 'Artificial Intelligence Laboratory', credits: 1 },
        { name: 'Applications Development Laboratory', credits: 2 },
        { name: 'Mini Project', credits: 2 },
    ],
    7: [
        { name: 'Professional Elective-IV', credits: 3 },
        { name: 'Engineering Professional Practice', credits: 2 },
        { name: 'Open Elective-III/ (MI-II)', credits: 3 },
        { name: 'Project-I', credits: 5 },
        { name: 'Internship', credits: 2 },
        { name: 'MI- (Computing Laboratory)', credits: 2 },
    ],
    8: [
        { name: 'Research Elective', credits: 3 },
        { name: 'Research Project', credits: 12 },
    ],
};

function showSemesterSubjects() {
    const semesterSelect = document.getElementById('semesterSelect');
    const selectedSemester = semesterSelect.value;
    const subjectsContainer = document.getElementById('subjectsContainer');

    subjectsContainer.innerHTML = '';

    if (semestersData[selectedSemester]) {
        const subjects = semestersData[selectedSemester];

        subjects.forEach((subject, index) => {
            const subjectDiv = document.createElement('div');
            subjectDiv.className = 'subject';
            subjectDiv.innerHTML = `
                <span>${index + 1}. ${subject.name} (${subject.credits} credits)</span>
                <input type="number" min="0" max="10" step="0.1" placeholder="Grade (0-10)" data-credits="${subject.credits}" class="gradeInput">
            `;
            subjectsContainer.appendChild(subjectDiv);
        });
    }
}

function calculateSgpa() {
    let totalCredits = 0;
    let weightedSum = 0;

    const gradeInputs = document.querySelectorAll('.gradeInput');

    gradeInputs.forEach((input) => {
        const grade = parseFloat(input.value);
        const credits = parseInt(input.getAttribute('data-credits'));

        if (!isNaN(grade)) {
            weightedSum += grade * credits;
            totalCredits += credits;
        }
    });

    const sgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0;
    document.getElementById('sgpaResult').textContent = `Your SGPA is: ${sgpa}`;
}

function calculateCgpa() {
    const previousCgpa = parseFloat(document.getElementById('previousCgpa').value);
    const previousCredits = parseInt(document.getElementById('previousCredits').value);
    const newSgpa = parseFloat(document.getElementById('newSgpa').value);
    const newCredits = parseInt(document.getElementById('newCredits').value);

    if (!isNaN(previousCgpa) && !isNaN(previousCredits) && !isNaN(newSgpa) && !isNaN(newCredits)) {
        const totalCredits = previousCredits + newCredits;
        const weightedSum = (previousCgpa * previousCredits) + (newSgpa * newCredits);
        const newCgpa = (weightedSum / totalCredits).toFixed(2);

        document.getElementById('cgpaResult').textContent = `Your CGPA is: ${newCgpa}`;
    } else {
        document.getElementById('cgpaResult').textContent = 'Please fill in all fields correctly.';
    }
}
