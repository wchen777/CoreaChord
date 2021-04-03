package edu.brown.cs.student.coreachord.CoreaApp;

import org.checkerframework.checker.units.qual.A;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class CoreaApplication {
  public enum Quality { // 4 possible qualities
    MAJOR7, MINOR7, MINOR7FLAT5, DOMINANT7
  }
  public enum Root { // 12 possible roots
    C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  }

  private List<GeneratedChord> result;

  public CoreaApplication(Chord startingchord, int numbars) {
    result = this.generateChords(startingchord, numbars);
    // convert list of gen chord to list of strings.
  }

  /**
   * An algorithmic method that will generate a random set of chords
   * using a random walk on the Markov Chain.
   *
   * @param startingchord starting chord
   * @param numbars number of bars
   * @return list of generated chord(s)
   */
  private List<GeneratedChord> generateChords(Chord startingchord, int numbars) {
    if (!(numbars == 8) && !(numbars == 16) && !(numbars == 32)) {
      return null; // check for specific inputs, if not one of those, return null.
    }
    return this.markovChain(startingchord, numbars); // call helper method
  }

  private List<GeneratedChord> markovChain(Chord startingchord, int numbars) {
    ArrayList<Chord> stateSpace = new ArrayList<>();
    // populating Enum sets with all values in our enum definitions
    Set<Quality> qualityset = EnumSet.allOf(Quality.class);
    Set<Root> rootset = EnumSet.allOf(Root.class);
    // loop through sets, and add all possible chords to our state space
    Iterator<Quality> itr1 = qualityset.iterator();
    Iterator<Root> itr2 = rootset.iterator();
    ArrayList<Quality> qualist = new ArrayList<>();
    ArrayList<Root> rootlist = new ArrayList<>();
    while (itr2.hasNext()) { // root (c, d, etc.)
      rootlist.add(itr2.next()); // add all elements to list
    }
    while (itr1.hasNext()) { // quality (major, minor...)
      qualist.add(itr1.next());
    }
    // ... now add everything to state space using a double for loop!
    for (int i = 0; i < rootlist.size(); i++) { // root
      Root nextroot = rootlist.get(i);
      for (int j = 0; j < qualist.size(); j++) { // quality
        Quality nextquality = qualist.get(j);
        stateSpace.add(new Chord(nextroot, nextquality));
      }
    }

    ArrayList<GeneratedChord> chordProgression = new ArrayList<>();
    int n = stateSpace.size(); // 48 (12*4)
    int[][] transitionMatrix = new int[n][n];
    this.fillTransitionMatrix(transitionMatrix);
    int i = 0;
    Chord currchord = startingchord;
    double currlength = Math.random() * 10; // how do we handle length? (discuss w teammates)
    GeneratedChord currgenchord = new GeneratedChord(currchord, currlength);
    // random walk on markov chain with weights
    while (i < numbars) {
      int currrowstart = currchord.getRoot().ordinal() * 4; // start from 0
      int nextchordindex = this.handleEachQualityCase(transitionMatrix,
          currchord, currgenchord, currrowstart,
          chordProgression); // update arraylist (progression)
      currchord = this.getCorrespondingChord(transitionMatrix, nextchordindex); // update currchord
      currgenchord = new GeneratedChord(currchord, currlength); // update currgenchord
      // update length?
      i++; // increment i
    }
    return chordProgression;
  }

  private void fillTransitionMatrix(int[][] tmat) {
    int horizontallen = tmat[0].length;
    int verticallen = tmat.length;

    double maxProbability = Integer.MAX_VALUE; // java maximum int.
    // here, I will fill the given transition matrix.
  }

  /*
   * Below are some helper methods for handling the random walk on markov chain.
   */
  private int handleEachQualityCase(int[][] tmat, Chord currchord, GeneratedChord currgenchord,
                                       int currrowstart, ArrayList<GeneratedChord> chordProgression) {
    chordProgression.add(currgenchord); // add to the progression
    int currow = currrowstart + currchord.getQuality().ordinal(); // figure out which row we're on
    int nextchordindex = this.randomlySelectIndex(tmat, currow);
    double probability = tmat[currow][nextchordindex]; // probability (?)
    return nextchordindex; // return next chord index
  }

  /*
   * A helper method that randomly selects an index in a
   * particular given row.
   */
  private int randomlySelectIndex(int[][] tmat, int row) {
    int numcols = tmat[row].length; // get number of columns
    int randomindex = this.getRandomInt(numcols);
    return randomindex;
  }

  /*
   * Helper method that gets a random integer
   * within a range. (Uses Math.random())
   * TODO: potential indexing bug here, double check
   */
  private int getRandomInt(int max) {
    return (int) Math.floor(Math.random() * max);
  }

  /**
   * Helper method that gives you corresponding chord
   * based on the index in transition matrix.
   * (Handles chord-index correspondence in the transition
   * matrix)
   * @param index
   * @return correspoinding Chord
   */
  private Chord getCorrespondingChord(int[][] tmat, int index) {
    // Root order: C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    // Quality order: MAJOR7, MINOR7, MINOR7FLAT5, DOMINANT7
    int rootordinal = index / 4; // integer division to get root ordinal
    int qualityordinal = index % 4; // mod to get quality ordinal (get remainder)
    Root root = Root.values()[rootordinal];
    Quality quality = Quality.values()[qualityordinal];
    Chord nextchord = new Chord(root, quality);
    return nextchord;
  }

  /**
   * Accessor method for resulting string list
   * @return result (list of strings)
   */
  public List<GeneratedChord> getResult() {
    return result;
  }
}
