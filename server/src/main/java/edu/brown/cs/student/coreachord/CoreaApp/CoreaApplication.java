package edu.brown.cs.student.coreachord.CoreaApp;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.EnumSet;
import java.util.Iterator;

/**
 * The main control center where our command goes to kick starts methods across
 * our repo to generate random chords of varying diversity levels.
 */
public class CoreaApplication {
  /**
   * 4 different types of qualities to a chord.
   */
  public enum Quality { // 4 possible qualities
    MAJOR7, MINOR7, MINOR7FLAT5, DOMINANT7
  }
  /**
   * The 12 unique keys of a keyboard make up our Roots.
   */
  public enum Root { // 12 possible roots
    C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  }
  /**
   * How diverse the random generated chords are.
   */
  public enum Diversity {
    Low, Medium, High
  }

  /**
   * How bright or dark the chord progression sounds.
   */
  public enum Brightness {
    Light, Regular, Dark
  }

  /**
   * 8 bars in a chord progression.
   */
  private static final int EIGHT_BARS = 8;
  /**
   * 16 bars in a chord progression.
   */
  private static final int SIXTEEN_BARS = 16;
  /**
   * 32 bars in a chord progression.
   */
  private static final int THIRTY_TWO_BARS = 32;
  /**
   * The number of qualities.
   */
  private static final int NUM_QUALITIES = Quality.values().length;

  /**
   * The final list of randomly generated chords.
   */
  private List<GeneratedChord> result;
  /**
   * List of very chord given our roots and qualities.
   */
  private List<Chord> stateSpace;
  /**
   * low div transition matrix.
   */
  private TransitionMatrix lowDiversity;
  /**
   * med div transition matrix.
   */
  private TransitionMatrix mediumDiversity; // medium,
  /**
   * high div transition matrix.
   */
  private TransitionMatrix highDiversity; // high diversity matrices

  /**
   * @param lowDiversity - low div transition matrix
   * @param medDiversity - med div transition matrix.
   * @param highDiversity - high div transition matrix.
   */
  public CoreaApplication(TransitionMatrix lowDiversity, TransitionMatrix medDiversity,
                          TransitionMatrix highDiversity) {
    // set transition matrices fields
    this.lowDiversity = lowDiversity;
    this.mediumDiversity = medDiversity;
    this.highDiversity = highDiversity;

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
   * @param diversityLevel between low/mid/high
   *
   */
  public void generateChords(Chord startingchord, int numbars, Diversity diversityLevel, Brightness brightness) {
    if (!(numbars == EIGHT_BARS) && !(numbars == SIXTEEN_BARS) && !(numbars == THIRTY_TWO_BARS)) {
      result = new ArrayList<>();
      return; // check for specific inputs, if not one of those, return null.
    }
    TransitionMatrix matrix = lowDiversity;
    if (diversityLevel == Diversity.Low) {
      matrix = lowDiversity;
    } else if (diversityLevel == Diversity.Medium) {
      matrix = mediumDiversity;
    } else if (diversityLevel == Diversity.High) {
      matrix = highDiversity;
    }
    if (brightness == Brightness.Light || brightness == Brightness.Dark) {
      matrix = this.adjustMatrixForBrightness(matrix, brightness); // adjust matrix weights if the theme is either light or dark.
    }
    result = this.markovChain(startingchord, numbars, matrix); // call helper method
  }

  /**
   * @param startingchord - The starting chord for the random walk
   * @param numbars - desired bars for the chord progression
   * @param matrix - the transition matrix
   * @return - list of randomly generated chords
   */
  private List<GeneratedChord> markovChain(Chord startingchord, int numbars,
                                           TransitionMatrix matrix) {
    ArrayList<GeneratedChord> chordProgression = new ArrayList<>();
    int n = stateSpace.size(); // all possible chord outcomes

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
      int currrowstart = currchord.getRoot().ordinal() * NUM_QUALITIES; // start from 0

      // get the next chord index based on the current chord
      int nextchordindex = this.nextChordFromQualityCase(matrix, currchord, currrowstart);

      // update currchord
      currchord = TransitionMatrix.getCorrespondingChord(nextchordindex, NUM_QUALITIES);
      currgenchord = new GeneratedChord(currchord, generatedLength); // update currgenchord

      // add to the progression
      chordProgression.add(currgenchord);

      // update length
      accumulatedLength += generatedLength;
    }
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
  @SuppressWarnings("checkstyle:MagicNumber")
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

  /**
   * Helper method for adjusting matrix weights based on the "brightness" of the chord progression
   * @param matrix
   */
  private TransitionMatrix adjustMatrixForBrightness(TransitionMatrix matrix, Brightness brightness) {
    double[][] transitionMat = matrix.getTransitionMatrix();
    int n = transitionMat.length; // square matrix, get one dimension.
    double[][] newMat = new double[n][n];
    // first pass, copy over weight values from original matrix
    for (int i = 0; i < n; ++i) {
      for (int j = 0; j < n; ++j) {
        newMat[i][j] = transitionMat[i][j]; // copy weight(s)
      }
    }

    if (brightness == Brightness.Light) {
      for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
          if (isBrightChord(j)) { // if it IS a bright chord
            newMat[i][j] = transitionMat[i][j] + 0.7;
          }
        }
        this.normalize(newMat[i]); // normalize if we're done with one row.
      }
    } else if (brightness == Brightness.Dark) {
      for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
          if (!isBrightChord(j)) { // if it is NOT a bright chord
            newMat[i][j] = transitionMat[i][j] + 0.7;
          }
        }
        this.normalize(newMat[i]); // normalize if we're done with one row.
      }
    }
    TransitionMatrix newtmat = new TransitionMatrix();
    newtmat.setTransitionMatrix(newMat);
    return newtmat;
  }
  /**
   * Helper method that normalizes the values of a ro.
   * It just mutates the inputted row, so nothing is returned.
   * @param row
   */
  private void normalize(double[] row) {
    int sum = 0;
    for (int i = 0; i < row.length; ++i) {
      sum += row[i];
    }
    float inverse = 1;
    if (sum > 1) {
      float floatsum = (float) sum;
      inverse = 1/floatsum;
    }
    for (int i = 0; i < row.length; ++i) {
      row[i] = row[i]/inverse;
    }
  }

  /**
   * Helper method that determines rather or not a column index
   * of the row is a bright chord or not.
   * @param index
   * @return boolean
   */
  private boolean isBrightChord(int index) {
    Integer[] brightchordarr = new Integer[] {8, 9, 10, 11, 16, 17, 18, 19, 28, 29, 30, 31,
    36, 37, 38, 39, 44, 45, 46, 47};
    List<Integer> brightchordarraylist = new ArrayList<>(Arrays.asList(brightchordarr));
    return brightchordarraylist.contains(index);
  }
  /*
   * Below are some helper methods for handling the random walk on markov chain.
   */

  /**
   * generate the next chord index.
   * @param tmat - the transition matrix
   * @param currchord - the current chord on our random walk
   * @param currrowstart - the row this chord lies in thee transition matrix
   * @return - the next chord index
   */
  private int nextChordFromQualityCase(TransitionMatrix tmat, Chord currchord, int currrowstart) {
    // given current starting chord and its respective root number
    // get the corresponding chord index value
    int currRow = currrowstart + currchord.getQuality().ordinal(); // figure out which row we're on
    return tmat.getNextChordIndex(currRow, NUM_QUALITIES); // return next chord index
  }

  /**
   * Accessor method for resulting string list.
   * @return result (list of generated chords)
   */
  public List<GeneratedChord> getResult() {
    return result;
  }
}
