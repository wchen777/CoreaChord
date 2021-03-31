package edu.brown.cs.student.coreachord.CoreaApp;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class CoreaApplication {
  public enum Quality {
    MAJOR7, MINOR7, MINOR7FLAT5, DOMINANT7
  }
  public enum Root {
    C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  }

  private List<String> result;

  public CoreaApplication(Chord startingchord, int numbars) {
    List<GeneratedChord> resultgenchord = this.generateChords(startingchord, numbars);
    // convert list of gen chord to list of strings.
    List<String> resultchordstringls = this.chordListToStringList(resultgenchord);
  }

  /**
   * An algorithmic method that will generate a random set of chords
   * using a random walk on the Markov Chain.
   *
   * @param startingchord starting chord
   * @param numbars number of bars
   * @return list of generated chord(s)
   * TODO: Implement & write necessary helper methods (Ashley is doing this)
   */
  private List<GeneratedChord> generateChords(Chord startingchord, int numbars) {
    if (!(numbars % 4 == 0)) { // mod 4
      return null;
    }
    return this.markovChain(startingchord, numbars); // call helper
  }

  private List<GeneratedChord> markovChain(Chord startingchord, int numbars) {
    ArrayList<Chord> stateSpace = new ArrayList<>();
    // populating Enum sets with all values in our enum definitions
    Set<Quality> qualityset = EnumSet.allOf(Quality.class);
    Set<Root> rootset = EnumSet.allOf(Root.class);
    // loop through sets, and add all possible chords to our state space
    Iterator<Quality> itr1 = qualityset.iterator();
    Iterator<Root> itr2 = rootset.iterator();
    while (itr1.hasNext()) {
      while (itr2.hasNext()) {
        stateSpace.add(new Chord(itr2.next(), itr1.next()));
      }
    }
    ArrayList<GeneratedChord> chordProgression = new ArrayList<>();
    int n = stateSpace.size();
    int[][] transitionMatrix = new int[n][n];
    this.fillTransitionMatrix(transitionMatrix);
    // will write rest of this method
    // random walk on markov chain with weights
    
    return null;
  }

  private void fillTransitionMatrix(int[][] tmat) {
    int horizontallen = tmat[0].length;
    int verticallen = tmat.length;

    double maxProbability = Integer.MAX_VALUE; // java maximum int.
    // here, I will fill the given transition matrix.
  }

  /**
   * Helper method that will convert chord list to string list
   * after generateChords() method is called.
   *
   * @param resultgenchord a list to convert
   * @return a list of strings to send to frontend
   * TODO: Implement this method
   */
  private List<String> chordListToStringList(List<GeneratedChord> resultgenchord) {
    return null;
  }

  /**
   * Accessor method for resulting string list
   * @return result (list of strings)
   */
  public List<String> getResult() {
    return result;
  }
}
