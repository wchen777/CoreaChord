package edu.brown.cs.student.coreachord.CoreaApp;
/*
 * Matrix Generator interface that creates a
 * custom matrix depending on which diversity level
 * the user selects.
 */
public interface MatrixGenerator {
  /**
   * A method generators must implement, which
   * returns a custom transition matrix.
   * @return - a generated transition matrix
   */
  TransitionMatrix generateMatrix();
}
