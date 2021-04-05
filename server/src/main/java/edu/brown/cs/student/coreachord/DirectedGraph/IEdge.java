package edu.brown.cs.student.coreachord.DirectedGraph;

/*
 * Interface of the Graph Edge.
 */
public interface IEdge {
  /**
   * @return the GraphNode this edge points to.
   */
  IGraphNode to();
  /**
   * @return the GraphNode this edge originates from.
   */
  IGraphNode from();
  /**
   * @return the weight of the edge between two GraphNodes.
   */
  double getWeight();
}
