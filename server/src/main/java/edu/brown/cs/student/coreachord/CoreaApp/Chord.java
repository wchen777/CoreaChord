package edu.brown.cs.student.coreachord.CoreaApp;

import java.util.Objects;

/*
 * Class that represents a single Chord. (Example: C, B)
 */
public class Chord {
  private CoreaApplication.Quality quality; // "quality" of this chord
  private CoreaApplication.Root root; // "root" of this chord

  public Chord(CoreaApplication.Root inputroot,
               CoreaApplication.Quality inputquality) {
    quality = inputquality;
    root = inputroot;
  }

  public CoreaApplication.Quality getQuality() {
    return quality;
  }

  public CoreaApplication.Root getRoot() {
    return root;
  }

  public String toFormattedString() {
    String qualString;
    switch (quality) {
      case MAJOR7:
        qualString = "maj7";
        break;
      case MINOR7:
        qualString = "-7";
        break;
      case DOMINANT7:
        qualString = "7";
        break;
      case MINOR7FLAT5:
        qualString = "-7b5";
        break;
      default:
        qualString = "";
        break;
    }
    return root + qualString;
  }

  @Override
  public String toString() {
    return "Root: " + root + "\nQuality: " + quality;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Chord chord = (Chord) o;
    return quality.equals(chord.getQuality()) && root.equals(chord.getRoot());
  }

  @Override
  public int hashCode() {
    return Objects.hash(quality, root);
  }
}
