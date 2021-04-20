package edu.brown.cs.student.coreachord.Analyzer;

import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;

/**
 * .
 */
public class GeneratedCadence {
  /**
   * .
   */
  private Cadence cadence;
  /**
   * The first chord in the cadence.
   */
  private int start;
  /**
   * the last chord in the cadence.
   */
  private int end;
  /**
   *
   */
  private CoreaApplication.Root relativeRoot;
  /**
   * The chord progression (of length 2 or more chords).
   */
  private String progression;

  /**
   * @param cadence
   * @param start - The first chord in the cadence.
   * @param end - The last chord in the cadence.
   * @param relativeRoot
   * @param progression The chord progression.
   */
  public GeneratedCadence(Cadence cadence, int start, int end,
                          CoreaApplication.Root relativeRoot, String progression) {
    this.cadence = cadence;
    this.start = start;
    this.end = end;
    this.relativeRoot = relativeRoot;
    this.progression = progression;
  }

}
