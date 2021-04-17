package edu.brown.cs.student.coreachord.MatrixGenerators;

import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.CoreaApp.MatrixGenerator;
import edu.brown.cs.student.coreachord.CoreaApp.TransitionMatrix;

import java.util.HashMap;

/*
 * Our TransitionMatrixGenerator class, which creates custom matrices
 * according to the key center that the user decides.
 * It takes in a parameter of
 */
public class TransitionMatrixGenerator {
  /**
   * custom matrix based off of the key center.
   */
  private TransitionMatrix custommat;
  /**
   * diversity between low, medium, and high.
   */
  private CoreaApplication.Diversity currdiversity;
  /**
   * low transition matrix generator with a key center.
   */
  private LowDiversityGenerator lowdivgenerator;
  /**
   * medium transition matrix generator with a key center.
   */
  private MediumDiversityGenerator meddivgenerator;
  /**
   * high transition matrix generator with a key center.
   */
  private HighDiversityGenerator highdivgenerator;
  /**
   * Map of Diversity level to their matrix genrators.
   */
  private HashMap<CoreaApplication.Diversity, MatrixGenerator> divmap;

  /**
   * constructor takes in the user's selected diversity level.
   * @param diversity - How diverse the chords should be on a scale of low medium
   *                  and high
   */
  //
  public TransitionMatrixGenerator(CoreaApplication.Diversity diversity) {
    currdiversity = diversity; // set diversity
    divmap = new HashMap<>(); // create map
    setUpGenerators();
    divmap.put(CoreaApplication.Diversity.Low, lowdivgenerator); // map diversity to generator
    divmap.put(CoreaApplication.Diversity.Medium, meddivgenerator);
    divmap.put(CoreaApplication.Diversity.High, highdivgenerator);
  }

  /**
   * call the corresponding matrix generator's generateMatrix() method.
   * @return - the generated custom matrix
   */
  public TransitionMatrix createCustomMatrix() {
    TransitionMatrix outputmatrix = divmap.get(currdiversity).generateMatrix();
    return outputmatrix;
  }

  /**
   * helper method initializes all the matrix generators.
   */
  private void setUpGenerators() {
    lowdivgenerator = new LowDiversityGenerator();
    meddivgenerator = new MediumDiversityGenerator();
    highdivgenerator = new HighDiversityGenerator();
  }
}
