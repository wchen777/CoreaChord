package edu.brown.cs.student.coreachord.CoreaApp;

import org.checkerframework.checker.units.qual.A;

import java.lang.reflect.Array;
import java.util.*;

public class CoreaApplication {
  public enum Quality { // 4 possible qualities
    MAJOR7, MINOR7, MINOR7FLAT5, DOMINANT7
  }
  public enum Root { // 12 possible roots
    C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  }

  private List<GeneratedChord> result;

  private static final Random RAND = new Random();

  public CoreaApplication(Chord startingchord, int numbars) {
    /* TODO: do we need to have the constructor taking in values? I think we should be using this class as a driver for the
        generateChords method, unless this is for testing, otherwise the class would be inflexible to generating new chords
    */
    result = this.generateChords(startingchord, numbars);
    // convert list of gen chord to list of strings.
  }

  /**
   * An algorithmic method that will generate a random set of chords
   * using a random walk on the Markov Chain.
   *
   * @param startingchord starting chord
   * @param numbars number of bars
   * @return list of generated chord(s)
   */
  private List<GeneratedChord> generateChords(Chord startingchord, int numbars) {
    if (!(numbars == 8) && !(numbars == 16) && !(numbars == 32)) {
      return null; // check for specific inputs, if not one of those, return null.
    }
    return this.markovChain(startingchord, numbars); // call helper method
  }

  private List<GeneratedChord> markovChain(Chord startingchord, int numbars) {

    // TODO: move this to constructor so we do not have to reinitialize?
    ArrayList<Chord> stateSpace = new ArrayList<>();
    // populating Enum sets with all values in our enum definitions
    Set<Quality> qualityset = EnumSet.allOf(Quality.class);
    Set<Root> rootset = EnumSet.allOf(Root.class);
    // loop through sets, and add all possible chords to our state space
    Iterator<Quality> itr1 = qualityset.iterator();
    Iterator<Root> itr2 = rootset.iterator();
    ArrayList<Quality> qualist = new ArrayList<>();
    ArrayList<Root> rootlist = new ArrayList<>();
    while (itr2.hasNext()) { // root (c, d, etc.)
      rootlist.add(itr2.next()); // add all elements to list
    }
    while (itr1.hasNext()) { // quality (major, minor...)
      qualist.add(itr1.next());
    }
    // ... now add everything to state space using a double for loop!
    for (int i = 0; i < rootlist.size(); i++) { // root
      Root nextroot = rootlist.get(i);
      for (int j = 0; j < qualist.size(); j++) { // quality
        Quality nextquality = qualist.get(j);
        stateSpace.add(new Chord(nextroot, nextquality));
      }
    }

    ArrayList<GeneratedChord> chordProgression = new ArrayList<>();
    int n = stateSpace.size(); // all possible chord outcomes
    int[][] transitionMatrix = new int[n][n];
    this.fillTransitionMatrix(transitionMatrix);


//    int i = 0;
    // TODO: need to check the null case for starting chord, generate a random chord as starting chord if it is null

    Chord currchord = startingchord;
    double currlength = Math.random() * 10; // how do we handle length? (discuss w teammates)
    GeneratedChord currgenchord = new GeneratedChord(currchord, currlength);

    // accumulated length to keep track of how much we have generated so far
    int accumulatedLength = 0;

    // TODO: here is how i envisioned the length mechanic working

    // random walk on markov chain with weights
    while (accumulatedLength < numbars) {

      int generatedLength = getNextChordLength(accumulatedLength, numbars);

      int numqualities = qualist.size(); // number of possible qualities from Quality enum.
      int currrowstart = currchord.getRoot().ordinal() * numqualities; // start from 0

      // add to the progression
      // TODO: I think this fits better inside the while loop rather than obscured in a helper
      chordProgression.add(currgenchord);

      // get the next chord index based on the current chord
      int nextchordindex = this.handleEachQualityCase(transitionMatrix, currchord, currrowstart);


      currchord = this.getCorrespondingChord(transitionMatrix, nextchordindex, numqualities); // update currchord
      currgenchord = new GeneratedChord(currchord, generatedLength); // update currgenchord

      // update length?
      accumulatedLength += generatedLength;
      // increment i
      // i++

    }
    return chordProgression;
  }

