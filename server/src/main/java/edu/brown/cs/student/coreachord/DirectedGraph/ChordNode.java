package edu.brown.cs.student.coreachord.DirectedGraph;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;

import java.util.List;

public class ChordNode implements IGraphNode {
  private Chord chord;
  private List<Edge> outgoingedges;
  public ChordNode(Chord inputchord) { // constructor
    chord = inputchord;
  }
  public List<Edge> getEdges() {
    return outgoingedges;
  }
  public Chord getChord() {
    return chord;
  }
}
