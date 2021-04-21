package edu.brown.cs.student.coreachord;

import edu.brown.cs.student.coreachord.CSV.CSVReader;
import edu.brown.cs.student.coreachord.CoreaApp.Chord;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.CoreaApp.TransitionMatrix;
import edu.brown.cs.student.coreachord.UtilityObjects.Tuple;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

public class TransitionMatrixTest {
  private TransitionMatrix tmat1;
  private TransitionMatrix tmat2;
  private TransitionMatrix tmat3;

  private List<String[]> probs1; // 5x5
  private List<String[]> probs2; // 7x7
  private List<String[]> probs3; // 48x48

  private double[][] probsMatrix1;
  private double[][] probsMatrix2;
  private double[][] probsMatrix3;

  private CSVReader reader = new CSVReader();

  @Before
  public void setUp() { // initialize
    //5x5
    probs1 = new ArrayList<>();
    probs1.add(new String[] {"start", "Cmaj7", "C-7", "C-7b5", "C7", "Dbmaj7"});
    probs1.add(new String[] {"Cmaj7", "0", "0.6", "0.1", "0.2", "0.1"});
    probs1.add(new String[] {"C-7", "0.6", "0", "0.1", "0.2", "0.1"});
    probs1.add(new String[] {"C-7b5", "0.3", "0.2", "0", "0.4", "0.1"});
    probs1.add(new String[] {"C7", "0.1", "0.2", "0.4", "0", "0.3"});
    probs1.add(new String[] {"Dbmaj7", "0", "0", "0.65", "0.35", "0"});
    probsMatrix1 = new double[][]{{0, 0.6, 0.1, 0.2, 0.1},
                                  {0.6, 0, 0.1, 0.2, 0.1},
                                  {0.3, 0.2, 0, 0.4, 0.1},
                                  {0.1, 0.2, 0.4, 0, 0.3},
                                  {0, 0, 0.65, 0.35, 0}};
    //7x7
    probs2 = new ArrayList<>();
    probs2.add(new String[] {"start", "Cmaj7", "C-7", "C-7b5", "C7", "Dbmaj7", "Db-7", "Db-7b5"});
    probs2.add(new String[] {"Cmaj7", "0", "0.1", "0.2", "0.1", "0.05", "0.35", "0.2"});
    probs2.add(new String[] {"C-7", "0.15", "0", "0.05", "0.25", "0.08", "0.27", "0.2"});
    probs2.add(new String[] {"C-7b5", "0.05", "0.05", "0", "0.1", "0.05", "0.4", "0.3"});
    probs2.add(new String[] {"C7", "0.18", "0.37", "0.1", "0", "0.2", "0.05", "0.15"});
    probs2.add(new String[] {"Dbmaj7", "0.11", "0.09", "0.26", "0.24", "0", "0.14", "0.16"});
    probs2.add(new String[] {"Db-7", "0.55", "0.05", "0.1", "0.08", "0.09", "0", "0.13"});
    probs2.add(new String[] {"Db-7b5", "0.1", "0.1", "0.1", "0.1", "0.5", "0.1", "0"});
    probsMatrix2 = new double[][]{{0, 0.1, 0.2, 0.1, 0.05, 0.35, 0.2},
                                  {0.15, 0, 0.05, 0.25, 0.08, 0.27, 0.2},
                                  {0.05, 0.05, 0, 0.1, 0.05, 0.4, 0.3},
                                  {0.18, 0.37, 0.1, 0, 0.2, 0.05, 0.15},
                                  {0.11, 0.09, 0.26, 0.24, 0, 0.14, 0.16},
                                  {0.55, 0.05, 0.1, 0.08, 0.09, 0, 0.13},
                                  {0.1, 0.1, 0.1, 0.1, 0.5, 0.1, 0}};
    //48x48
    probs3 = reader.parseCSV("../scripts/t-mat-low.csv");
    tmat1 = new TransitionMatrix(probs1);
    tmat2 = new TransitionMatrix(probs2);
    tmat3 = new TransitionMatrix(probs3);
  }

  @After
  public void tearDown() {
   probs1 = null;
   probs2 = null;
   probs3 = null;
  }

