package edu.brown.cs.student.coreachord.CoreaApp;

/*
 * A wrapper class of Chord.
 * It's basically a Chord, but it also
 * contains information about chord progression as well.
 * (like length of the chord, etc.)
 */
public class GeneratedChord {
  private Chord chorddata;
  private int chordlength;
  public GeneratedChord(Chord chord, int length) {
    chorddata = chord;
    chordlength = length;
  }

  public Chord getChorddata() {
    return chorddata;
  }
  public int getChordlength() {
    return chordlength;
  }
  public void setChorddata(Chord c) { chorddata = c; }
  public void setChordlength(int chordlen) { chordlength = chordlen; }
  @Override
  public String toString() {
    return chorddata + "\nChord Length: " + chordlength;
  }
}
