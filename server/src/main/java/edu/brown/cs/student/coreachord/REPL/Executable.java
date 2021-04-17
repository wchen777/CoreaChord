package edu.brown.cs.student.coreachord.REPL;

/**
 * Works in conjunction with the REPL. It passes on an input to classes with this
 * implemented to call associated functions depending on the command
 * inputted.
 */
public interface Executable {
  /**
   * @param input  - the command given by the user
   */
  void execute(String[] input);
}