  //Testing to see if transition matrix was set up properly
  @Test
  public void testInitialization() {
    double[][] tmatProbs1 = tmat1.getTransitionMatrix();
    for (int i = 0;  i < probsMatrix1.length; i++) {
      for (int j = 0; j < probsMatrix1[0].length; j++) {
        assertEquals(probsMatrix1[i][j], tmatProbs1[i][j], 0.000000001);
      }
    }
    double[][] tmatProbs2 = tmat2.getTransitionMatrix();
    for (int i = 0;  i < probsMatrix2.length; i++) {
      for (int j = 0; j < probsMatrix2[0].length; j++) {
        assertEquals(probsMatrix2[i][j], tmatProbs2[i][j], 0.000000001);
      }
    }
  }
  @Test
  public void testGetNumChords() {
    assertEquals(tmat1.getNumChords(), probsMatrix1.length);
    assertEquals(tmat2.getNumChords(), probsMatrix2.length);
    assertEquals(new TransitionMatrix().getNumChords(), 0);
  }
  //Monte-Carlo simulation to test this method
  @Test
  public void testGetNextChordIndex() {
    int counter = 0;
    while (counter < 1000) {
      int[] binsTMat11 = new int[5];
      int[] binsTMat12 = new int[5];
      int[] binsTMat21 = new int[7];
      int[] binsTMat22 = new int[7];
      for (int i = 0; i < 100000; i++) {
        binsTMat11[tmat1.getNextChordIndex(2, 4)] += 1;
        binsTMat12[tmat1.getNextChordIndex(4, 4)] += 1;
        binsTMat21[tmat2.getNextChordIndex(1, 4)] += 1;
        binsTMat22[tmat2.getNextChordIndex(5, 4)] += 1;
      }
      assertEquals(binsTMat11[0], 30000, 3000); // 0.3,
      assertEquals(binsTMat11[1], 20000, 2000); // 0.2,
      assertEquals(binsTMat11[2], 0, 0); // 0,
      assertEquals(binsTMat11[3], 40000, 4000); // 0.4,
      assertEquals(binsTMat11[4], 10000, 1000); // 0.1
      assertEquals(binsTMat12[0], 0, 0); // 0,
      assertEquals(binsTMat12[1], 0, 0); // 0,
      assertEquals(binsTMat12[2], 65000, 6500); // 0.65,
      assertEquals(binsTMat12[3], 35000, 3500); // 0.35,
      assertEquals(binsTMat12[4], 0, 0); // 0
      assertEquals(binsTMat21[0], 15000, 1500); // 0.15,
      assertEquals(binsTMat21[1], 0); // 0,
      assertEquals(binsTMat21[2], 5000, 500); // 0.05,
      assertEquals(binsTMat21[3], 25000, 2500); // 0.25,
      assertEquals(binsTMat21[4], 8000, 800); // 0.08,
      assertEquals(binsTMat21[5], 27000, 2700); // 0.27,
      assertEquals(binsTMat21[6], 20000, 2000); // 0.2
      assertEquals(binsTMat22[0], 55000, 5500); // 0.55,
      assertEquals(binsTMat22[1], 5000, 500); // 0.05,
      assertEquals(binsTMat22[2], 10000, 1000); // 0.1,
      assertEquals(binsTMat22[3], 8000, 800); // 0.08,
      assertEquals(binsTMat22[4], 9000, 900); // 0.09,
      assertEquals(binsTMat22[5], 0); // 0,
      assertEquals(binsTMat22[6], 13000, 1300); // 0.13
      counter++;
    }
    assertEquals(new TransitionMatrix().getNextChordIndex(0, 4), -1);
  }
  @Test
  public void testDigitize() {
    int counter = 0;
    while (counter < 1000) {
      List<Tuple<Double, Integer>> l1 = new ArrayList<>();
      l1.add(new Tuple<>(.2, 5));
      l1.add(new Tuple<>(.5, 6));
      l1.add(new Tuple<>(.8, 7));
      l1.add(new Tuple<>(1., 8));
      int[] buckets1 = new int[4];
      List<Tuple<Double, Integer>> l2 = new ArrayList<>();
      l2.add(new Tuple<>(.1, 0));
      l2.add(new Tuple<>(.5, 1));
      l2.add(new Tuple<>(.8, 2));
      int[] buckets2 = new int[3];
      List<Tuple<Double, Integer>> l3 = new ArrayList<>();
      l3.add(new Tuple<>(1.5, 7));
      l3.add(new Tuple<>(3.9, 8));
      l3.add(new Tuple<>(5.6, 9));
      l3.add(new Tuple<>(5.7, 10));
      l3.add(new Tuple<>(6.0, 11));
      l3.add(new Tuple<>(10.0, 12));
      int[] buckets3 = new int[6];
      for (int i = 0; i < 100000; i++) {
        buckets1[tmat1.digitize(l1, 1.0) - 5] += 1;
        buckets2[tmat2.digitize(l2, 0.8)] += 1;
        buckets3[tmat3.digitize(l3, 10.0) - 7] += 1;
      }
      assertEquals(buckets1[0], 20000, 2000); //.2
      assertEquals(buckets1[1], 30000, 3000); //.3
      assertEquals(buckets1[2], 30000, 3000); //.3
      assertEquals(buckets1[3], 20000, 2000); //.2

      assertEquals(buckets2[0], 12500, 1250); //.125
      assertEquals(buckets2[1], 50000, 5000); //.5
      assertEquals(buckets2[2], 35000, 3500); //.375

      assertEquals(buckets3[0], 15000, 1500); //.15
      assertEquals(buckets3[1], 24000, 2400); //.24
      assertEquals(buckets3[2], 17000, 1700); //.17
      assertEquals(buckets3[3], 1000, 150); //.01
      assertEquals(buckets3[4], 3000, 300); //.03
      assertEquals(buckets3[5], 40000, 4000); //.4
      counter++;
    }
    assertEquals(tmat1.digitize(new ArrayList<>(), 0), -1);
  }
  @Test
  public void testGetCorrespondingChord() {
    assertEquals(TransitionMatrix.getCorrespondingChord(0, 4),
            new Chord(CoreaApplication.Root.C, CoreaApplication.Quality.MAJOR7));
    assertEquals(TransitionMatrix.getCorrespondingChord(5, 4),
            new Chord(CoreaApplication.Root.Db, CoreaApplication.Quality.MINOR7));
    assertEquals(TransitionMatrix.getCorrespondingChord(7, 4),
            new Chord(CoreaApplication.Root.Db, CoreaApplication.Quality.DOMINANT7));
    assertEquals(TransitionMatrix.getCorrespondingChord(47, 4),
            new Chord(CoreaApplication.Root.B, CoreaApplication.Quality.DOMINANT7));
    assertEquals(TransitionMatrix.getCorrespondingChord(35, 4),
            new Chord(CoreaApplication.Root.Ab, CoreaApplication.Quality.DOMINANT7));
    assertEquals(TransitionMatrix.getCorrespondingChord(32, 4),
            new Chord(CoreaApplication.Root.Ab, CoreaApplication.Quality.MAJOR7));
    assertEquals(TransitionMatrix.getCorrespondingChord(17, 4),
            new Chord(CoreaApplication.Root.E, CoreaApplication.Quality.MINOR7));
  }
}
