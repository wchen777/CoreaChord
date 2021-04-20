package edu.brown.cs.student.coreachord.Analyzer;

public class ComplexityScore {
  /**
   * The middle measure number in the measure window.
   */
  private final int x;
  /**
   * The secret complexity score from 0 to 1, 0 being
   * least complex and 1 being most complex.
   */
  private final double y;
  /**
   * @param x - The middle meeasure number in the measure window
   * @param y - number from 0 to 1
   */
  public ComplexityScore(int x, double y) {
    this.x = x;
    this.y = y;
  }
  /**
   * @return the instance variable x.
   */
  public int getX() {
    return x;
  }
  /**
   * @return the instance variable y.
   */
  public double getY() {
    return y;
  }
}
