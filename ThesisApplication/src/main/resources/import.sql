-- INSERT predefined departments and groups
INSERT INTO Department (cod_department) VALUES ('DEP01'), ('DEP02'), ('DEP03'), ('DEP04');
INSERT INTO group_dep (id,cod_department) VALUES ('G11', 'DEP01'),('G12', 'DEP01'),('G13', 'DEP01'),('G21', 'DEP02'),('G22', 'DEP02'),('G23', 'DEP02'),('G31', 'DEP03'),('G32', 'DEP03'),('G33', 'DEP03'),('G41', 'DEP04'),('G42', 'DEP04'),('G43', 'DEP04');
-- INSERT INTO Degree (column1, column2) VALUES (value1, value2);
INSERT INTO Degree (cod_degree, title_degree) VALUES ('ENG1', 'Computer Engineering'),('ENG2', 'Mechanical Engineering'),('ENG3', 'Electrical Engineering'),('ENG4', 'Civil Engineering');
-- INSERT INTO Student (column1, column2, ...) VALUES (value1, value2, ...);
INSERT INTO Student (id, surname, name, gender, nationality, email, cod_degree, enrollment_year) VALUES ('s654140', 'Davis', 'John', 'Male', 'American', 's654140@example.com', 'ENG1', '2020'),('s634020','Rossi', 'Alice', 'Female', 'Italian', 's634020@example.com', 'ENG2', '2021'),('s637721','Bruni', 'Michele', 'Male', 'Italian', 's637721@example.com', 'ENG1', '2019'),('s654533','Freeman', 'Emily', 'Female', 'British', 's654533@example.com', 'ENG2', '2022'),('s634511','Martinez', 'Christopher', 'Male', 'Mexican', 's634511@example.com', 'ENG3', '2020'),('s655900','Anderson', 'Sophia', 'Female', 'Swedish', 's655900@example.com', 'ENG3', '2018'),('s644145','Koch', 'Lothar', 'Male', 'German', 's644145@example.com', 'ENG2', '2021'),('s644427','Rabiot', 'Olivia', 'Female', 'French', 's644427@example.com', 'ENG4', '2019');
-- INSERT INTO Teacher (column1, column2, ...) VALUES (value1, value2, ...);
INSERT INTO Teacher (id, surname, name, email, cod_group, cod_department) VALUES ('p101','Ferrari', 'Luca', 'p101@example.com', 'G13', 'DEP01'),('p102','Müller', 'Hans', 'p102@example.com', 'G32', 'DEP03'),('p103','García', 'Sofía', 'p103@example.com', 'G13', 'DEP01'),('p104','Ricci', 'Paolo', 'p104@example.com', 'G21', 'DEP02'),('p105','Romano', 'Maria', 'p105@example.com', 'G32', 'DEP03'),('p106','Lee', 'Ji-hoon', 'p106@example.com', 'G13', 'DEP01'),('p107','Moretti', 'Francesca', 'p107@example.com', 'G42', 'DEP04'),('p108','Marsala', 'Roberto', 'p108@example.com', 'G31', 'DEP03'),('p109','Heydari', 'Maryam', 'p109@example.com', 'G22', 'DEP02'),('p110','Crociera', 'Tommaso', 'p110@example.com', 'G41', 'DEP04'),('p111','Park', 'Ji-sung', 'p111@example.com', 'G11', 'DEP01'),('p112','Pascale', 'Federico', 'p112@example.com', 'G22', 'DEP02'),('p113','Stefanini', 'Gian Maria', 'p113@example.com', 'G42', 'DEP04');
-- INSERT INTO Proposal (column1, column2, ...) VALUES (value1, value2, ...);
INSERT INTO Proposal (id, title, supervisor_id, co_supervisors, keywords, type, groups, description, required_knowledge, notes, expiration, level, cds) VALUES ('000003e8-8169-21ee-9d00-325096b39f47', 'AI in Robotics', 'p103', 'Ji-Sung Park', 'AI, Robotics', 'Research', 'G11, G13', 'Exploring the integration of AI in Robotics applications.', 'Strong background in AI and Robotics', 'This thesis aims to explore the current landscape and future potential of AI in Robotics applications. The student is expected to have a strong background in both AI and Robotics.', '2024-12-31', 'BSc', 'Computer Engineering'),('000003e8-8169-21ee-b800-325096b39f47', 'Renewable Energy Systems', 'p101', 'Maryam Heydari, Franco Bossetto', 'Renewable Energy, Systems', 'Development', 'G13', 'Design and implement renewable energy systems.', 'Knowledge in renewable energy systems', 'This thesis focuses on the design and implementation of renewable energy systems. The student should have a good understanding of renewable energy systems.', '2024-05-31', 'MSc', 'Mechanical Engineering'),('000003e8-8169-21ee-9400-325096b39f47', 'Smart Cities', 'p108', 'Hans Müller', 'Smart Cities, Urban Planning', 'Research', 'G31, G32', 'Investigate technologies for building smart cities.', 'Urban planning and technology background', 'This thesis involves the investigation of technologies for building smart cities. The student is expected to have a background in urban planning and technology.', '2024-03-31', 'BSc', 'Electrical Engineering'),('000003e8-8169-21ee-8000-325096b39f47', 'Structural Engineering', 'p110', '', 'Structural Engineering, Construction', 'Development', 'G41', 'Develop innovative solutions in structural engineering.', 'Strong background in structural engineering', 'This thesis focuses on developing innovative solutions in structural engineering. The student should have a strong background in structural engineering.', '2024-02-29', 'MSc', 'Civil Engineering'),('000003e8-8169-21ee-ae00-325096b39f47', 'Cybersecurity in Critical Infrastructure', 'p111', 'Sofía García', 'Cybersecurity, Critical Infrastructure', 'Research', 'G11, G13', 'Investigate cybersecurity measures for critical infrastructure protection.', 'Cybersecurity background', 'This thesis involves the investigation of cybersecurity measures for critical infrastructure protection. The student should have a background in cybersecurity.', '2025-12-31', 'BSc', 'Computer Engineering'),('000003e8-8169-21ee-9b00-325096b39f47', 'Advancements in Additive Manufacturing', 'p109', '', 'Additive Manufacturing, Materials Science', 'Development', 'G22', 'Explore new materials and techniques in additive manufacturing.', 'Materials science and engineering knowledge', 'This thesis explores new materials and techniques in additive manufacturing. The student should have knowledge in materials science and engineering.', '2026-07-31', 'MSc', 'Mechanical Engineering'),('000003e8-8169-21ee-a100-325096b39f47', 'Renewable Energy Integration in Smart Grids', 'p105', 'Giovanna Ruben', 'Renewable Energy, Smart Grids', 'Research', 'G32', 'Study the integration of renewable energy sources in smart grids.', 'Knowledge in renewable energy and smart grids', 'This thesis involves the study of the integration of renewable energy sources in smart grids. The student should have knowledge in renewable energy and smart grids.', '2024-04-30', 'BSc', 'Electrical Engineering'),('000003e8-8169-21ee-9a00-325096b39f47', 'Sustainable Transportation Solutions', 'p107', '', 'Sustainable Transportation, Urban Planning', 'Development', 'G42', 'Develop sustainable solutions for urban transportation.', 'Urban planning and transportation background', 'This thesis focuses on developing sustainable solutions for urban transportation. The student should have a background in urban planning and transportation.', '2024-12-31', 'MSc', 'Civil Engineering'),('000003e8-8169-21ee-a500-325096b39f47', 'AI-driven Healthcare Systems', 'p101', 'Ji-Sung Park', 'AI, Healthcare Systems', 'Research', 'G11, G13', 'Explore the application of AI in healthcare systems.', 'Healthcare and AI knowledge', 'This thesis explores the application of AI in healthcare systems. The student should have knowledge in both healthcare and AI.', '2024-08-31', 'BSc', 'Computer Engineering'),('000003e8-8169-21ee-a400-325096b39f47', 'Space Exploration Technologies', 'p109', '', 'Space Exploration, Aerospace Engineering', 'Development', 'G22', 'Develop technologies for space exploration missions.', 'Aerospace engineering background', 'This thesis involves the development of technologies for space exploration missions. The student should have a background in aerospace engineering.', '2024-10-31', 'MSc', 'Mechanical Engineering'),('000003e8-8169-21ee-8a00-325096b39f47', 'Advanced Robotics for Manufacturing', 'p108', 'Maria Romano, Tomasz Kowalski, Silvia Pereira', 'Robotics, Manufacturing', 'Research', 'G31, G32', 'Investigate advanced robotics applications in manufacturing.', 'Robotics and manufacturing knowledge', 'This thesis involves the investigation of advanced robotics applications in manufacturing. The student should have knowledge in robotics and manufacturing.', '2024-10-31', 'BSc', 'Electrical Engineering'),('000003e8-8169-21ee-9900-325096b39f47', 'Environmental Impact of Renewable Energy', 'p110', '', 'Environmental Impact, Renewable Energy', 'Development', 'G41', 'Assess the environmental impact of renewable energy projects.', 'Environmental science background', 'This thesis focuses on assessing the environmental impact of renewable energy projects. The student should have a background in environmental science.', '2024-11-30', 'MSc', 'Civil Engineering'),('000003e8-8169-21ee-b501-325096b39f47', 'Autonomous Vehicles for Smart Cities', 'p101', 'Ji-hoon Lee', 'Autonomous Vehicles, Smart Cities', 'Research', 'G13', 'Investigate the implementation of autonomous vehicles in smart city environments.', 'Urban planning and robotics knowledge', 'This thesis explores the integration of autonomous vehicles in smart city environments. The student should have knowledge in urban planning and robotics.', '2024-06-30', 'BSc', 'Electrical Engineering, Computer Engineering'),('000003e8-8169-21ee-b502-325096b39f47', 'IoT-based Water Quality Monitoring', 'p108', 'Maria Romano', 'IoT, Water Quality Monitoring', 'Development', 'G31, G32', 'Develop a system for monitoring water quality using IoT technologies.', 'Environmental engineering and IoT knowledge', 'This thesis focuses on the development of an IoT-based system for monitoring water quality. The student should have knowledge in environmental engineering and IoT.', '2024-09-30', 'MSc', 'Electrical Engineering, Civil Engineering'),('000003e8-8169-21ee-b503-325096b39f47', 'Human-Robot Collaboration in Manufacturing', 'p107', 'Federico Pascale', 'Human-Robot Collaboration, Manufacturing', 'Research', 'G22, G42', 'Investigate the possibilities and challenges of human-robot collaboration in manufacturing processes.', 'Robotics and manufacturing knowledge', 'This thesis involves the investigation of human-robot collaboration in manufacturing. The student should have knowledge in robotics and manufacturing.', '2024-07-31', 'BSc', 'Electrical Engineering, Mechanical Engineering'),('000003e8-8169-21ee-b504-325096b39f47', 'AI for Sustainable Agriculture', 'p101', 'Maria Romano', 'AI, Sustainable Agriculture', 'Research', 'G13, G32', 'Explore the application of AI in optimizing sustainable agriculture practices.', 'Agricultural science and AI knowledge', 'This thesis explores the application of AI in optimizing sustainable agriculture practices. The student should have knowledge in agricultural science and AI.', '2024-08-31', 'BSc', 'Computer Engineering, Civil Engineering'),('000003e8-8169-21ee-b505-325096b39f47', 'Renewable Energy for Remote Areas', 'p104', 'Cinzia Belluno', 'Renewable Energy, Remote Areas', 'Development', 'G21', 'Design and implement renewable energy solutions for remote and off-grid areas.', 'Knowledge in renewable energy systems', 'This thesis focuses on the design and implementation of renewable energy solutions for remote and off-grid areas. The student should have a good understanding of renewable energy systems.', '2024-10-31', 'MSc', 'Mechanical Engineering, Electrical Engineering'),('000003e8-8169-21ee-b506-325096b39f47', 'Cyber-Physical Systems in Digital Twins', 'p111', 'Roberto Marsala', 'Cyber-Physical Systems, Healthcare', 'Research', 'G11, G31', 'Investigate the integration of cyber-physical systems in digital twins applications.', 'Cyber-Physical Systems and healthcare knowledge', 'This thesis involves the investigation of the integration of cyber-physical systems in ditigal twins applications. The student should have knowledge in cyber-physical systems and digital infrastructure.', '2025-06-30', 'BSc', 'Computer Engineering, Civil Engineering'),('000003e8-8169-21ee-b507-325096b39f47', 'Advanced Materials for Aerospace Applications', 'p109', 'Maria Romano, Paolo Ricci', 'Advanced Materials, Aerospace Engineering', 'Development', 'G21, G22, G32', 'Explore and develop advanced materials for aerospace engineering applications.', 'Materials science and aerospace engineering knowledge', 'This thesis involves the exploration and development of advanced materials for aerospace engineering applications. The student should have knowledge in materials science and aerospace engineering.', '2024-11-30', 'MSc', 'Mechanical Engineering, Electrical Enginnering'),('000003e8-8169-21ee-b508-325096b39f47', 'Smart Grids for Sustainable Cities', 'p105', 'Francesca Moretti', 'Smart Grids, Sustainable Cities', 'Research', 'G32, G42', 'Study and implement smart grids for sustainable urban development.', 'Knowledge in renewable energy and smart grids', 'This thesis involves the study and implementation of smart grids for sustainable urban development. The student should have knowledge in renewable energy and smart grids.', '2024-09-30', 'BSc', 'Electrical Engineering, Civil Engineering'),('000003e8-8169-21ee-b509-325096b39f47', 'Data Analytics for Industrial Automation', 'p101', 'Ji-sung Park', 'Data Analytics, Industrial Automation', 'Development', 'G11, G13', 'Apply data analytics techniques to enhance industrial automation processes.', 'Data analytics and industrial automation knowledge', 'This thesis focuses on applying data analytics techniques to enhance industrial automation processes. The student should have knowledge in data analytics and industrial automation.', '2024-12-31', 'MSc', 'Electrical Engineering, Computer Engineering'),('000003e8-8169-21ee-b510-325096b39f47', 'Green Building Technologies', 'p107', '', 'Green Building, Construction', 'Research', 'G42', 'Investigate and implement green building technologies for sustainable construction.', 'Knowledge in green building technologies and construction', 'This thesis involves the investigation and implementation of green building technologies for sustainable construction. The student should have knowledge in green building technologies and construction.', '2024-10-31', 'BSc', 'Electrical Engineering, Civl Engineering'),('000003e8-8169-21ee-b511-325096b39f47', 'Biomedical Imaging Technologies', 'p101', 'Paolo Ricci', 'Biomedical Imaging, Medical Technology', 'Development', 'G13, G21', 'Develop and improve biomedical imaging technologies for medical diagnosis.', 'Biomedical engineering and imaging technology knowledge', 'This thesis focuses on the development and improvement of biomedical imaging technologies for medical diagnosis. The student should have knowledge in biomedical engineering and imaging technology.', '2025-03-31', 'MSc', 'Computer Engineering, Electrical Engineering'),('000003e8-8169-21ee-b512-325096b39f47', 'Autonomous Drones for Agricultural Monitoring', 'p110', 'Maryam Heydari', 'Autonomous Drones, Agriculture', 'Research', 'G22, G41', 'Explore the use of autonomous drones for monitoring and optimizing agricultural processes.', 'Agricultural science and drone technology knowledge', 'This thesis involves the exploration of the use of autonomous drones for monitoring and optimizing agricultural processes. The student should have knowledge in agricultural science and drone technology.', '2025-05-31', 'BSc', 'Civil Engineering, Mechanical Engineering');
INSERT INTO Department (cod_department) VALUES ('Electronics'),('Applied Science');
INSERT INTO group_dep (id,cod_department) VALUES ('G26','Electronics'),('G27','Applied Science');
INSERT INTO Teacher (id, surname, name, email, cod_group, cod_department) VALUES ('p201','Pauli','Juan Stefano','p201@example.com','G26','Electronics'),('p202','Saracco','Giulia','p202@example.com','G27','Applied Science');
INSERT INTO Student (id, surname, name, gender, nationality, email, cod_degree, enrollment_year) VALUES('s600001','Moss','Elmo','Male','American','s600001@example.com','ENG1','2024'),('s600002','Woods','Brian','Male','English','s600002@example.com','ENG1','2023');
-- CAREERS
-- Computer Engineering (ENG1) Career for John Davis (s654140)
INSERT INTO Career (student_id, cod_course, title_course, cfu, grade, date) VALUES ('s654140', 'ICCS01', 'Introduction to Computer Systems', 6, 30, '2020-01-10'),   ('s654140', 'DLDC02', 'Digital Logic Design', 6, 25, '2020-09-01'),    ('s654140', 'DSAL03', 'Data Structures and Algorithms', 10, 30, '2020-10-15'),    ('s654140', 'CNWK04', 'Computer Networks', 8, 26, '2020-02-20'),    ('s654140', 'OSYS05', 'Operating Systems', 8, 24, '2021-06-01'),    ('s654140', 'SEPR06', 'Software Engineering Principles', 6, 27, '2020-06-15'),    ('s654140', 'AIFU07', 'Artificial Intelligence Fundamentals', 6, 30, '2021-01-10'),    ('s654140', 'DBMS08', 'Database Management Systems', 10, 26, '2021-02-20'),    ('s654140', 'WDT09', 'Web Development Technologies', 8, 24, '2022-06-01'),    ('s654140', 'ESDS10', 'Embedded Systems Design', 6, 23, '2022-09-15'),    ('s654140', 'CYFD11', 'Cybersecurity Fundamentals', 6, 19, '2022-09-15'),    ('s654140', 'CGV12', 'Computer Graphics and Visualization', 8, 30, '2023-01-10');
-- Mechanical Engineering (ENG2) Career for Alice Rossi (s634020)
INSERT INTO Career (student_id, cod_course, title_course, cfu, grade, date) VALUES ('s634020', 'THHT01', 'Thermodynamics and Heat Transfer', 8, 27, '2021-09-01'),    ('s634020', 'FLME02', 'Fluid Mechanics', 6, 29, '2021-10-15'),    ('s634020', 'MACH03', 'Machine Design', 10, 26, '2021-10-15'),    ('s634020', 'DOMA04', 'Dynamics of Machinery', 6, 19, '2021-07-01'),    ('s634020', 'MSEN05', 'Materials Science for Engineers', 8, 30, '2021-07-01'),    ('s634020', 'CSME06', 'Control Systems in Mechanical Engineering', 8, 27, '2021-01-10'),    ('s634020', 'RETE07', 'Renewable Energy Technologies', 8, 25, '2022-01-10'),    ('s634020', 'ROBA08', 'Robotics and Automation', 10, 24, '2022-06-15'),    ('s634020', 'AUTO09', 'Automotive Engineering', 8, 25, '2022-01-10'),    ('s634020', 'AMAP10', 'Advanced Manufacturing Processes', 6, 22, '2022-09-15'),    ('s634020', 'SAME11', 'Structural Analysis for Mechanical Engineers', 6, 23, '2022-09-15'),    ('s634020', 'AEPP12', 'Aerospace Engineering Principles', 8, 29, '2023-02-20');
-- Computer Engineering (ENG1) Career for Michele Bruni (s637721)
INSERT INTO Career (student_id, cod_course, title_course, cfu, grade, date) VALUES ('s637721', 'ICCS01', 'Introduction to Computer Systems', 6, 28, '2019-01-10'),    ('s637721', 'DLDC02', 'Digital Logic Design', 6, 24, '2019-09-01'),    ('s637721', 'DSAL03', 'Data Structures and Algorithms', 10, 30, '2019-10-15'),    ('s637721', 'CNWK04', 'Computer Networks', 8, 27, '2019-02-20'),    ('s637721', 'OSYS05', 'Operating Systems', 8, 26, '2020-06-01'),    ('s637721', 'SEPR06', 'Software Engineering Principles', 6, 23, '2020-09-15'),    ('s637721', 'AIFU07', 'Artificial Intelligence Fundamentals', 6, 30, '2020-01-10'),    ('s637721', 'DBMS08', 'Database Management Systems', 10, 28, '2020-10-15'),    ('s637721', 'WDT09', 'Web Development Technologies', 8, 24, '2021-06-01'),    ('s637721', 'ESDS10', 'Embedded Systems Design', 6, 22, '2021-09-15'),    ('s637721', 'CYFD11', 'Cybersecurity Fundamentals', 6, 27, '2021-01-10'),    ('s637721', 'CGV12', 'Computer Graphics and Visualization', 8, 26, '2022-02-20');
-- Mechanical Engineering (ENG2) Career for Emily Freeman (s654533)
INSERT INTO Career (student_id, cod_course, title_course, cfu, grade, date) VALUES ('s654533', 'THHT01', 'Thermodynamics and Heat Transfer', 8, 30, '2022-09-01'),    ('s654533', 'FLME02', 'Fluid Mechanics', 6, 30, '2022-02-20'),    ('s654533', 'MACH03', 'Machine Design', 10, 29, '2022-10-15'),    ('s654533', 'DOMA04', 'Dynamics of Machinery', 6, 24, '2022-07-01'),    ('s654533', 'MSEN05', 'Materials Science for Engineers', 8, 30, '2023-01-10'),    ('s654533', 'CSME06', 'Control Systems in Mechanical Engineering', 8, 27, '2023-02-20'),    ('s654533', 'RETE07', 'Renewable Energy Technologies', 8, 30, '2023-09-15'),    ('s654533', 'ROBA08', 'Robotics and Automation', 10, 30, '2023-10-15'),    ('s654533', 'AUTO09', 'Automotive Engineering', 8, 28, '2023-07-01'),    ('s654533', 'AMAP10', 'Advanced Manufacturing Processes', 6, 30, '2024-01-10'),    ('s654533', 'SAME11', 'Structural Analysis for Mechanical Engineers', 6, 30, '2024-02-20'),    ('s654533', 'AEPP12', 'Aerospace Engineering Principles', 8, 27, '2024-09-15');
-- Electrical Engineering (ENG3) Career for Christopher Martinez (s634511)
INSERT INTO Career (student_id, cod_course, title_course, cfu, grade, date) VALUES ('s634511', 'CAEE01', 'Circuit Analysis and Electronics', 8, 26, '2020-09-01'),    ('s634511', 'DSPR02', 'Digital Signal Processing', 6, 27, '2020-10-15'),    ('s634511', 'PSEN03', 'Power Systems Engineering', 10, 25, '2020-10-15'),    ('s634511', 'COMS04', 'Communication Systems', 8, 24, '2020-02-20'),    ('s634511', 'VLSD05', 'VLSI Design', 10, 29, '2021-06-01'),    ('s634511', 'EFWW06', 'Electromagnetic Fields and Waves', 6, 23, '2021-09-15'),    ('s634511', 'RESY07', 'Renewable Energy Systems', 6, 30, '2021-01-10'),    ('s634511', 'CSEE08', 'Control Systems in Electrical Engineering', 10, 28, '2021-10-15'),    ('s634511', 'NEQC09', 'Nanoelectronics and Quantum Computing', 10, 30, '2022-02-20'),    ('s634511', 'POPT10', 'Photonics and Optoelectronics', 10, 25, '2022-09-15'),    ('s634511', 'IOTA11', 'Internet of Things (IoT) Applications', 6, 20, '2022-06-01'),    ('s634511', 'WNMC12', 'Wireless Networks and Mobile Computing', 6, 24, '2023-01-10');
-- Electrical Engineering (ENG3) Career for Sophia Anderson (s655900)
INSERT INTO Career (student_id, cod_course, title_course, cfu, grade, date) VALUES ('s655900', 'CAEE01', 'Circuit Analysis and Electronics', 8, 24, '2018-09-01'),    ('s655900', 'DSPR02', 'Digital Signal Processing', 6, 30, '2018-10-15'),    ('s655900', 'PSEN03', 'Power Systems Engineering', 10, 27, '2018-10-15'),    ('s655900', 'COMS04', 'Communication Systems', 8, 22, '2018-02-20'),    ('s655900', 'VLSD05', 'VLSI Design', 10, 23, '2019-06-01'),    ('s655900', 'EFWW06', 'Electromagnetic Fields and Waves', 6, 29, '2019-09-15'),    ('s655900', 'RESY07', 'Renewable Energy Systems', 6, 23, '2019-01-10'),    ('s655900', 'CSEE08', 'Control Systems in Electrical Engineering', 30, 28, '2019-10-15'),    ('s655900', 'NEQC09', 'Nanoelectronics and Quantum Computing', 10, 30, '2020-02-20'),    ('s655900', 'POPT10', 'Photonics and Optoelectronics', 10, 27, '2020-09-15'),    ('s655900', 'IOTA11', 'Internet of Things (IoT) Applications', 6, 22, '2020-06-01'),    ('s655900', 'WNMC12', 'Wireless Networks and Mobile Computing', 6, 25, '2021-01-10');
-- Mechanical Engineering (ENG2) Career for Lothar Koch (s644145)
INSERT INTO Career (student_id, cod_course, title_course, cfu, grade, date) VALUES ('s644145', 'THHT01', 'Thermodynamics and Heat Transfer', 8, 26, '2021-09-01'),   ('s644145', 'FLME02', 'Fluid Mechanics', 6, 28, '2021-10-15'),   ('s644145', 'MACH03', 'Machine Design', 10, 27, '2021-07-01'),   ('s644145', 'DOMA04', 'Dynamics of Machinery', 8, 25, '2022-01-10'),   ('s644145', 'MSEN05', 'Materials Science for Engineers', 8, 29, '2022-06-15'),   ('s644145', 'CSME06', 'Control Systems in Mechanical Engineering', 6, 23, '2022-09-15'),   ('s644145', 'RETE07', 'Renewable Energy Technologies', 8, 22, '2023-01-10'),   ('s644145', 'ROBA08', 'Robotics and Automation', 10, 24, '2023-02-20'),   ('s644145', 'AUTO09', 'Automotive Engineering', 8, 28, '2023-06-01'),   ('s644145', 'AMAP10', 'Advanced Manufacturing Processes', 6, 26, '2023-07-15'),   ('s644145', 'SAME11', 'Structural Analysis for Mechanical Engineers', 8, 27, '2023-09-15'),   ('s644145', 'AEPP12', 'Aerospace Engineering Principles', 8, 25, '2024-01-10');
-- Civil Engineering (ENG4) Career for Olivia Rabiot (s644427)
INSERT INTO Career (student_id, cod_course, title_course, cfu, grade, date) VALUES ('s644427', 'STME01', 'Structural Mechanics', 8, 28, '2019-09-01'),   ('s644427', 'GTEC02', 'Geotechnical Engineering', 6, 27, '2019-10-15'),   ('s644427', 'ENVE03', 'Environmental Engineering', 10, 26, '2019-07-01'),   ('s644427', 'TREN04', 'Transportation Engineering', 8, 25, '2020-01-10'),   ('s644427', 'CPMG05', 'Construction Project Management', 8, 29, '2020-06-15'),   ('s644427', 'HYEN06', 'Hydraulic Engineering', 6, 24, '2020-09-15'),   ('s644427', 'UPAD07', 'Urban Planning and Design', 8, 22, '2021-02-20'),   ('s644427', 'STDY08', 'Structural Dynamics', 8, 26, '2021-06-01'),   ('s644427', 'SIDD09', 'Sustainable Infrastructure Development', 8, 27, '2021-07-15'),   ('s644427', 'EEEG10', 'Earthquake Engineering', 6, 28, '2021-09-15'),   ('s644427', 'BDMT11', 'Bridge Design and Maintenance', 6, 23, '2022-01-10'),   ('s644427', 'CMCE12', 'Computational Methods in Civil Engineering', 8, 22, '2022-06-15');

