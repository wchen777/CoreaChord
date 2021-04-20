package edu.brown.cs.student.coreachord.Analyzer;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.CoreaApp.GeneratedChord;
import edu.brown.cs.student.coreachord.UtilityObjects.MathFunctions;
import edu.brown.cs.student.coreachord.UtilityObjects.Tuple;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * class to analyze a give list of generated chords.
 */
public class AnalyzerApplication {
  /**
   * array of circle of fifths to determine complexity score,
   * get root enum to "index" in circle of fiths.
   */
  private HashMap<CoreaApplication.Root, Integer> circleOfFifths = new HashMap<>();


  /**
   * The 12 unique keys on a keyboard.
   * C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
   */
  private static final int NUM_ROOTS = 12;

  /**
   * initializes the circle of Fifths hashmap.
   */
  @SuppressWarnings("checkstyle:MagicNumber")
  public AnalyzerApplication() {
    circleOfFifths.put(CoreaApplication.Root.C, 0);
    circleOfFifths.put(CoreaApplication.Root.F, 1);
    circleOfFifths.put(CoreaApplication.Root.Bb, 2);
    circleOfFifths.put(CoreaApplication.Root.Eb, 3);
    circleOfFifths.put(CoreaApplication.Root.Ab, 4);
    circleOfFifths.put(CoreaApplication.Root.Db, 5);
    circleOfFifths.put(CoreaApplication.Root.Gb, 6);
    circleOfFifths.put(CoreaApplication.Root.B, 7);
    circleOfFifths.put(CoreaApplication.Root.E, 8);
    circleOfFifths.put(CoreaApplication.Root.A, 9);
    circleOfFifths.put(CoreaApplication.Root.D, 10);
    circleOfFifths.put(CoreaApplication.Root.G, 11);
  }


  /**
   * @param chordProg - A list of generated chords
   * @param cadences - List of generated cadences to return to modify. Analyzes the chordProg
   */
  public void windowTwoCadences(List<GeneratedChord> chordProg, List<GeneratedCadence> cadences) {
    // list index
    int i = 0;
    // chord measure tracker
    int currMeasure = 0;

    // sliding window of 3
    while (i < chordProg.size() - 1) {
      // get the three chords in the window
      Chord c1 = chordProg.get(i).getChorddata();
      Chord c2 = chordProg.get(i + 1).getChorddata();

      // get end measure
      int end = currMeasure + chordProg.get(i + 1).getChordlength();

      String progression = c1.toFormattedString() + " -> " + c2.toFormattedString();

      // if subV to I
      if (CadenceCalculator.isHalfStepDown(c1, c2) && CadenceCalculator.isDominant7(c1)) {
        cadences.add(new GeneratedCadence(Cadence.subV_I, currMeasure,
                end, c2.getRoot(), progression));
      }

      // if Imaj7 to Im7
      if (CadenceCalculator.isSameRoot(c1, c2) && CadenceCalculator.isMajorToMinor(c1, c2)) {
        cadences.add(new GeneratedCadence(Cadence.Imaj7_Im7, currMeasure,
                end, c2.getRoot(), progression));
      }

      // if bVII - I
      if (CadenceCalculator.isDominant7(c1)
              && CadenceCalculator.isUpWholeStep(c1, c2)
              && CadenceCalculator.isMinorOrMajor(c2)) {
        cadences.add(new GeneratedCadence(Cadence.bVII_I, currMeasure,
                end, c2.getRoot(), progression));
      }

      // increment measure tracker and list index
      currMeasure += chordProg.get(i).getChordlength();
      i++;
    }
  }


