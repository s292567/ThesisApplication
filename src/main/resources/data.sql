-- INSERT INTO your_table (column1, column2, ...) VALUES (value1, value2, ...);
INSERT INTO Student (surname, name, gender, nationality, email, cod_degree, enrollment_year) VALUES
('Davis', 'John', 'Male', 'American', 'john.davis@example.com', 'ENG1', '2020'),
('Rossi', 'Alice', 'Female', 'Italian', 'alice.rossi@example.com', 'ENG2', '2021'),
('Bruni', 'Michele', 'Male', 'Italian', 'michele.bruni@example.com', 'ENG1', '2019'),
('Freeman', 'Emily', 'Female', 'British', 'emily.freeman@example.com', 'ENG2', '2022'),
('Martinez', 'Christopher', 'Male', 'Mexican', 'christopher.martinez@example.com', 'ENG3', '2020'),
('Anderson', 'Sophia', 'Female', 'Swedish', 'sophia.anderson@example.com', 'ENG3', '2018'),
('Koch', 'Lothar', 'Male', 'German', 'lothar.koch@example.com', 'ENG2', '2021'),
('Rabiot', 'Olivia', 'Female', 'French', 'olivia.rabiot@example.com', 'ENG4', '2019');


INSERT INTO Teacher (surname, name, email, codGroup, codDepartment) VALUES
('Ferrari', 'Luca', 'luca.ferrari@example.com', 'G3', 'D1'),
('Müller', 'Hans', 'hans.muller@example.com', 'G2', 'D3'),
('García', 'Sofía', 'sofia.garcia@example.com', 'G3', 'D1'),
('Ricci', 'Paolo', 'paolo.ricci@example.com', 'G1', 'D2'),
('Romano', 'Maria', 'maria.romano@example.com', 'G2', 'D3'),
('Lee', 'Ji-hoon', 'jihoon.lee@example.com', 'G3', 'D1'),
('Moretti', 'Francesca', 'francesca.moretti@example.com', 'G2', 'D3');
INSERT INTO Degree (codDegree, titleDegree) VALUES
('ENG1', 'Computer Engineering'),
('ENG2', 'Mechanical Engineering'),
('ENG3', 'Electrical Engineering'),
('ENG4', 'Civil Engineering');
INSERT INTO Proposal (title, supervisor_id, coSupervisors, keywords, type, groups, description, requiredKnowledge, notes, expiration, level, cds) VALUES
('AI in Robotics', 1, [2, 3], ['AI', 'Robotics'], 'Research', ['Group1'], 'Exploring the integration of AI in Robotics applications.', 'Strong background in AI and Robotics', 'N/A', '2024-12-31', 'Master', ['ENG1']),
('Renewable Energy Systems', 4, [5, 6], ['Renewable Energy', 'Systems'], 'Development', ['Group2'], 'Design and implement renewable energy systems.', 'Knowledge in renewable energy systems', 'N/A', '2024-05-31', 'PhD', ['ENG2']),
('Smart Cities', 2, [7, 8], ['Smart Cities', 'Urban Planning'], 'Research', ['Group1'], 'Investigate technologies for building smart cities.', 'Urban planning and technology background', 'N/A', '2024-03-31', 'Master', ['ENG3']),
('Structural Engineering', 5, [9, 10], ['Structural Engineering', 'Construction'], 'Development', ['Group2'], 'Develop innovative solutions in structural engineering.', 'Strong background in structural engineering', 'N/A', '2024-02-29', 'PhD', ['ENG4']),
('Cybersecurity in Critical Infrastructure', 3, [4, 5], ['Cybersecurity', 'Critical Infrastructure'], 'Research', ['Group1'], 'Investigate cybersecurity measures for critical infrastructure protection.', 'Cybersecurity background', 'N/A', '2025-12-31', 'Master', ['ENG1']),
('Advancements in Additive Manufacturing', 6, [7, 8], ['Additive Manufacturing', 'Materials Science'], 'Development', ['Group2'], 'Explore new materials and techniques in additive manufacturing.', 'Materials science and engineering knowledge', 'N/A', '2026-07-31', 'PhD', ['ENG2']),
('Renewable Energy Integration in Smart Grids', 1, [2, 3], ['Renewable Energy', 'Smart Grids'], 'Research', ['Group1'], 'Study the integration of renewable energy sources in smart grids.', 'Knowledge in renewable energy and smart grids', 'N/A', '2024-04-30', 'Master', ['ENG3']),
('Sustainable Transportation Solutions', 4, [5, 6], ['Sustainable Transportation', 'Urban Planning'], 'Development', ['Group2'], 'Develop sustainable solutions for urban transportation.', 'Urban planning and transportation background', 'N/A', '2024-12-31', 'PhD', ['ENG4']),
('AI-driven Healthcare Systems', 2, [7, 8], ['AI', 'Healthcare Systems'], 'Research', ['Group1'], 'Explore the application of AI in healthcare systems.', 'Healthcare and AI knowledge', 'N/A', '2024-08-31', 'Master', ['ENG1']),
('Space Exploration Technologies', 5, [6, 7], ['Space Exploration', 'Aerospace Engineering'], 'Development', ['Group2'], 'Develop technologies for space exploration missions.', 'Aerospace engineering background', 'N/A', '2024-10-31', 'PhD', ['ENG2']),
('Advanced Robotics for Manufacturing', 1, [2, 3], ['Robotics', 'Manufacturing'], 'Research', ['Group1'], 'Investigate advanced robotics applications in manufacturing.', 'Robotics and manufacturing knowledge', 'N/A', '2024-10-31', 'Master', ['ENG3']),
('Environmental Impact of Renewable Energy', 4, [5, 6], ['Environmental Impact', 'Renewable Energy'], 'Development', ['Group2'], 'Assess the environmental impact of renewable energy projects.', 'Environmental science background', 'N/A', '2024-11-30', 'PhD', ['ENG4']);