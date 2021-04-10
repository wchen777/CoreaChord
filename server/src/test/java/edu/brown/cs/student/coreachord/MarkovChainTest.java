package edu.brown.cs.student.coreachord;

import edu.brown.cs.student.coreachord.CoreaApp.Chord;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.CoreaApp.GeneratedChord;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.Assert;

import java.util.List;

public class MarkovChainTest {
  private CoreaApplication coreaapp8bars; // 8 bars
  private CoreaApplication coreaapp16bars; // 16 bars
  private CoreaApplication coreaapp32bars; // 32 bars
  private CoreaApplication coreaappinvalid; // invalid app

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
//    CoreaApplication.Root rootC = CoreaApplication.Root.C;
//    CoreaApplication.Root rootEb = CoreaApplication.Root.Eb;
//    CoreaApplication.Root rootG = CoreaApplication.Root.G;
//    CoreaApplication.Root rootBb = CoreaApplication.Root.Bb;
//
//    // initialize starting qualities
//    CoreaApplication.Quality qualitymaj = CoreaApplication.Quality.MAJOR7;
//    CoreaApplication.Quality qualitymin = CoreaApplication.Quality.MINOR7;
//    CoreaApplication.Quality qualityminorflat = CoreaApplication.Quality.MINOR7FLAT5;
//    CoreaApplication.Quality qualitydominant = CoreaApplication.Quality.DOMINANT7;

//    Chord CMajor = new Chord(rootC, qualitymaj);
//    Chord EbMinor = new Chord(rootEb, qualitymin);
//    Chord GMinorFlat = new Chord(rootG, qualityminorflat);
//    Chord BbDominant = new Chord(rootBb, qualitydominant);

    // TODO: change this
    coreaapp8bars = new CoreaApplication(null); // 8-bar app
    coreaapp16bars = new CoreaApplication(null); // 16-bar app
    coreaapp32bars = new CoreaApplication(null); // 32-bar app
    coreaappinvalid = new CoreaApplication(null); // invalid bar param

    coreaapp8bars.execute("generate-chords C MAJOR7 8");
    coreaapp16bars.execute("generate-chords Eb MINOR7 16");
    coreaapp32bars.execute("generate-chords G MAJOR7FLAT5 32");
    coreaappinvalid.execute("generate-chords Bb DOMINANT7 5");

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