  /**
   * helper function to get the random length of either 1 or 2 bars,
   * taking into account what is left to generated,
   * weighting 1 bar higher than 2 bars (1 bar chords occur more frequently)
   * @param accumulatedLength - how many bars we have already generated
   * @param numBars - limit of number of bars
   * @return - 1 or 2
   */
  public int getNextChordLength(int accumulatedLength, int numBars) {
    // 70% change of length 1 bar chord, 30% of length 2 bar
    double thresholdRange = 0.7;

    if (accumulatedLength == numBars - 2) {
      // if we are 2 away from the max value generate a length of 2 to fill in the rest
      return 2;
    } else if (accumulatedLength == numBars - 1) {
      // if we are 1 away from the max value generate a length of 1 to fill in the rest
      return 1;
    } else {
      // otherwise generate either 1 or 2 measures,
      // weighted prob based on threshold
      return Math.random() > thresholdRange ? 2 : 1;
    }

  }

  private void fillTransitionMatrix(int[][] tmat) {
    int horizontallen = tmat[0].length;
    int verticallen = tmat.length;

    double maxProbability = Integer.MAX_VALUE; // java maximum int.

    // here, I will fill the given transition matrix.
  }

  /*
   * Below are some helper methods for handling the random walk on markov chain.
   */

  /**
   * generate the next chord index
   * @param tmat
   * @param currchord
   * @param currrowstart
   * @return
   */
  private int handleEachQualityCase(int[][] tmat, Chord currchord, int currrowstart) {
    int currow = currrowstart + currchord.getQuality().ordinal(); // figure out which row we're on
    int nextchordindex = this.randomlySelectIndex(tmat, currow);
    double probability = tmat[currow][nextchordindex]; // probability (?)
    return nextchordindex; // return next chord index
  }

  /*
   * A helper method that randomly selects an index in a
   * particular given row.
   * (complete randomness)
   */
  private int randomlySelectIndex(int[][] tmat, int row) {
    int numCols = tmat[row].length; // get number of columns
    return this.getRandomInt(numCols);
  }

  /*
   * This selection method is a helper method that selects the
   * next chord to go to (selects the column in the transition matrix)
   * while taking into account the probability distribution for a given row.
   *
   * The way this method is implemented is that it makes use of the concept of
   * cumulative probability distribution in probability theory, which
   * weighs the higher probability index more than the other ones.
   *
   * We first initialize a cumulative probability distribution matrix.
   * populate the array with the current row's probability information,
   * and do a binary search on that array with a randomly initialized double in [0,1)
   * (the result of the search will be our newly selected probability value).
   *
   * Then, we look for that probability value in our original row in transition matrix.
   * The column index that contains that probability value will be indicating
   * our next chord to go to.
   */
  private int selectIndexBasedOnWeights(int[][] tmat, int row, ArrayList<Quality> qualist) {
    Chord currchord = this.getCorrespondingChord(tmat, row, qualist.size());
    // cumulative probability distribution matrix
    int[] cpdmatrix = new int[tmat[0].length]; // array as long as one row
    return 0;
  }
  /*
   * Helper method that gets a random integer
   * within a range. (Uses Math.random())
   */
  private int getRandomInt(int max) {
    return (int) Math.floor(Math.random() * max);
  }

  /**
   * Helper method that gives you corresponding chord
   * based on the index in transition matrix.
   * (Handles chord-index correspondence in the transition
   * matrix)
   * @param index
   * @return correspoinding Chord
   */
  private Chord getCorrespondingChord(int[][] tmat, int index, int numqualities) {
    // Root order: C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    // Quality order: MAJOR7, MINOR7, MINOR7FLAT5, DOMINANT7
    int rootordinal = index / numqualities; // integer division to get root ordinal
    int qualityordinal = index % numqualities; // mod to get quality ordinal (get remainder)
    Root root = Root.values()[rootordinal];
    Quality quality = Quality.values()[qualityordinal];
    Chord nextchord = new Chord(root, quality);
    return nextchord;
  }

  /**
   * Accessor method for resulting string list
   * @return result (list of generated chords)
   */
  public List<GeneratedChord> getResult() {
    return result;
  }
}
