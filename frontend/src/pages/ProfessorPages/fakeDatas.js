// fakeDatas.js contains fake data for visual development purposes

export const students = [
  {
    id: 1,
    surname: "Rossi",
    name: "Mario",
    gender: "Male",
    nationality: "Italian",
    email: "mario.rossi@email.com",
    degree: "Computer Science",
    enrollmentYear: 2020,
  },
  {
    id: 2,
    surname: "Bianchi",
    name: "Luca",
    gender: "Male",
    nationality: "Italian",
    email: "luca.bianchi@email.com",
    degree: "Electrical Engineering",
    enrollmentYear: 2021,
  },
  {
    id: 3,
    surname: "Verdi",
    name: "Sofia",
    gender: "Female",
    nationality: "Italian",
    email: "sofia.verdi@email.com",
    degree: "Mechanical Engineering",
    enrollmentYear: 2019,
  },
  // ... more students
];
export const proposals = [
  {
    id: "a1b2c3",
    title: "Artificial Intelligence in Robotics and Automation",
    supervisor: "Prof. Gianni",
    coSupervisors: ["Prof. Marta", " Prof. Carlo"],
    keywords: "AI, Robotics",
    type: "Research",
    groups: "G1, G2",
    description: "Exploring AI applications in autonomous robots.",
    requiredKnowledge: "Basics of AI, Machine Learning",
    notes: "Focus on practical implementations",
    expiration: "2023-12-31",
    level: "MSc",
    cds: "Computer Science",
  },
  {
    id: "d4e5f6",
    title: "Renewable Energy Systems",
    supervisor: "Prof. Elena",
    coSupervisors: [""],
    keywords: "Renewable Energy, Sustainability",
    type: "Development",
    groups: "G3",
    description: "Designing sustainable energy solutions.",
    requiredKnowledge: "Fundamentals of Renewable Energy",
    notes: "",
    expiration: "2023-06-30",
    level: "BSc",
    cds: "Electrical Engineering",
  },
  // ... more proposals
];

export const applications = [
  { id: "x123", student_id: 1, proposal_id: "a1b2c3", status: "pending" },
  { id: "y456", student_id: 2, proposal_id: "a1b2c3", status: "accepted" },
  { id: "z789", student_id: 3, proposal_id: "d4e5f6", status: "declined" },
  // ... more applications
];
