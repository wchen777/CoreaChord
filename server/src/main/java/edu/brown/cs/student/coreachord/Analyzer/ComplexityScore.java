package edu.brown.cs.student.coreachord.Analyzer;

public class ComplexityScore {

  // x is the middle measure number in the measure window
  private int x;

  // the secret complexity score from 0 to 1, 0 being least complex and 1 being most complex
  private double y;

  public ComplexityScore(int x, double y) {
    this.x = x;
    this.y = y;
  }

}
