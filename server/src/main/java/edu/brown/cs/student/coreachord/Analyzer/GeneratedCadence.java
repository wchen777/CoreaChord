package edu.brown.cs.student.coreachord.Analyzer;

import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;

public class GeneratedCadence {
  private Cadence cadence;
  private int start;
  private int end;
  private CoreaApplication.Root relativeRoot;
  private String progression;

  public GeneratedCadence (Cadence cadence, int start, int end, CoreaApplication.Root relativeRoot, String progression) {
    this.cadence = cadence;
    this.start = start;
    this.end = end;
    this.relativeRoot = relativeRoot;
    this.progression = progression;
  }

}
