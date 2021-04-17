package edu.brown.cs.student.coreachord.MatrixGenerators;

import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.CoreaApp.MatrixGenerator;
import edu.brown.cs.student.coreachord.CoreaApp.TransitionMatrix;

/**
 * Generates high diversity matrix with a key center.
 */
public class HighDiversityGenerator implements MatrixGenerator {
  /**
   * Transition matrix for Medium Diversity.
   */
  private TransitionMatrix tmat;
  /**
   * Stores the probabilities of the transition matrix.
   */
  private double[][] matrix2d;
  /**
   * Total number of Qualities, ie., 4.
   */
  private final int numqualities = CoreaApplication.Quality.values().length;
  /**
   * Total number of Roots, ie., 12.
   */
  private final int numroots = CoreaApplication.Root.values().length;

  public HighDiversityGenerator() {
    tmat = new TransitionMatrix();
    matrix2d = tmat.getTransitionMatrix();
  }

  @Override
  public TransitionMatrix generateMatrix() { // implement this method with logic, rules
    for (int i = 0; i < numqualities * numroots; i++) { // row
      double[] currrow = matrix2d[i]; // current row to fill
      for (int j = 0; j < numqualities * numroots; i++) { // col
        double currentry = matrix2d[i][j]; // current "entry" to fill
        // some logic
      }
    }
    return null;
  }
}
