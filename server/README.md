# cs0320 Term Project 2021

## *(Initial Project Outline: official README for our finalized project is in the main repo directory)* 

### Team Members: *(including Strengths and Weaknesses)*

**Ashley Chung** *(CS Login hchung21; Github achung695; intro sequence: CS15/16)*<br>
*Strengths:* <br>
• Productive during morning hours<br>
• Designing UI, thinking about UX <br>
• Writing comprehensive tests<br>
• Adobe Photoshop, InDesign<br>
• Visual arts<br>
• Creativity<br>
*Weaknesses:* <br>
• Late night work sessions<br>
• Debugging<br>
• Being discouraged from time to time when I can’t solve a problem

**Erick Lerena** *(CS Login elerena; Github eirik64; intro sequence: CS17/18)*<br>
*Strengths:* <br>
• Productive in the evenings and towards the night<br>
• Have a good sense of how to flesh out designs for projects<br>
• Organized<br>
• Quick to adapt to new languages<br>
• Great at asking for help when necessary<br>
*Weaknesses:* <br>
• Productivity isn’t as high in the mornings<br>
• Thinking past surface level testing<br>
• I stubbornly try to break wall I come across in my code when it might be easier to find other approaches instead<br>
• Frontend: Not as much experience with HTML, CSS, JS


**Maxime Hendrikse Liu** *(CS Login mhendrik; Github maximehl; intro sequence: CS15/16)*<br>
*Strengths:*<br>
• Very productive during late nights<br>
• Front-end design: lots of experience with HTML, CSS, and JavaScript<br>
• Spark routes<br>
• Photoshop/Illustrator for graphic design/editing<br>
• Debugging<br>
• CheckStyle<br>
*Weaknesses:*<br>
• Often asleep until late in the mornings (around 11am)<br>
• Databases<br>
• Procrastination—but I’ll always make sure to get the work done<br>
• Being too caught up on style details<br>
• Not good at knowing when I need to ask for help


**Will Chen** (CS Login: wchen77; Github: when777; intro sequence: CS17/18)*<br>
*Strengths:*<br>
• Willing to grind and work long periods of time in order to get something to work<br>
• Knowledge of web application frameworks and tools and how to use them<br>
• Both frontend and backend<br>
• React<br>
• Picks up new technologies fast<br>
• Extensibility and design choices<br>
*Weaknesses:*<br>
• Low productivity during the day<br>
• Frequent naps and inconsistent working hours<br>
• Testing<br>
• Checkstyle<br>
• Freemarker<br>
• Procrastination<br>
• Gets frustrated easily when things don’t work 

## Project Idea(s):

### Idea 1 — CoreaChord
**Problem:**<br>
Many chord progression programs exist, but most only include basic chord progressions. There isn’t yet an application that creates complex, jazz-specific chord progressions algorithmically. Such an application would be valuable to people who play jazz or are interested in jazz theory.

**Features:**<br>
1 ) The main feature would be a **jazz chord progression generator:** given a number of bars, it generates a chord progression that fits into that number of bars while still following music theory rules and standards. This chord progression could then serve as a basis for a “lead sheet” (a simplified musical score).<br>
Because chords in music tend to lead into a certain set of other chords, we could represent chord progressions as a **stochastic process**, with each chord having a set of probabilities of going to a set of other chords representing its “neighbors.” This could be modelled with a **random walk on a Markov chain** (or some other application of graphs), with each node representing a chord and with each edge weighted with the probability of that chord leading to another. These probability weights would be fine-tuned to accurately model the tendencies of actual chord progressions (e.g. a G7 would have a higher probability of going to a Cm7).<br>
*Possible challenges:*<br>
• Determining the graph-based algorithm for building the chord progressions<br>
• Gathering the data and fine-tuning the model

2 ) A frontend that lets users **listen to the generated chord progression**, and **download it as a file**. Being able to listen to the chord progression is satisfying for the user and increases the fun-factor of the user experience. Users could also **sign up** and **save their generated chord progressions** to view later. User authentication could be handled through a service like Firebase, with chord progression data stored in a database. This would increase user personalization and allow reusability of our application. <br>
*Possible challenges:*<br>
• Ensuring that the generated individual chords sound “jazzy,” while the overall chord progressions still sound coherent<br>
• Integrating a music-generating API into our application (perhaps turning generated chords into MIDIs for the API to turn into audio, possibly using the Tonal.js)<br>
• Creating a generator for sheet music files that the users can download <br>
• Connecting Firebase or another user authentication service, to securely keep user data<br>
• Potentially complex user interface design with lots animations <br>
• Styling the generated chord progression output to look intuitive to musicians<br>
• Highlighting chords as they play

In brief, a user of the application would be able to:<br>
1 ) Select the number of bars (4, 8, 16, 32, etc.) that they want the program to generate<br>
2 ) Generate a chord progression <br>
3 ) Play the chord progression<br>
4 ) Register/login for an account using their email and a password<br>
5 ) Save their chord progression to their account and load it again later

Possible additional features: <br>
• Solo/jazz lick generation over a set 2-5-1 progression: this could be modelled similarly to the chord progression, or with a combinatorics problem like 0/1 knapsack. <br>
• Chord progression generation that builds on user-inputted starting chord(s), rather than entirely-random chord progression generation.<br>
• Loading in pre-defined chord progressions from famous songs or jazz standards for the program to play.

More challenging features:<br>
• A toggle bar to let users set different diversity levels of chord progression generation (high diversity = wide variety of chords and uncommon chord progressions, low diversity = limited range of chords and more standard/typical chord progressions)<br>
• Option to have chords stay in a certain key center

