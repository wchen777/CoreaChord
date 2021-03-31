package edu.brown.cs.student.coreachord.CoreaApp;
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

}
