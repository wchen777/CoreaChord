package edu.brown.cs.student.coreachord.DirectedGraph;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;

import java.util.List;

/*
 * Interface of the Graph Node.
 */
public interface IGraphNode {
  List<Edge> getEdges();
  Chord getChord();
}
