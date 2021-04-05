package edu.brown.cs.student.coreachord.DirectedGraph;

public class Edge implements IEdge {
  private final IGraphNode start;
  private final IGraphNode end;
  private final double weight;
  public Edge(IGraphNode start, IGraphNode end, double weight) {
    this.start = start;
    this.end = end;
    this.weight = weight;
  }
  @Override
  public IGraphNode to() {
    return end;
  }
  @Override
  public IGraphNode from() {
    return start;
  }
  @Override
  public double getWeight() {
    return weight;
  }
}
