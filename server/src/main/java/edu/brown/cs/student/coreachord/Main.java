package edu.brown.cs.student.coreachord;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;
import edu.brown.cs.student.coreachord.Analyzer.AnalyzerApplication;
import edu.brown.cs.student.coreachord.Analyzer.ComplexityScore;
import edu.brown.cs.student.coreachord.Analyzer.GeneratedCadence;
import edu.brown.cs.student.coreachord.CSV.CSVReader;
import edu.brown.cs.student.coreachord.Commands.GenerateChords;
import edu.brown.cs.student.coreachord.CoreaApp.Chord;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.CoreaApp.GeneratedChord;
import edu.brown.cs.student.coreachord.CoreaApp.TransitionMatrix;
import edu.brown.cs.student.coreachord.REPL.Executable;
import edu.brown.cs.student.coreachord.REPL.REPL;
import edu.brown.cs.student.coreachord.UtilityObjects.Tuple;
import joptsimple.OptionParser;
import joptsimple.OptionSet;
import org.json.JSONArray;
import org.json.JSONObject;
import spark.ExceptionHandler;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import javax.annotation.processing.Generated;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class Main {

  private static final int DEFAULT_PORT = 4567;
  private static final Gson GSON = new Gson();
  private static Map<String, String> QUALITIES;
  private static GenerateChords generateChordsApp;
  private final String[] args;
  private static AnalyzerApplication analyzer;

  public static void main(String[] args) {
    new Main(args).run();
  }

  private Main(String[] args) {
    this.args = args;
  }

  private void run() {
    // Setup the QUALITIES map
    QUALITIES = new HashMap<>();
    QUALITIES.put("7", "DOMINANT7");
    QUALITIES.put("-7", "MINOR7");
    QUALITIES.put("maj7", "MAJOR7");
    QUALITIES.put("-7b5", "MINOR7FLAT5");

    // Parse command line arguments
    OptionParser parser = new OptionParser();
    parser.accepts("gui");
    parser.accepts("port").withRequiredArg().ofType(Integer.class)
      .defaultsTo(DEFAULT_PORT);
    OptionSet options = parser.parse(args);

    if (options.has("gui")) {
      runSparkServer((int) options.valueOf("port"));
    }

    // read in transition matrix csvs
    CSVReader csv = new CSVReader();

    List<String[]> lowDivCSV = csv.parseCSV("../scripts/t-mat-low.csv");
    TransitionMatrix lowDiversity = new TransitionMatrix(lowDivCSV);
    List<String[]> medDivCSV = csv.parseCSV("../scripts/t-mat-med.csv");
    TransitionMatrix medDiversity = new TransitionMatrix(medDivCSV);
    List<String[]> highDivCSV = csv.parseCSV("../scripts/t-mat-high.csv");
    TransitionMatrix highDiversity = new TransitionMatrix(highDivCSV);

    System.out.println("Welcome to our REPL\nCurrently we only support "
      + "the following commands:\n"
      + "generate-chords <ROOT> <QUALITY> <NUMBARS> <DIVERSITY>");

    HashMap<String, Executable> commands = new HashMap<>();

    CoreaApplication coreaApp = new CoreaApplication(lowDiversity, medDiversity, highDiversity);

    generateChordsApp = new GenerateChords(coreaApp);
    commands.put("generate-chords", generateChordsApp);

    analyzer = new AnalyzerApplication();

    REPL repl = new REPL(commands);

  }

  /*
   * Setting up spark server with GET requests
   */
  private void runSparkServer(int port) {
    Spark.port(port);
    Spark.externalStaticFileLocation("build");

    // TODO Code below copied from other projects, to handle the CORS error stuff
    Spark.options("/*", (request, response) -> {
      String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
      }
      return "OK";
    });

    Spark.before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
    Spark.exception(Exception.class, new ExceptionPrinter());

    // TODO: CORS STUFF (Maxime: I think I handled this in the above code?)

    // Setup Spark Routes
    Spark.post("/generate", new GenerateChordsHandler());
    Spark.post("/analyze", new AnalyzeChordsHandler());

    // return static build directory's index.html file for server side rendering
    Spark.get("/", (request, response) -> {
      response.redirect("index.html");
      return null;
    });
    Spark.notFound(((request, response) -> {
      response.redirect("index.html");
      return null;
    }));
  }


  /**
   * Display an error page when an exception occurs in the server.
   */
  private static class ExceptionPrinter implements ExceptionHandler {
    @Override
    public void handle(Exception e, Request req, Response res) {
      res.status(500);
      StringWriter stacktrace = new StringWriter();
      try (PrintWriter pw = new PrintWriter(stacktrace)) {
        pw.println("<pre>");
        e.printStackTrace(pw);
        pw.println("</pre>");
      }
      res.body(stacktrace.toString());
    }
  }


  /**
   * Handles requests made for a route.
   */
  private static class GenerateChordsHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      String startChord = data.getString("startChord");
      String chordDiversity = data.getString("chordDiversity");
      int numBars = data.getInt("numBars");
      String progBrightness = data.getString("chordBrightness"); // light or dark
      // System.out.println("data received from frontend: " + startChord + " " + chordDiversity + " " + numBars + " " + progTheme);
      String progRoot = startChord.substring(0,1);
      String progQuality = startChord.substring(1);
      if (startChord.charAt(1) == 'b'){
        progRoot = startChord.substring(0,2);
        progQuality = startChord.substring(2);
      }
      // Convert the progQuality to enum
      progQuality = QUALITIES.get(progQuality);

      String[] command = {"generate-chords", progRoot, progQuality, Integer.toString(numBars), chordDiversity, progBrightness};

      // Call the app to generate the chords
      generateChordsApp.execute(command);
      List<GeneratedChord> results = generateChordsApp.getResult();

      // Convert the GeneratedChord List into JSON
      JsonElement element = GSON.toJsonTree(results, new TypeToken<List<GeneratedChord>>(){}.getType());
      return element.getAsJsonArray();
    }
  }

  /**
   * Handles requests for chord progression analyzing
   * Returns a generated chords list from frontend
   */
  private static class AnalyzeChordsHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONArray data = new JSONArray(request.body()); // get a list of chord progression
      List<GeneratedChord> genChordList = new ArrayList<>();


      for (int i = 0; i < data.length(); ++i) {
        JSONObject curr = data.getJSONObject(i); // get current object
//        JSONArray currArr = data.getJSONArray(i); // for another looping
        int length = curr.getInt("chordlength"); // get chord length for current entry
//        JSONArray chordInfoArr = curr.getJSONArray("chorddata"); // get another JSON array for chord info.
        JSONObject curr2 = curr.getJSONObject("chorddata"); // get current nested json array containing chord info
        CoreaApplication.Quality quality = CoreaApplication.Quality.valueOf(curr2.getString("quality"));
        CoreaApplication.Root root = CoreaApplication.Root.valueOf(curr2.getString("root"));
        Chord c = new Chord(root, quality);
        GeneratedChord generatedChord = new GeneratedChord(c, length);
        genChordList.add(generatedChord); // add to preexisting list of generated chords
      }

      Tuple<List<ComplexityScore>,List<GeneratedCadence>> results = analyzer.generate(genChordList);

      JsonElement element1 = GSON.toJsonTree(results.getField1(), new TypeToken<List<ComplexityScore>>(){}.getType());
      JsonElement element2 = GSON.toJsonTree(results.getField2(), new TypeToken<List<GeneratedCadence>>(){}.getType());

      JSONObject toSend = new JSONObject();
      toSend.put("complexities", element1.getAsJsonArray());
      toSend.put("cadences", element2.getAsJsonArray());

      return toSend; // return a generated list of chords
    }
  }
}
