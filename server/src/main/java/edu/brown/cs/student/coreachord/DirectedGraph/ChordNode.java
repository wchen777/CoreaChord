package edu.brown.cs.student.coreachord.DirectedGraph;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;

import java.util.ArrayList;
import java.util.List;

public class ChordNode implements IGraphNode {
  private final Chord chord;
  private List<IEdge> outgoingedges;
  public ChordNode(Chord inputchord) {
    chord = inputchord;
    outgoingedges = new ArrayList<>();
  }
  @Override
  public List<IEdge> getEdges() {
    return outgoingedges;
  }
  @Override
  public void addEdge(IGraphNode target, double weight) {
    outgoingedges.add(new Edge(this, target, weight));
  }
  @Override
  public Chord getNode() {
    return chord;
  }
  @Override
  public IEdge findEdgeTo(IGraphNode node) {
    for (IEdge e : outgoingedges) {
      if (e.to().equals(node)) {
        return e;
      }
    }
    return null;
  }
}