  /**
   * @param chordProg - A list of generated chords
   * @param cadences - List of generated cadences to return to modify. Analyzes the chordProg
   */
  public void windowThreeCadences(List<GeneratedChord> chordProg, List<GeneratedCadence> cadences) {
    // list index
    int i = 0;
    // chord measure tracker
    int currMeasure = 1;

    // sliding window of 3
    while (i < chordProg.size() - 2) {
      // get the three chords in the window
      Chord c1 = chordProg.get(i).getChorddata();
      Chord c2 = chordProg.get(i + 1).getChorddata();
      Chord c3 = chordProg.get(i + 2).getChorddata();
      // get end measure
      int end = currMeasure + chordProg.get(i + 1).getChordlength()
              + chordProg.get(i + 2).getChordlength();

      String progression = c1.toFormattedString() + " -> " + c2.toFormattedString()
              + " -> " + c3.toFormattedString();

      // create IIVI cadence
      if (CadenceCalculator.isIIVI(c1, c2, c3)) {
        cadences.add(new GeneratedCadence(Cadence.II_V_I, currMeasure,
                end, c3.getRoot(), progression));
      }

      // can add support for more progressions here

      // increment measure tracker and list index
      currMeasure += chordProg.get(i).getChordlength();
      i++;
    }
  }
  /**
   * @param v1 - Location of one root from a chord on the circle of fifths
   * @param v2 - Location of another from a chord on the circle fifths
   * @return - the distance between both roots
   */
  public double circularDistance(int v1, int v2) {
    double absD = Math.abs(v1 - v2);
    // check to see if we need to count the other way around the circle
    if (absD > (NUM_ROOTS / 2.0)) {

      int bigger = Math.max(v1, v2);
      int smaller = Math.min(v1, v2);

      // add on the length of the circle
      smaller += NUM_ROOTS;
      // then subtract
      return smaller - bigger;
    } else {
      return absD;
    }
  }
  /**
   * @param chordsRaw - List of 3 chords to analyze the complexity with
   * @return - the final complexity of the chord progression
   */
  public List<ComplexityScore> getComplexityScore(List<Chord> chordsRaw) {

    List<ComplexityScore> complexities = new ArrayList<>();

    // window 3 for complexity score

    // list index
    int i = 0;

    // sliding window of 3
    while (i < chordsRaw.size() - 2) {
      // get the three chords in the window
      Chord c1 = chordsRaw.get(i);
      Chord c2 = chordsRaw.get(i + 1);
      Chord c3 = chordsRaw.get(i + 2);

      // calculate relative distance from circle of fifths
      double firstScore = circularDistance(circleOfFifths.get(c2.getRoot()),
              circleOfFifths.get(c1.getRoot()));
      double secondScore = circularDistance(circleOfFifths.get(c3.getRoot()),
              circleOfFifths.get(c2.getRoot()));

      // 22 is the max value of these two scores added together
      double newScore = (firstScore + secondScore) / NUM_ROOTS;

      // apply pseudo sigmoid to perturb values
      complexities.add(new ComplexityScore(i + 1, MathFunctions.pseudoSigmoid(newScore)));

      i++;
    }
    return complexities;
  }
  /**
   * create raw chords list in order to find the complexity score.
   * @param chordProg - chord progression, typically 3 chords
   * @return - the chords themselves stripped of the GeneratedChord wrapper class
   */
  public List<Chord> createRawChordList(List<GeneratedChord> chordProg) {
    List<Chord> rawChords = new ArrayList<>();

    for (GeneratedChord gc : chordProg) {
      Chord c = gc.getChorddata();
      // add twice if length two, other wise add once
      if (gc.getChordlength() == 2) {
        rawChords.add(c);
      }
      rawChords.add(c);
    }

    return rawChords;
  }

  /**
   * @param chordProg - list of with chord progression.
   * @return - combination of the complexity and cadence of a chord progression
   */
  public Tuple<List<ComplexityScore>, List<GeneratedCadence>>
      generate(List<GeneratedChord> chordProg) {
    List<GeneratedCadence> cadences = new ArrayList<>();
    List<Chord> chordsRaw = createRawChordList(chordProg);

    this.windowThreeCadences(chordProg, cadences);
    this.windowTwoCadences(chordProg, cadences);

    List<ComplexityScore> complexities = getComplexityScore(chordsRaw);
    return new Tuple<>(complexities, cadences);
  }

}
