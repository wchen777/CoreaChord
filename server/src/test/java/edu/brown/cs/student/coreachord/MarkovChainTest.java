package edu.brown.cs.student.coreachord;

import edu.brown.cs.student.coreachord.CSV.CSVReader;
import edu.brown.cs.student.coreachord.Commands.GenerateChords;
import edu.brown.cs.student.coreachord.CoreaApp.Chord;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.CoreaApp.GeneratedChord;
import edu.brown.cs.student.coreachord.CoreaApp.TransitionMatrix;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.Assert;

import java.util.Arrays;
import java.util.List;

public class MarkovChainTest {
  private GenerateChords coreaapp8bars; // 8 bars
  private GenerateChords coreaapp16bars; // 16 bars
  private GenerateChords coreaapp32bars; // 32 bars
  private GenerateChords coreaappinvalid; // invalid app

  @Before
  public void setUp() { // initialize
    this.setUpCoreaApps();
  }

  @After
  public void tearDown() {
    coreaapp8bars = null;
    coreaapp16bars = null;
    coreaapp32bars = null;
    coreaappinvalid = null;
  }

  @Test
  public void testGenerateChords() {
    assert(coreaapp8bars.getResult().size() <= 8);
    assert(coreaapp16bars.getResult().size() <= 16);
    assert(coreaapp32bars.getResult().size() <= 32);
    assert(coreaappinvalid.getResult().size() == 0); //changed from null
  }

  private void setUpCoreaApps() {
    // initialize starting chords
    System.out.println("setting up corea apps...");
    // read in transition matrix csvs
    CSVReader csv = new CSVReader();

    List<String[]> lowDivCSV = csv.parseCSV("../scripts/t-mat-low.csv");
    TransitionMatrix lowDiversity = new TransitionMatrix(lowDivCSV);
    List<String[]> medDivCSV = csv.parseCSV("../scripts/t-mat-med.csv");
    TransitionMatrix medDiversity = new TransitionMatrix(medDivCSV);
    List<String[]> highDivCSV = csv.parseCSV("../scripts/t-mat-high.csv");
    TransitionMatrix highDiversity = new TransitionMatrix(highDivCSV);

    CoreaApplication coreaApp = new CoreaApplication(lowDiversity, medDiversity, highDiversity);

    coreaapp8bars = new GenerateChords(coreaApp); // 8-bar app
    coreaapp16bars = new GenerateChords(coreaApp); // 16-bar app
    coreaapp32bars = new GenerateChords(coreaApp); // 32-bar app
    coreaappinvalid = new GenerateChords(coreaApp); // invalid bar param

    coreaapp8bars.execute(new String[]{"generate-chords", "C", "MAJOR7", "8", "Low", "Regular"});
    coreaapp16bars.execute(new String[]{"generate-chords", "Eb", "MINOR7", "16", "Low", "Regular"});
    coreaapp32bars.execute(new String[]{"generate-chords", "G", "MINOR7FLAT5", "32", "Low", "Regular"});
    coreaappinvalid.execute(new String[]{"generate-chords", "Bb", "DOMINANT7", "5", "Low", "Regular"});

    // checking the contents of 8-bar corea app
    System.out.println("8-bar corea app chords: ");
    for (int i = 0; i < coreaapp8bars.getResult().size(); i++) {
      List<GeneratedChord> result = coreaapp8bars.getResult();
      System.out.println("element " + i + " root: "+result.get(i).getChorddata().getRoot());
      System.out.println("element " + i + " quality: "+result.get(i).getChorddata().getQuality());
    }
    System.out.println(" ");
    System.out.println(" ");
    // checking the contents of 16-bar corea app
    System.out.println("16-bar corea app chords: ");
    for (int i = 0; i < coreaapp16bars.getResult().size(); i++) {
      List<GeneratedChord> result = coreaapp16bars.getResult();
      System.out.println("element " + i + " root: "+result.get(i).getChorddata().getRoot());
      System.out.println("element " + i + " quality: "+result.get(i).getChorddata().getQuality());
    }
  }


}