-- Applications made by student s654140 or to proposal of teacher p101, some 'pending' some 'declined'
INSERT INTO Application (id, student_id, proposal_id, status) VALUES ('da3b6f8c-d6f2-4b11-bbfc-71c412b35d3f', 's634020', '000003e8-8169-21ee-9b00-325096b39f47', 'pending'), ('40e5aa51-257d-4ae3-bcd2-c19ad80bf015', 's637721', '000003e8-8169-21ee-a500-325096b39f47', 'pending'),  ('8c098497-6838-4929-aaf2-7db148251636', 's654533', '000003e8-8169-21ee-a400-325096b39f47', 'pending'),  ('a4d00f64-c1c9-4c4b-bd05-1a4a6a59cc6e', 's634511', '000003e8-8169-21ee-9900-325096b39f47', 'pending'), ('9c14fb94-8427-4a7c-8a04-92f01a4d97f0', 's655900', '000003e8-8169-21ee-8a00-325096b39f47', 'pending'),  ('bdca0c1b-5ce9-47de-a5f8-990b4bf0773d', 's654140', '000003e8-8169-21ee-b511-325096b39f47', 'declined'), ('8a159070-7f9d-4e54-b576-77ea2e73fcdc', 's634020', '000003e8-8169-21ee-9400-325096b39f47', 'declined'), ('6d89c3ea-ff8a-4d98-b267-0e22a6d736c7', 's637721', '000003e8-8169-21ee-8000-325096b39f47', 'declined'), ('20f29e9b-0c19-4a18-a6ef-4a80e02e7835', 's634020', '000003e8-8169-21ee-b800-325096b39f47', 'pending'), ('15ec91e2-3db5-4c6d-8d74-0989ff30f0bf', 's634511', '000003e8-8169-21ee-b800-325096b39f47', 'pending'), ('2d1ff4cc-986e-45c9-b89b-92cf44cb9f7f', 's655900', '000003e8-8169-21ee-b800-325096b39f47', 'pending');

