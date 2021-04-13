package edu.brown.cs.student.coreachord;

import edu.brown.cs.student.coreachord.CoreaApp.TransitionMatrix;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class TransitionMatrixTest {
  private TransitionMatrix tmat1;
  private TransitionMatrix tmat2;
  private TransitionMatrix tmat3;

  private List<String[]> probs1; // 5x5
  private List<String[]> probs2; // 7x7
  private List<String[]> probs3; // 10x10

  @Before
  public void setUp() { // initialize

  }

  @After
  public void tearDown() {

  }

  @Test
  public void testInitialization() {

  }

  private void setUpProbabilityList() {
    probs1 = new ArrayList<>();
    probs2 = new ArrayList<>();
    probs3 = new ArrayList<>();
    // make 5x5 matrix for probs1 list
//    probs1.add([0.0, 0.0, 0.0, 0.0, 0.0]); // adding probabilities
  }
}
