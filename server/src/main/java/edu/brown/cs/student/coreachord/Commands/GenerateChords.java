package edu.brown.cs.student.coreachord.Commands;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.CoreaApp.GeneratedChord;
import edu.brown.cs.student.coreachord.REPL.Executable;

import java.util.List;

/**
 * Coomand class for the REPL. Associated with the generate-chords command
 */
public class GenerateChords implements Executable {

  /**
   * Instance of coreaApp to call generateChords.
   */
  private CoreaApplication coreaApp;
  /**
   * The output of generateChords to return to the console.
   */
  private List<GeneratedChord> result;

  /**
   * @param c - Instance of CoreaApp.
   */
  public GenerateChords(CoreaApplication c) {
    this.coreaApp = c;
  }

  /**
   * Simple getter method.
   * @return results
   */
  public List<GeneratedChord> getResult() {
    return result;
  }
  @Override
  public void execute(String[] input) {
    if (input.length != 6) {
      System.out.println("ERROR: Incorrect number of arguments for generate-chords");
      return;
    }
    try {
      Chord inputChord = new Chord(CoreaApplication.Root.valueOf(input[1]),
              CoreaApplication.Quality.valueOf(input[2]));
      coreaApp.generateChords(inputChord, Integer.parseInt(input[3]),
              CoreaApplication.Diversity.valueOf(input[4]), CoreaApplication.Brightness.valueOf(input[5]));
      result = coreaApp.getResult();
      for (GeneratedChord gChord: result) {
        System.out.println("\n" + gChord);
      }

    } catch (IndexOutOfBoundsException i) {
      System.out.println("ERROR: incorrect input arguments for generate-chords command");
    } catch (IllegalArgumentException e) {
      System.out.println("ERROR: inappropriate root or quality");
    }
  }
}
