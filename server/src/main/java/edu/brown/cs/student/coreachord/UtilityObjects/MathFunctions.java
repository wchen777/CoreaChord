package edu.brown.cs.student.coreachord.UtilityObjects;

public class MathFunctions {

  public static double pseudoSigmoid(double x) {
    double denominator = 1 + Math.exp(-6 * (x - 0.4));
    return 1 / denominator;
  }
}
