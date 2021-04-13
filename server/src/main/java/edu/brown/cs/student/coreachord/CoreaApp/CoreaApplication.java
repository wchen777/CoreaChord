package edu.brown.cs.student.coreachord.CoreaApp;

import edu.brown.cs.student.coreachord.REPL.Executable;

import java.util.List;
import java.util.Random;
import java.util.ArrayList;
import java.util.Set;
import java.util.EnumSet;
import java.util.Iterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CoreaApplication {
  public enum Quality { // 4 possible qualities
    MAJOR7, MINOR7, MINOR7FLAT5, DOMINANT7
  }
  public enum Root { // 12 possible roots
    C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  }
  public enum Diversity {
    Low, Medium, High
  }

  private static final int EIGHT_BARS = 8;
  private static final int SIXTEEN_BARS = 16;
  private static final int THIRTY_TWO_BARS = 32;

  private final int numqualities = Quality.values().length;

  private List<GeneratedChord> result;
  private List<Chord> stateSpace;
  private static final Random RAND = new Random();

  private TransitionMatrix lowDiversity;
  private TransitionMatrix mediumDiversity; // medium,
  private TransitionMatrix highDiversity; // high diversity matrices

  public CoreaApplication(TransitionMatrix lowDiversity) {
    // set transition matrices fields
    this.lowDiversity = lowDiversity;
    // TODO: initialize medium & high diversity matrices

    // populating Enum sets with all values in our enum definitions
    Set<Quality> qualityset = EnumSet.allOf(Quality.class);
    Set<Root> rootset = EnumSet.allOf(Root.class);
    // loop through sets, and add all possible chords to our state space
    Iterator<Quality> itr1 = qualityset.iterator();
    Iterator<Root> itr2 = rootset.iterator();
    List<Quality> qualities = new ArrayList<>();
    List<Root> roots = new ArrayList<>();
    while (itr2.hasNext()) { // root (c, d, etc.)
      roots.add(itr2.next()); // add all elements to list
    }
    while (itr1.hasNext()) { // quality (major, minor...)
      qualities.add(itr1.next());
    }
    stateSpace = new ArrayList<>();
    // ... now add everything to state space using a double for loop!
    for (Root nextroot : roots) { // root
      for (Quality nextquality : qualities) { // quality
        stateSpace.add(new Chord(nextroot, nextquality));
      }
    }
  }

  /**
   * An algorithmic method that will generate a random set of chords
   * using a random walk on the Markov Chain.
   *
   * @param startingchord starting chord
   * @param numbars number of bars
   *
   */
  public void generateChords(Chord startingchord, int numbars, Diversity diversityLevel) {
    if (!(numbars == EIGHT_BARS) && !(numbars == SIXTEEN_BARS) && !(numbars == THIRTY_TWO_BARS)) {
      result = new ArrayList<>();
      return; // check for specific inputs, if not one of those, return null.
    }
    TransitionMatrix matrix = lowDiversity;
    if (diversityLevel == Diversity.Low) {
      matrix = lowDiversity;
    } else if (diversityLevel == Diversity.Medium) {
      matrix = lowDiversity; // open low matrix for now
    } else if (diversityLevel == Diversity.High) {
      matrix = lowDiversity; // open low matrix for now
    }
    result = this.markovChain(startingchord, numbars, matrix); // call helper method
  }

  private List<GeneratedChord> markovChain(Chord startingchord, int numbars, TransitionMatrix matrix) {
    ArrayList<GeneratedChord> chordProgression = new ArrayList<>();
    int n = stateSpace.size(); // all possible chord outcomes

    // TODO: need to check the null case for starting chord,
    //  generate a random chord as starting chord if it is null, this should be handled in front end

    // accumulated length to keep track of how much we have generated so far
    int accumulatedLength = 0;

    // first iteration with specified chord
    Chord currchord = startingchord;
    int currlength = getNextChordLength(accumulatedLength, numbars);
    GeneratedChord currgenchord = new GeneratedChord(currchord, currlength);
    accumulatedLength += currlength;
    chordProgression.add(currgenchord);

    // random walk on markov chain with weights
    while (accumulatedLength < numbars) {

      int generatedLength = getNextChordLength(accumulatedLength, numbars);

      // number of possible qualities from Quality enum.
      int currrowstart = currchord.getRoot().ordinal() * numqualities; // start from 0

      // get the next chord index based on the current chord
      int nextchordindex = this.nextChordFromQualityCase(matrix, currchord, currrowstart);

      // update currchord
      currchord = TransitionMatrix.getCorrespondingChord(nextchordindex, numqualities);
      currgenchord = new GeneratedChord(currchord, generatedLength); // update currgenchord

      // add to the progression
      chordProgression.add(currgenchord);

      // update length
      accumulatedLength += generatedLength;
    }
    System.out.println(accumulatedLength);
    return chordProgression;
  }

  /**
   * helper function to get the random length of either 1 or 2 bars,
   * taking into account what is left to generated,
   * weighting 1 bar higher than 2 bars (1 bar chords occur more frequently).
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

  /*
   * Below are some helper methods for handling the random walk on markov chain.
   */

  /**
   * generate the next chord index.
   * @param tmat
   * @param currchord
   * @param currrowstart
   * @return
   */
  private int nextChordFromQualityCase(TransitionMatrix tmat, Chord currchord, int currrowstart) {
    // given current starting chord and its respective root number
    // get the corresponding chord index value
    int currRow = currrowstart + currchord.getQuality().ordinal(); // figure out which row we're on
    return tmat.getNextChordIndex(currRow, numqualities); // return next chord index
  }

  /*
   * A helper method that randomly selects an index in a
   * particular given row.
   * (complete randomness) - initial implementation without weights
   */
  private int randomlySelectIndex(double[][] tmat, int row) {
    int numCols = tmat[row].length; // get number of columns
    return getRandomInt(numCols);
  }


  /*
   * Helper method that gets a random integer
   * in a range. (Uses Math.random())
   */
  public static int getRandomInt(int max) {
    return (int) Math.floor(Math.random() * max);
  }


  /**
   * Accessor method for resulting string list.
   * @return result (list of generated chords)
   */
  public List<GeneratedChord> getResult() {
    return result;
  }
}
