package edu.brown.cs.student.coreachord.CoreaApp;

import edu.brown.cs.student.coreachord.UtilityObjects.Tuple;

import java.util.ArrayList;
import java.util.List;

/**
 * A representation of a transition matrix. Supports methods to randomly pick
 * out the next chord in the transition matrix.
 */
public class TransitionMatrix {
  /**
   * transition matrix.
   */
  private double[][] tmat;

  /**
   * @param probabilities the transition matrix read in from the csv file
   */
  public TransitionMatrix(List<String[]> probabilities) {
    this.fillTransitionMatrix(probabilities);
  }

  // for dynamic transition matrix, different constructor
  public TransitionMatrix() {
  }

  /**
   * @param probabilities - transition matrix
   */
  /*
   * Method for filling transition matrix.
   * It'll take in a list of array of strings that contain
   * probability data for each row of the transition matrix.
   * The probabilities list of string arrays come from
   * csv parsing.
   * @param
   */
  private void fillTransitionMatrix(List<String[]> probabilities) {
    // get lengths of dimensions of probability matrix
    int horizontallen = probabilities.get(0).length;
    int verticallen = probabilities.size();
    // initialize transition matrix
    this.tmat = new double[verticallen - 1][horizontallen - 1];

    for (int i = 1; i < verticallen; i++) {
      for (int j = 1; j < horizontallen; j++) {
        // get individual probability
        String currprobstring = probabilities.get(i)[j];
        // store into each index of tmat
        this.tmat[i - 1][j - 1] = Double.parseDouble(currprobstring);
      }
    }
  }


  /**
   * Helper method that gives you corresponding chord
   * based on the index in transition matrix.
   * (Handles chord-index correspondence in the transition
   * matrix)
   *
   * @param index - index of the chord in its 2d transition matrix
   * @param numqualities - Number of qualities a chord can have
   * @return - corresponding Chord at that index
   */
  public static Chord getCorrespondingChord(int index, int numqualities) {
    // Root order: C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    // Quality order: MAJOR7, MINOR7, MINOR7FLAT5, DOMINANT7
    int rootordinal = index / numqualities; // integer division to get root ordinal
    int qualityordinal = index % numqualities; // mod to get quality ordinal (get remainder)
    CoreaApplication.Root root = CoreaApplication.Root.values()[rootordinal];
    CoreaApplication.Quality quality = CoreaApplication.Quality.values()[qualityordinal];
    return new Chord(root, quality);
  }

  /**
   * @param row - row of the current chord with its associated probabilities
   *            to the next chord
   * @param numQualities - the number of qualities applied in this project
   * @return - index oof thee next randomly generated chord
   */
  /*
   * Explanation:
   *
   * This selection method is a helper method that selects the
   * next chord to go to (selects the column in the transition matrix)
   * while taking into account the probability distribution for a given row.
   *
   * The way this method is implemented is that it makes use of the concept of
   * "cumulative probability distribution" in probability theory, which
   * weighs the higher probability index more than the other ones.
   *
   * We first initialize a cumulative probability distribution array,
   * populate the array with the current row's probability information,
   * and index into that array using a randomly initialized double in [0,1)
   * (the result of this search will be our newly selected chord value).
   *
   * Then, we look for that probability value in our original row in transition matrix.
   * The column index that contains that probability value will be indicating
   * our next chord to go to.
   *
   */
  public int getNextChordIndex(int row, int numQualities) {
    if (this.tmat == null) {
      return -1;
    }

    Chord currchord = TransitionMatrix.getCorrespondingChord(row, numQualities);
    // cumulative probability distribution matrix
    int rowlen = this.tmat[0].length; // row's length
    double[] currrow = this.tmat[row]; // get current row (current chord).

    List<Tuple<Double, Integer>> cumulativeDist = new ArrayList<>();

    double cumulative = 0;
    for (int i = 0; i < rowlen; i++) {
      double curr = tmat[row][i];
      // skips zero probabilities
      if (curr > 0) {
        cumulative += curr; // sum up as we iterate through the current row.
        // double cumulative distribution to row index
        cumulativeDist.add(new Tuple<>(cumulative, i));
      }
    }

    // get index from probability distribution
    return digitize(cumulativeDist, 1.0);
  }

  /**
   * binning with a cumulative distribution array.
   *
   * @param cumulativeDist - monotonically increasing array where the final
   *                       value should equal 1, representing cumulative distribution
   * @param sumOfProbabbilities -
   * @return - the random index given the weights of the array
   */
  public int digitize(List<Tuple<Double, Integer>> cumulativeDist, double sumOfProbabbilities) {
    double rand = Math.random() * sumOfProbabbilities;

    for (Tuple<Double, Integer> probToIndex : cumulativeDist) {
      // if generated value is less than the probability cumulative distribution
      if (rand <= probToIndex.getField1()) {
        // return index of that
        return probToIndex.getField2();
      }
    }
    // error, we reached the end of the list without return indices
    return -1;
  }

  /**
   * return 0 if tMat is uninitialized, otherwise return tMat's length (how many rows).
   *
   * @return - length of tMat.
   */
  public int getNumChords() {
    return this.tmat == null ? 0 : tmat.length;
  }

  /**
   * @return - the instance variable tMat.
   */
  public double[][] getTransitionMatrix() {
    return this.tmat;
  }
}
