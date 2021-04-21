package edu.brown.cs.student.coreachord;

import edu.brown.cs.student.coreachord.Analyzer.AnalyzerApplication;
import edu.brown.cs.student.coreachord.Analyzer.Cadence;
import edu.brown.cs.student.coreachord.Analyzer.ComplexityScore;
import edu.brown.cs.student.coreachord.Analyzer.GeneratedCadence;
import edu.brown.cs.student.coreachord.CoreaApp.Chord;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.CoreaApp.GeneratedChord;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;


import java.util.ArrayList;
import java.util.List;

public class AnalyzerTest {
  AnalyzerApplication testApp = new AnalyzerApplication();
  List<GeneratedChord> chordList8 = new ArrayList<>();
  List<GeneratedChord> chordList16 = new ArrayList<>();
  List<GeneratedChord> chordList32 = new ArrayList<>();
  List<Chord> rawChords1 = new ArrayList<>();
  List<Chord> rawChords2 = new ArrayList<>();
  List<Chord> rawChords3 = new ArrayList<>();

  @Before
  public void setup() {
    Chord c1 = new Chord(CoreaApplication.Root.A, CoreaApplication.Quality.MAJOR7);
    Chord c2 = new Chord(CoreaApplication.Root.C, CoreaApplication.Quality.MAJOR7);
    Chord c3 = new Chord(CoreaApplication.Root.Eb, CoreaApplication.Quality.MINOR7);
    Chord c4 = new Chord(CoreaApplication.Root.D, CoreaApplication.Quality.MINOR7FLAT5);
    Chord c5 = new Chord(CoreaApplication.Root.G, CoreaApplication.Quality.DOMINANT7);
    Chord c6 = new Chord(CoreaApplication.Root.Gb, CoreaApplication.Quality.MAJOR7);
    Chord c7 = new Chord(CoreaApplication.Root.F, CoreaApplication.Quality.DOMINANT7);
    Chord c8 = new Chord(CoreaApplication.Root.B, CoreaApplication.Quality.DOMINANT7);
    Chord c9 = new Chord(CoreaApplication.Root.Bb, CoreaApplication.Quality.DOMINANT7);
    Chord c10 = new Chord(CoreaApplication.Root.C, CoreaApplication.Quality.MINOR7);
    Chord c11 = new Chord(CoreaApplication.Root.Bb, CoreaApplication.Quality.MINOR7);
    Chord c12 = new Chord(CoreaApplication.Root.Eb, CoreaApplication.Quality.DOMINANT7);
    Chord c13 = new Chord(CoreaApplication.Root.Ab, CoreaApplication.Quality.DOMINANT7);
    Chord c14 = new Chord(CoreaApplication.Root.Db, CoreaApplication.Quality.MAJOR7);
    Chord c15 = new Chord(CoreaApplication.Root.Db, CoreaApplication.Quality.DOMINANT7);
    Chord c16 = new Chord(CoreaApplication.Root.Eb, CoreaApplication.Quality.MINOR7);
    Chord c17 = new Chord(CoreaApplication.Root.Gb, CoreaApplication.Quality.MINOR7FLAT5);
    Chord c18 = new Chord(CoreaApplication.Root.C, CoreaApplication.Quality.DOMINANT7);
    Chord c19 = new Chord(CoreaApplication.Root.F, CoreaApplication.Quality.MINOR7);
    Chord c20 = new Chord(CoreaApplication.Root.Bb, CoreaApplication.Quality.MAJOR7);
    Chord c21 = new Chord(CoreaApplication.Root.Eb, CoreaApplication.Quality.MAJOR7);
    Chord c22 = new Chord(CoreaApplication.Root.Ab, CoreaApplication.Quality.MAJOR7);
    Chord c23 = new Chord(CoreaApplication.Root.Gb, CoreaApplication.Quality.DOMINANT7);
    GeneratedChord chord1 = new GeneratedChord(c1, 2);
    GeneratedChord chord2 = new GeneratedChord(c2, 1);
    GeneratedChord chord3 = new GeneratedChord(c3, 1);
    GeneratedChord chord4 = new GeneratedChord(c4, 1);
    GeneratedChord chord5 = new GeneratedChord(c5, 1);
    GeneratedChord chord6 = new GeneratedChord(c6, 1);
    GeneratedChord chord7 = new GeneratedChord(c7, 2);
    GeneratedChord chord8 = new GeneratedChord(c8, 2);
    GeneratedChord chord9 = new GeneratedChord(c9, 1);
    GeneratedChord chord10 = new GeneratedChord(c10, 1);
    GeneratedChord chord11 = new GeneratedChord(c11, 1);
    GeneratedChord chord12 = new GeneratedChord(c12, 1);
    GeneratedChord chord13 = new GeneratedChord(c13, 2);
    GeneratedChord chord14 = new GeneratedChord(c14, 2);
    GeneratedChord chord15 = new GeneratedChord(c15, 2);
    GeneratedChord chord16 = new GeneratedChord(c16, 2);
    GeneratedChord chord17 = new GeneratedChord(c17, 1);
    GeneratedChord chord18 = new GeneratedChord(c18, 1);
    GeneratedChord chord19 = new GeneratedChord(c19, 2);
    GeneratedChord chord20 = new GeneratedChord(c20, 2);
    GeneratedChord chord21 = new GeneratedChord(c21, 2);
    GeneratedChord chord22 = new GeneratedChord(c22, 1);
    GeneratedChord chord23 = new GeneratedChord(c23, 2);

    chordList8.add(chord2); //1, CMAJ7
    chordList8.add(chord5); //1, G7
    chordList8.add(chord10); //1, C-7
    chordList8.add(chord5); //1, G7
    chordList8.add(chord10); //1, C-7
    chordList8.add(chord3); //1, Eb-7
    chordList8.add(chord4); //1, FMIN7FLAT5
    chordList8.add(chord9); //1, Bb7

    rawChords1.add(c2);
    rawChords1.add(c5);
    rawChords1.add(c10);
    rawChords1.add(c5);
    rawChords1.add(c10);
    rawChords1.add(c3);
    rawChords1.add(c4);
    rawChords1.add(c9);

    chordList16.add(chord16); //2, Eb-7
    chordList16.add(chord11); //1, Bb-7
    chordList16.add(chord7); //2, F7
    chordList16.add(chord9); //1, Bb7
    chordList16.add(chord12); //1, Eb7
    chordList16.add(chord13); //2, Ab7
    chordList16.add(chord14); //2, DbMAJ7
    chordList16.add(chord16); //2, Eb-7
    chordList16.add(chord1); //1, AMAJ7
    chordList16.add(chord15); //2, Db7
    chordList16.add(chord6); //1, GbMAJ7

    rawChords2.add(c16);
    rawChords2.add(c16);
    rawChords2.add(c11);
    rawChords2.add(c7);
    rawChords2.add(c7);
    rawChords2.add(c9);
    rawChords2.add(c12);
    rawChords2.add(c13);
    rawChords2.add(c13);
    rawChords2.add(c14);
    rawChords2.add(c14);
    rawChords2.add(c16);
    rawChords2.add(c16);
    rawChords2.add(c1);
    rawChords2.add(c1);
    rawChords2.add(c15);
    rawChords2.add(c15);
    rawChords2.add(c6);

    chordList32.add(chord17); //GMIN7FLAT5, 1
    chordList32.add(chord18); //C7, 1
    chordList32.add(chord19); //F-7, 2
    chordList32.add(chord18); //C7, 1
    chordList32.add(chord7); //F7, 1
    chordList32.add(chord20); //BbMAJ7, 2
    chordList32.add(chord5); //G7, 1
    chordList32.add(chord10); //C-7, 1
    chordList32.add(chord19); //F-7, 2
    chordList32.add(chord9); //Bb7, 1
    chordList32.add(chord21); //EbMAJ7, 2
    chordList32.add(chord19); //F-7, 2
    chordList32.add(chord9); //Bb7, 1
    chordList32.add(chord12); //Eb7, 1
    chordList32.add(chord22); //AbMAJ7, 1
    chordList32.add(chord11); //Bb-7, 1
    chordList32.add(chord12); //Eb7, 1
    chordList32.add(chord1); //Ab7, 1
    chordList32.add(chord15); //Db7, 2
    chordList32.add(chord6); //GbMAJ7, 1
    chordList32.add(chord15); //Db7, 2
    chordList32.add(chord23); //Gb7, 1
    chordList32.add(chord8); //B7, 1

    rawChords3.add(c17);
    rawChords3.add(c18);
    rawChords3.add(c19);
    rawChords3.add(c19);
    rawChords3.add(c18);
    rawChords3.add(c7);
    rawChords3.add(c7);
    rawChords3.add(c20);
    rawChords3.add(c20);
    rawChords3.add(c5);
    rawChords3.add(c10);
    rawChords3.add(c19);
    rawChords3.add(c19);
    rawChords3.add(c9);
    rawChords3.add(c21);
    rawChords3.add(c21);
    rawChords3.add(c19);
    rawChords3.add(c19);
    rawChords3.add(c9);
    rawChords3.add(c12);
    rawChords3.add(c22);
    rawChords3.add(c11);
    rawChords3.add(c12);
    rawChords3.add(c1);
    rawChords3.add(c1);
    rawChords3.add(c15);
    rawChords3.add(c15);
    rawChords3.add(c6);
    rawChords3.add(c15);
    rawChords3.add(c15);
    rawChords3.add(c23);
    rawChords3.add(c23);
    rawChords3.add(c8);
    rawChords3.add(c8);
  }
  @After
  public void tearDown() {
    chordList8 = new ArrayList<>();
    chordList16 = new ArrayList<>();
    chordList32 = new ArrayList<>();
  }
  @Test
  public void testWindowThreeCadences() {
    List<GeneratedCadence> result1 = new ArrayList<>();
    List<GeneratedCadence> result2 = new ArrayList<>();
    List<GeneratedCadence> result3 = new ArrayList<>();
    testApp.windowThreeCadences(chordList8, result1);
    assertEquals(result1.size(), 0);
    testApp.windowThreeCadences(chordList16, result2);
    assertEquals(result2.get(0).getProgression(), "F7 -> Bb7 -> Eb7");
    assertEquals(result2.get(1).getProgression(), "Bb7 -> Eb7 -> Ab7");
    assertEquals(result2.get(2).getProgression(), "Eb7 -> Ab7 -> Dbmaj7");
    assertEquals(result2.get(0).getCadence(), Cadence.II_V_I);
    assertEquals(result2.get(1).getCadence(), Cadence.II_V_I);
    assertEquals(result2.get(2).getCadence(), Cadence.II_V_I);
    testApp.windowThreeCadences(chordList32, result3);
    assertEquals(result3.get(0).getProgression(), "C7 -> F7 -> Bbmaj7");
    assertEquals(result3.get(1).getProgression(), "F-7 -> Bb7 -> Ebmaj7");
    assertEquals(result3.get(2).getProgression(), "F-7 -> Bb7 -> Eb7");
    assertEquals(result3.get(3).getProgression(), "Bb7 -> Eb7 -> Abmaj7");
    assertEquals(result3.get(4).getProgression(), "Db7 -> Gb7 -> B7");
    assertEquals(result3.get(0).getCadence(), Cadence.II_V_I);
    assertEquals(result3.get(1).getCadence(), Cadence.II_V_I);
    assertEquals(result3.get(2).getCadence(), Cadence.II_V_I);
    assertEquals(result3.get(3).getCadence(), Cadence.II_V_I);
    assertEquals(result3.get(4).getCadence(), Cadence.II_V_I);
  }
  @Test
  public void testCreateRawChordList() {
    assertEquals(testApp.createRawChordList(chordList8), rawChords1);
    assertEquals(testApp.createRawChordList(chordList16), rawChords2);
    assertEquals(testApp.createRawChordList(chordList32), rawChords3);
  }
  @Test
  public void testGetComplexityScore() {
    List<ComplexityScore> scores1 = testApp.getComplexityScore(rawChords1);
    List<ComplexityScore> scores2 = testApp.getComplexityScore(rawChords2);
    List<ComplexityScore> scores3 = testApp.getComplexityScore(rawChords3);

    //Calculated the scores at each index by getting the circular distance
    //of the two chords nearest to the current index, adding the, then dividing
    //by 2. From there we could apply our sigmoid function to the resulting value
    assertEquals(scores1.get(0).getX(), 1);
    assertEquals(scores1.get(1).getX(), 2);
    assertEquals(scores1.get(2).getX(), 3);
    assertEquals(scores1.get(0).getY(), 0.19781611144141822, 0.00000001);
    assertEquals(scores1.get(1).getY(), 0.19781611144141822, 0.00000001);
    assertEquals(scores1.get(2).getY(), 0.19781611144141822, 0.00000001);
    assertEquals(scores1.get(3).getY(), 0.40131233988754794, 0.00000001);
    assertEquals(scores1.get(4).getY(), 0.8320183851339245, 0.00000001);
    assertEquals(scores1.get(5).getY(), 0.8909031788043871, 0.00000001);

    assertEquals(scores2.get(0).getX(), 1);
    assertEquals(scores2.get(15).getX(), 16);
    assertEquals(scores2.get(0).getY(), 0.1301084743629978, 0.0000001);
    assertEquals(scores2.get(1).getY(), 0.19781611144141822, 0.00000001);
    assertEquals(scores2.get(11).getY(), 0.6456563062257954, 0.00000001);
    assertEquals(scores2.get(13).getY(), 0.40131233988754794, 0.00000001);
    assertEquals(scores2.get(15).getY(), 0.1301084743629978, 0.00000001);

    assertEquals(scores3.size(), 32);
    assertEquals(scores3.get(0).getY(), 0.7502601055951177, 0.0000001);
    assertEquals(scores3.get(7).getY(), 0.289050497374996, 0.0000001);
    assertEquals(scores3.get(8).getY(), 0.40131233988754794, 0.0000001);
    assertEquals(scores3.get(9).getY(), 0.19781611144141822, 0.0000001);
    assertEquals(scores3.get(21).getY(), 0.7502601055951177, 0.0000001);
  }
  @Test
  public void testCircularDistance() {
    assertEquals(testApp.circularDistance(0, 0), 0, 0.00000001);
    assertEquals(testApp.circularDistance(0, 5), 5, 0.0000001);
    assertEquals(testApp.circularDistance(0, 11), 1, 0.0000001);
    assertEquals(testApp.circularDistance(8, 0), 4, 0.0000001);
    assertEquals(testApp.circularDistance(7, 6), 1, 0.0000001);
    assertEquals(testApp.circularDistance(4, 11), 5, 0.0000001);
  }
  @Test
  public void testWindowTwoCadences() {
    List<GeneratedCadence> result1 = new ArrayList<>();
    List<GeneratedCadence> result2 = new ArrayList<>();
    List<GeneratedCadence> result3 = new ArrayList<>();
    testApp.windowTwoCadences(chordList8, result1);
    assertEquals(result1.size(), 0);
    testApp.windowTwoCadences(chordList16, result2);
    assertEquals(result2.size(), 0);
    testApp.windowTwoCadences(chordList32, result3);
    assertEquals(result3.size(), 0);
  }
}
