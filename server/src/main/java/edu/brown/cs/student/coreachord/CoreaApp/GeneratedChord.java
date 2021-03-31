package edu.brown.cs.student.coreachord.CoreaApp;

/*
 * A wrapper class of Chord.
 * It's basically a Chord, but it also
 * contains information about chord progression as well.
 * (like length of the chord, etc.)
 */
public class GeneratedChord {
  private Chord chorddata;
  private double chordlength;
  public GeneratedChord(Chord chord, double length) {
    chorddata = chord;
    chordlength = length;
  }

  public Chord getChorddata() {
    return chorddata;
  }
  public double getChordlength() {
    return chordlength;
  }
}
