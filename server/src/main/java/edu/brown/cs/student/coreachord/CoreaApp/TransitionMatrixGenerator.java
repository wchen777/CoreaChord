package edu.brown.cs.student.coreachord.CoreaApp;

import java.util.HashMap;

/*
 * Our TransitionMatrixGenerator class, which creates custom matrices
 * according to the key center that the user decides.
 * It takes in a parameter of
 */
public class TransitionMatrixGenerator {
  private TransitionMatrix custommat;
  private CoreaApplication.Diversity currdiversity;
  private LowDiversityGenerator lowdivgenerator;
  private MediumDiversityGenerator meddivgenerator;
  private HighDiversityGenerator highdivgenerator;
  private HashMap<CoreaApplication.Diversity, MatrixGenerator> divmap; // diversity map

  // constructor takes in the user's selected diversity level
  public TransitionMatrixGenerator(CoreaApplication.Diversity diversity) {
    currdiversity = diversity; // set diversity
    divmap = new HashMap<>(); // create map
    setUpGenerators();
    divmap.put(CoreaApplication.Diversity.Low, lowdivgenerator); // map diversity to generator
    divmap.put(CoreaApplication.Diversity.Medium, meddivgenerator);
    divmap.put(CoreaApplication.Diversity.High, highdivgenerator);
  }

  // call the corresponding matrix generator's generateMatrix() method.
  public TransitionMatrix createCustomMatrix() {
    TransitionMatrix outputmatrix = divmap.get(currdiversity).generateMatrix();
    return outputmatrix; // return the generated custom matrix
  }

  // helper method initializes all the matrix generators.
  private void setUpGenerators() {
    lowdivgenerator = new LowDiversityGenerator();
    meddivgenerator = new MediumDiversityGenerator();
    highdivgenerator = new HighDiversityGenerator();
  }
}
