package edu.brown.cs.student.coreachord.Analyzer;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;

// class with a bunch of static methods to help calculate cadence math
public class CadenceCalculator {

  /**
   * total number of unique keys on a keyboard.
   */
  private static final int NUM_ROOTS = 12;

  /**
   * @param c - Chord to verify whether its quality with
   * @return - whether the given chord is of the Major7 quality
   */
  public static boolean isNotMajor7(Chord c) {
    return c.getQuality() != CoreaApplication.Quality.MAJOR7;
  }

  /**
   * @param c - Chord to verify whether its quality with
   * @return - whether the given chord is of the Minor7Flat5 quality
   */
  public static boolean isNotM7Flat5(Chord c) {
    return c.getQuality() != CoreaApplication.Quality.MINOR7FLAT5;
  }

  /**
   * @param c1 - the first chord to compare
   * @param c2 - the second chord to compare
   * @return - whether the second chord is right below the first chord in the circle of fifths
   */
  public static boolean isHalfStepDown(Chord c1, Chord c2) {
    return ((c1.getRoot().ordinal() + 11) % NUM_ROOTS) == c2.getRoot().ordinal();
  }

  /**
   * @param c - Chord to verify whether its quality with
   * @return - whether the given chord is of the Dominant7 quality
   */
  public static boolean isDominant7(Chord c) {
    return c.getQuality() == CoreaApplication.Quality.DOMINANT7;
  }

  /**
   * @param c1 - the first chord to compare
   * @param c2 - the second chord to compare
   * @param c3 - the third chord to compare
   * @return - Checks the Cadence between all three chords
   */
  public static boolean isIIVI(Chord c1, Chord c2, Chord c3) {
    boolean notMaj7First = isNotMajor7(c1);
    boolean dom7Second = isDominant7(c2);
    boolean notM7Flat5Third = isNotM7Flat5(c3);
    boolean IIV =  ((c1.getRoot().ordinal() + 5) % NUM_ROOTS) == c2.getRoot().ordinal();
    boolean VI =  ((c2.getRoot().ordinal() + 5) % NUM_ROOTS) == c3.getRoot().ordinal();
    return notMaj7First && dom7Second && notM7Flat5Third && IIV && VI;
  }

  /**
   * @param c1 - The first chord to compare the root with
   * @param c2 - The second chord to compare the root with
   * @return - whether booth chords have the same root
   */
  public static boolean isSameRoot(Chord c1, Chord c2) {
    return c1.getRoot() == c2.getRoot();
  }

  /**
   * @param c1 - Chord to check whether it's a major7
   * @param c2 - Chord to check whether it's a minor7
   * @return - whether chord1 is major7 and chord2 is a minor7
   */
  public static boolean isMajorToMinor(Chord c1, Chord c2) {
    return c1.getQuality() == CoreaApplication.Quality.MAJOR7
            && c2.getQuality() == CoreaApplication.Quality.MINOR7;
  }

  /**
   * @param c - Chord to check whether it's of the minor7 or major7 quality
   * @return - whether the chord is major7 or minor7
   */
  public static boolean isMinorOrMajor(Chord c) {
    return c.getQuality() == CoreaApplication.Quality.MAJOR7
            || c.getQuality() == CoreaApplication.Quality.MINOR7;
  }

  /**
   * @param c1 - Chord1 to compare with
   * @param c2 - second chord to compare with
   * @return - whether the second chord is a whole step (2 roots above) the first chord
   * on the circle of fifths
   */
  public static boolean isUpWholeStep(Chord c1, Chord c2) {
    return ((c1.getRoot().ordinal() + 2) % NUM_ROOTS) == c2.getRoot().ordinal();
  }

}
