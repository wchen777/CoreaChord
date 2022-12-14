# CoreaChord (backup for CS32 term project)<br>
Term Project for cs0320: Introduction to Software Engineering @ Brown University (2021 Spring)

### Team Members: Ashley Hee Won Chung, Erick Lerena, Maxime Hendrikse Liu, and Will Chen

## Why CoreaChord?

Many chord progression programs exist, but most include only the basic chord progressions, or they are hard to use because of their complicated UI.
So, we decided to create a useful, easy-to-use jazz chord progression generator, allowing users to become familiar with sounds of each distinctive chord and generate beautiful chord progressions.
“CoreaChord” is named after the late jazz fusion pioneer and legend Chick Corea, who passed away this year (2021).

## The Algorithm

We used a random walk on Markov Chain to generate a random chord progression that still sticks to the rules of music theory, which makes it sound nice and jazzy. To represent the graph, we create
a transition matrix with a state space of 48 possible chords (12 chord roots, 4 chord qualities), and fill the matrix with pre-set matrix weights that take conventions of music theory into account.
The exact matrix weights differ depending on which chord diversity level you choose, and for the high diversity matrix, we have used a mathematical equation similar to
that of a right-shifted sigmoid function, which was also squeezed to fit into a range of 0 and 1, inclusive (because the weights are probabilities). Then, we apply some normalization to make sure
that each row of the matrix adds up to one.

In addition, the "brightness" parameter controls the probabilities of sharp-friendly chords being selected. For example, the major chords of G, D, A, E, B are more likely to be selected if "light" option is chosen as the brightness parameter. The "dark" option increases all other chords' probability by a certain amount, and the "regular" option does not alter the matrix.

For selecting the next chord to go to, we used a concept called cumulative probability distribution, and implemented a binning method similar to that of numpy.digitize() in Python.
In this way, we take into account the probabilities of the previous chord's row in the matrix and select the next chord to go to accordingly.

The analyzer feature utilizes a circular array implementation for its two parts: the complexity score tracker and the jazz cadence detector. For the complexity score, it uses a sliding window to calculate a complexity score based on the circle of fifths for each window. The distance between each chord in the window is calculated using the distances from indices of the roots using a circular array representation of the circle of fifths. The jazz cadence detector similarly uses a sliding window to detect certain jazz cadences using the generated chord list and the numerical representation of the chords enums.

## Testing

For testing, due to the randomness of our outputs, we have used the Monte-Carlo simulation: repeated random sampling to generalize the ground truth probability.

## Computer Accessibility

We have many features that take into account the general accessibility of our program. We have tooltips for most buttons on our website with many of them being designed in an intuitive appearance,
and we also have a functionality like other music programs where if you press the space bar, you can automatically start and stop the audio. We have a night mode in addition to a regular version of our website
to help with reducing the eye strain when using our app. Also, we have an info button at the top right corner of the website that contains a brief explanation of what our program does. Lastly,
we have a functionality where each chord lights up as the audio is being played, which helps people recognize how fast the music is being played. Also, users can adjust the BPM of the chord progression, which allows them
to control how fast the audio is played.

## Division of Labor

• Ashley - Backend coding and design: implementing the Markov Chain chord generation algorithm, designing the general structure of the backend code including interfaces<br>
• Erick - Backend coding and design: integrating past code, implementing REPL, systems/unit testing, and high-diversity matrix design<br>
• Maxime - Frontend design: including rendering, playing, and downloading chord progressions on the webpage<br>
• Will - Frontend design: including general logic, Firebase authentication and database connection, creating transition matrices and chord voicing mappings, and additional features in the backend<br>

## How to Run
1. Open two shell windows and navigate to the ``server`` subdirectory in one and the ``client`` subdirectory in the other.
2. In the ``server`` directory, run ``mvn package``
3. In the ``client`` directory, run ``npm install``
4. In the ``server`` directory, run ``./run --gui`` to start the server
5. In the ``client`` directory, run ``npm start`` to start the frontend at ``localhost:3000``
