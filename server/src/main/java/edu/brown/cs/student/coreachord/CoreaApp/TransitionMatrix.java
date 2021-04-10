package edu.brown.cs.student.coreachord.CoreaApp;

import java.util.List;

public class TransitionMatrix {
    private double[][] tmat;
    private int n; // number of chords
    public TransitionMatrix(int numchords) {
        n = numchords;
        tmat = new double[n][n];
    }

    /*
     * Method for filling transition matrix.
     * It'll take in a list of array of strings that contain
     * probability data for each row of the transition matrix.
     * The probabilities list of string arrays come from
     * csv parsing.
     */
    private void fillTransitionMatrix(double[][] tmat, List<String[]> probabilities) {
        int horizontallen = tmat[0].length;
        int verticallen = tmat.length;
        double maxProbability = 1; // maximum probability value
        for (int i = 0; i < verticallen; i++) {
            for (int j = 0; j < horizontallen; j++) {
                String currprobstring = probabilities.get(i)[j]; // get individual probability
                tmat[i][j] = Double.parseDouble(currprobstring); // store into each index of tmat
            }
        }
    }

    /*
     * Accessor methods
     */
    public int getNumChords() {
        return n;
    }

    public double[][] getTransitionMatrix() {
        return tmat;
    }
}
