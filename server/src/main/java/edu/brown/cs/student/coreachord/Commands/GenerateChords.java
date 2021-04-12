package edu.brown.cs.student.coreachord.Commands;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.CoreaApp.GeneratedChord;
import edu.brown.cs.student.coreachord.CoreaApp.TransitionMatrix;
import edu.brown.cs.student.coreachord.REPL.Executable;

import java.util.List;

public class GenerateChords implements Executable {

  private static CoreaApplication callGenerateChords;
  private List<GeneratedChord> result;
  public GenerateChords(TransitionMatrix transitionMatrix) {
    callGenerateChords = new CoreaApplication(transitionMatrix);
  }

  /**
   * Simple getter method
   * @return results
   */
  public List<GeneratedChord> getResult() {
    return result;
  }
  @Override
  public void execute(String[] input) {
    if (input.length != 4) {
      System.out.println("ERROR: Incorrect number of arguments for generate-chords");
      return;
    }
    try {
      Chord inputChord = new Chord(CoreaApplication.Root.valueOf(input[1]), CoreaApplication.Quality.valueOf(input[2]));
      callGenerateChords.generateChords(inputChord, Integer.parseInt(input[3]));
      result = callGenerateChords.getResult();
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
