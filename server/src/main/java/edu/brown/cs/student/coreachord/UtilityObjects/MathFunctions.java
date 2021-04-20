package edu.brown.cs.student.coreachord.UtilityObjects;

/**
 * Functions applied to our probabilities from our transition matrices.
 */
public class MathFunctions {

  /**
   * @param x - an input to the pseudoSigmoid math function [f(x)]
   * @return input transformed by the altered sigmoid function.
   */
  @SuppressWarnings("checkstyle:MagicNumber")
  public static double pseudoSigmoid(double x) {
    double denominator = 1 + Math.exp(-6 * (x - 0.4));
    return 1 / denominator;
  }
}
