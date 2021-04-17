package edu.brown.cs.student.coreachord.Analyzer;

import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;

public class GeneratedCadence {
  private Cadence cadence;
  private int start;
  private int end;
  private CoreaApplication.Root relativeRoot;

  public GeneratedCadence(Cadence cadence, int start, int end, CoreaApplication.Root relativeRoot) {
    this.cadence = cadence;
    this.start = start;
    this.end = end;
    this.relativeRoot = relativeRoot;
  }

//  public int getEnd() {
//    return end;
//  }
//
//  public Cadence getCadence() {
//    return cadence;
//  }
//
//  public int getStart() {
//    return start;
//  }
//
//  public CoreaApplication.Root getRelativeRoot() {
//    return relativeRoot;
//  }

  @Override
  public String toString() {
    return "GeneratedCadence{"
            + "cadence=" + cadence
            + ", start=" + start
            + ", end=" + end
            + ", relativeRoot=" + relativeRoot
            + '}';
  }
}