-- Some thesis requests
INSERT INTO Request (id, student_id, supervisor_id, co_supervisors, title, description, secretary_status, supervisor_status, start_date) VALUES ('f92b3e16-5291-44eb-ab6b-29d0ab97df9b', 's654140', 'p101', 'Luca Ferrari, Paolo Ricci', 'Smart Grid Integration for Renewable Energy Sources', 'Investigate optimal integration of renewable energy into power grids with a focus on advanced control strategies for stability.', 'pending', 'pending', null), ('4b5df289-5fa7-4d2e-84c6-dc9ebacb5cd0', 's655900', 'p103', '', 'Optimization of Additive Manufacturing Processes for Aerospace Components', 'Enhance efficiency and reliability of metal 3D printing for aerospace by optimizing process parameters and post-processing techniques.', 'pending', 'pending', null), ('da3b6f8c-d6f2-4b11-bbfc-71c412b35d3f', 's655900', 'p101', 'Hans Müller', 'Intelligent Transportation Systems for Urban Mobility', 'Develop a novel traffic management system using machine learning and IoT to optimize urban mobility, reduce congestion, and enhance traffic flow.', 'accepted', 'pending', null), ('000003e8-8169-21ee-b511-325096b39f47', 's634020', 'p101', '', 'Energy-Efficient Building Design', 'Explore sustainable architecture by integrating passive and active systems, leveraging renewables and smart tech for optimal energy efficiency.', 'accepted', 'pending', null);