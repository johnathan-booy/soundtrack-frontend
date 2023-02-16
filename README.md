# Capstone Two Proposal
## SoundTrack Academy
### Purpose  
The purpose of **SoundTrack Academy** is to address the major challenges faced by music teachers in keeping track of multiple students with diverse musical goals, practice habits, and curriculums. With this platform, teachers can easily log notes on each student's progress, communicate effectively with students and parents, and monitor their development over time. The app aims to streamline the process of music education, making it easier for teachers to provide personalized and effective instruction to each student. The emphasis on parental involvement in the student's progress is also a key aspect of this app, as research shows that parental involvement is crucial in promoting student success.

### Target Demographic  
The target demographic for SoundTrack Academy is primarily music teachers. The app is designed to support and aid music teachers in their teaching practices, and includes features that allow for better communication and insights between teacher and student.

### Platform
The initial launch of this app will be a web application, with a focus on building a robust backend to handle future growth. The goal is to eventually make it a cross-platform app, including mobile devices.

### Technology
| Component | Technology |
|-----------|------------|
| Backend   | Node.js with Express |
| Frontend  | React |
| Database  | PostgreSQL |
| Hosting   | AWS |
| Deployment| CI/CD (not chosen yet) |


### Data Overview
The app will require storing and processing three main sets of information: Musical Techniques, Terminology/Theory, and Repertoire, as well as data for Teachers and Students.

1. **Techniques**: A comprehensive database of core techniques, such as scales, triads, four-note chords, arpeggios, formula patterns, and more, available in all 12 major and minor keys and including beginner techniques for easy assignment of relevant practices.
2. **Repertoire**: Pieces added by the teachers, eventually including a database of sheet music.
3. **Teachers**: Information such as name, contact information, and teaching experience.
4. **Students**: Information such as name, contact information, skill level, and assigned techniques/repertoire.  

All the data will be internally generated and maintained, not taken from external APIs or sources.

### Features (MVP)
1. **Student Dashboard**: Allows teachers to access a student's account and view their current practice list (techniques and songs). During the lesson, teachers can take notes, rate student progress, and add new items for the student to work on.
2. **Progress Tracking**: Teachers can mark techniques as completed and receive a prompt to review. The review time can be customized, after which the technique reappears in the student's dashboard in the "Review" section.
3. **Technique Database**: The app includes a comprehensive database of core techniques, including scales, triads, four-note chords, arpeggios, formula patterns, and more, available in all 12 major and minor keys. The database also includes beginner techniques, such as five-note scales and easy chord patterns, making it easier for teachers to assign relevant and personalized practices to each student.
4. **Lesson Report**: At the end of each lesson, the application generates a report that includes progress on songs and techniques, and a list of items completed during the lesson.

### Future Development
1. **Student/Parent Access**: Giving students and/or parents access to their own accounts to see their progress, practice lists, and reports from lessons.
2. **Music Theory Quiz**: The application includes a fun section to test students' knowledge of music terminology and symbols. The teacher can choose the level of questions and verify if the student answers correctly. The results are logged in the student's notes, including questions missed and the proper answers.
3. **Music Library**: Adding a library of songs and sheet music that students can access, either to work on or as a resource for learning.
4. **Cross-platform Availability**: Making the web application accessible on multiple devices, including a mobile app for parents to download, providing greater flexibility and convenience for both teachers and parents to access and monitor student progress.
5. **Video/Audio Recording**: Allowing students to record themselves playing songs and techniques, and giving teachers the ability to leave audio/video feedback.
6. **Gamification**: Implementing gamification elements to encourage students to practice and stay engaged with the platform, such as earning rewards or badges for reaching certain milestones or mastering certain techniques.
7. **Data Analytics**: Providing teachers with insights and analytics on their students' progress and performance, such as tracking the students' practice time, areas of strength and weakness, and overall performance.
