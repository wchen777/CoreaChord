package edu.brown.cs.student.coreachord.REPL;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;

/**
 * Interactive REPL for testing purposes.
 */
public class REPL {
  private final HashMap<String, Executable> commands;

  /**
   * @param commands - list of repl commands mapped to the class that class that
   *                 has said commands implemented
   */
  public REPL(HashMap<String, Executable> commands) {
    this.commands = commands;
    run();
  }

  /**
   * Begins the REPL
   */
  public void run() {
    String line = "";
    try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
      while ((line = reader.readLine()) != null) {
        String[] input = line.split(" ");
        Executable app = commands.get(input[0]);
        if (app != null) {
          app.execute(input);
        } else {
          System.out.println("ERROR: Command DNE :/");
        }
      }
    } catch (IOException e) {
      System.out.println("ERROR: Buffered Reader error");
    }
  }
}
