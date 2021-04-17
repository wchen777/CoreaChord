package edu.brown.cs.student.coreachord.CoreaApp;

/*
 * A wrapper class of Chord.
 * It's basically a Chord, but it also
 * contains information about chord progression as well.
 * (like length of the chord, etc.)
 */
public class GeneratedChord {
  /**
   * A chord.
   */
  private Chord chorddata;
  /**
   * The length of this current chord.
   */
  private int chordlength;

  /**
   * @param chord - a chord
   * @param length - its corresponding length in bars
   */
  public GeneratedChord(Chord chord, int length) {
    chorddata = chord;
    chordlength = length;
  }

  /**
   * @return - the chord instance variable.
   */
  public Chord getChorddata() {
    return chorddata;
  }

  /**
   * @return - the length of the chord instance variable.
   */
  public int getChordlength() {
    return chordlength;
  }

  /**
   * @param c - a Chord to set to the chord instance variable
   */
  public void setChorddata(Chord c) { chorddata = c; }

  /**
   * @param chordlen - a length to set to the length instance variable
   */
  public void setChordlength(int chordlen) { chordlength = chordlen; }
  @Override
  public String toString() {
    return chorddata + "\nChord Length: " + chordlength;
  }
}
