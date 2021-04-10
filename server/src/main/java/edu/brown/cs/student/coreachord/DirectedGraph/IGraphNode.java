package edu.brown.cs.student.coreachord.DirectedGraph;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;

import java.util.List;

/*
 * Interface of the Graph Node.
 */
public interface IGraphNode {
  /**
   * @return - The edges corresponding to th GraphNode.
   */
  List<IEdge> getEdges();
  /**
   * @return - The Node in this GraphNode, should be type Dimensions.
   */
  Chord getNode(); //Not Extensible, adjust later
  /**
   * @param node - The Node to find an specific Edge to
   * @return - The Edge connecting this GraphNode to the given GraphNode
   * if applicable.
   */
  IEdge findEdgeTo(IGraphNode node);
  /**
   * @param target - the target node for this edge
   * @param weight - the weight between the two nodes
   */
  void addEdge(IGraphNode target, double weight);
}
