package edu.brown.cs.student.coreachord.DirectedGraph;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;

import java.util.List;

/*
 * Interface of the Graph Edge.
 */
public interface IEdge {
  IGraphNode to();
  IGraphNode from();
  Double getWeight();
}