TA Approval (dlichen): Approved! Focus on the generation algorithm and make sure it's sufficiently complex.

### Idea 2 — MEWArt

**Problem:**<br>
There are many platforms online that facilitate sharing artwork, but there isn’t one unified platform for artists to showcase their work while also connecting with people who might want to request commissions (artists completing an individual’s artwork request for payment).<br>
Our project would design and implement an application for artists to upload and showcase their works and network with other artists, while other users can view their portfolios and request commissions.

**Features:**<br>
The main focus for this application is creating a platform to **upload** artwork, **view** others’ portfolios, and **navigate** through the platform to view different artists’ works. It will consist of pages displaying people’s artworks and artists’ home pages. So, main features of this project are the following:

1 ) Ability to upload and delete artworks (images) on the platform<br>
• *Possible challenges:* managing data storage for large numbers of high-quality images<br>
2 ) Intuitive user interface<br>
3 ) Ability for artists to design/customize their portfolio pages and how their artworks are displayed<br>
• This may include positioning, ordering, relative sizing of art, as well as setting other “themes” for the page background<br>
• *Possible challenges:* creating a platform where vastly-different page styles can all be rendered effectively<br>
4 ) Search functionality for users to search for portfolios based on author names, art medium, or tags<br>
• *Possible challenges:* creating search functionality that returns results in most-relevant order<br>
5 ) User profile and networking system (most likely using some sort of a graph)<br>
• Connection recommendations based on artists’ uploaded works, users’ frequently-viewed interests, or other data<br>
• Ability for users to connect with artists to begin the process of requesting commissions (though payments would be handled through the artist’s personal choice of external service)<br>
• *Possible challenges:* ethics concerns, developing/refining the algorithm for creating accurate recommendations, risks/challenges of creating a platform where users can message each other freely (considerations of how to handle reporting/blocking/banning)

Possible additional features:<br>
1 ) “Like” feature for portfolio/individual image postings<br>
2 ) “Save for later” feature for users to privately save references to artist portfolios they are interested in<br>
3 ) Ability for artists to link to external portfolio websites<br>
4 ) GIF support<br>
5 ) Zoom-in, zoom-out feature for each image<br>
6 ) Adaptive front-end design for use on mobile devices

The application will be able to efficiently communicate data between frontend and backend, have a nice, user-friendly user interface, and an ability to display artworks(images) in the highest quality possible.

TA Approval (dlichen): Rejected, not enough algorithmic complexity

### Idea 3 — Pathways @ Brown CS
**Problem:**<br>
The Brown CS concentration requirements and website can be very confusing or overwhelming, with large amounts of information and various sets of requirements for AB/ScB concentrators in varying class levels.<br>
An application to solve this problem could take all this information from the CS website and provide the user with a clear and concise front end that more clearly provides what information is relevant to the user. <br>
If the user decides to create an account with us, the user could input their class level, what degree and pathways they are pursuing, and which classes they have taken, and the application could provide short lists of required or suggested courses the user could consider in order to to complete their degree. If the user decides that they didn’t like the suggested courses they can decided to interact with our “courses interface” where they can toggle/checkoff courses they are interested in within the CS department and in real time they see updates at the top of the screen that notifies the user how close they are to completing the pathway they are pursuing. If they are satisfied with the courses they checked off, they could save this information to their account where they see the courses it takes to complete a particular pathway.<br>
If the application is effective, we could expand the scope to provide similar services for other concentrations outside of the CS department.

**Features:**<br>
• Our users could explore what courses would help them complete their degree by selecting classes they are interested in taking and in response, we would notify the user whether the course would count towards their degree and what requirement it fulfills<br>
• *Problems Addressed:* This would make the process of deciding what courses to take much simpler when you don’t have to cross check whether the courses you’re interested in can count toward your major. This also allows the user the freedom to explore what combination of courses in any given semester can count towards their degree.<br>
• As courses are added and removed, we also need to keep track of this in our application. For this we can create an administrative account for the CS Department where they can remove courses that are no longer offered and add courses.<br>
• Optional user login system

Possible additional features:<br>
• Using web scraping to keep information up to date<br>
• Gathering data from Critical Review to include in the website

*Possible challenges:*<br>
• Keeping the application up to date as course information/descriptions, concentration requirements, etc. are changed over time<br>
• Ethics and security concerns of handling user data

**User scenario:**<br>
The user (presumably a Brown CS Concentrator) visits our application and has the option to use the application as a guest user, or create an account and login in order to save information.

Users can then check off the Brown CS classes that they have taken or are interested in taking.

As they check off more and more courses, they see a tally that keeps track of the amount of courses they have expressed interest in and how many more courses they need to complete an AB degree. If they continue to check off more courses after completing an AB degree, we start keeping track of how many courses they need for an Sc.B. As the user checks and unchecks courses and is finally satisfied with the CS courses they want to take, they will be notified of whether the courses they picked satisfy a CS degree.

If the user creates an account, we can save this version of the courses they checked off in their account for future reference.

TA Approval (dlichen): Rejected, not enough algorithmic complexity.

No need to resubmit.
<br>

**Mentor TA:** Prithu Dasgupta (prithu_dasgupta@brown.edu)

## Meetings
_On your first meeting with your mentor TA, you should plan dates for at least the following meetings:_

**Specs, Mockup, and Design Meeting:** March 15, 6pm

**4-Way Checkpoint:** April 5, 6pm

**Adversary Checkpoint:** April 12, 8:30pm, with Nick Young

## How to Build and Run
_See the "How to Run" section in the README in the main repo directory!_
