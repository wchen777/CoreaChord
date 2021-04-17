package edu.brown.cs.student.coreachord.Analyzer;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;

// class with a bunch of static methods to help calculate cadence math
public class CadenceCalculator {

  private static final int NUMROOTS = 12;

  public static boolean isNotMajor7(Chord c) {
    return c.getQuality() != CoreaApplication.Quality.MAJOR7;
  }

  public static boolean isNotM7Flat5(Chord c) {
    return c.getQuality() != CoreaApplication.Quality.MINOR7FLAT5;
  }

  public static boolean isHalfStepDown(Chord c1, Chord c2) {
    return ((c1.getRoot().ordinal() + 11) % NUMROOTS) == c2.getRoot().ordinal();
  }

  public static boolean isDominant7(Chord c) {
    return c.getQuality() == CoreaApplication.Quality.DOMINANT7;
  }

  public static boolean isIIVI(Chord c1, Chord c2, Chord c3) {
    boolean notMaj7First = isNotMajor7(c1);
    boolean dom7Second = isDominant7(c2);
    boolean notM7Flat5Third = isNotM7Flat5(c3);
    boolean IIV =  ((c1.getRoot().ordinal() + 5) % NUMROOTS) == c2.getRoot().ordinal();
    boolean VI =  ((c2.getRoot().ordinal() + 5) % NUMROOTS) == c3.getRoot().ordinal();
    return notMaj7First && dom7Second && notM7Flat5Third && IIV && VI;
  }

  public static boolean isSameRoot(Chord c1, Chord c2) {
    return c1.getRoot() == c2.getRoot();
  }

  public static boolean isMajorToMinor(Chord c1, Chord c2) {
    return c1.getQuality() == CoreaApplication.Quality.MAJOR7 && c2.getQuality() == CoreaApplication.Quality.MINOR7;
  }

  public static boolean isMinorOrMajor(Chord c) {
    return c.getQuality() == CoreaApplication.Quality.MAJOR7 || c.getQuality() == CoreaApplication.Quality.MINOR7;
  }

  public static boolean isUpWholeStep(Chord c1, Chord c2) {
    return ((c1.getRoot().ordinal() + 2) % NUMROOTS) == c2.getRoot().ordinal();
  }

}
