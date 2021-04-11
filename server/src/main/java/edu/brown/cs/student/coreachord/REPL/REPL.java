package edu.brown.cs.student.coreachord.REPL;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;

/**
 *
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


  public void addCommand(Executable e) {

  }

  /**
   * Begins the REPL.
   */
  public void run() {
    String line = "";
    try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
      while ((line = reader.readLine()) != null) {
        String firstWord = line.split(" ")[0];
        commands.get(firstWord).execute(line);
      }
    } catch (IOException e) {
      System.out.println("ERROR: Buffered Reader error");
    }
  }
}
