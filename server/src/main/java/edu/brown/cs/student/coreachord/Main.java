package edu.brown.cs.student.coreachord;

import com.google.gson.Gson;
import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.REPL.Executable;
import edu.brown.cs.student.coreachord.REPL.REPL;
import joptsimple.OptionParser;
import joptsimple.OptionSet;
import org.json.JSONObject;
import spark.ExceptionHandler;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public final class Main {
  // TODO we probably want to remove the target/ directory from our Github repo, and add it to the .gitignore

  private static final int DEFAULT_PORT = 4567;
  private static final Gson GSON = new Gson();
  private final String[] args;

  public static void main(String[] args) {
    new Main(args).run();
  }

  private Main(String[] args) {
    this.args = args;
  }

  private void run() {
    // Parse command line arguments
    OptionParser parser = new OptionParser();
    parser.accepts("gui");
    parser.accepts("port").withRequiredArg().ofType(Integer.class)
      .defaultsTo(DEFAULT_PORT);
    OptionSet options = parser.parse(args);
    if (options.has("gui")) {
      runSparkServer((int) options.valueOf("port"));
    }

    System.out.println("Welcome to our REPL\nCurrently we only support "
      + "the following commands:\n"
      + "generate-chords <ROOT> <QUALITY> <NUMBARS>");
    HashMap<String, Executable> commands = new HashMap<>();
    CoreaApplication coreaApp = new CoreaApplication();
    commands.put("generate-chords", coreaApp);
    REPL repl = new REPL(commands);
  }

  /*
   * Setting up spark server with GET requests
   */
  private void runSparkServer(int port) {
    Spark.port(port);
    Spark.externalStaticFileLocation("src/main/resources/static");

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

    // TODO: CORS STUFF (Maxime: I think I handled this TODO?)

    // Setup Spark Routes
    Spark.post("/generate", new GenerateChordsHandler());
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
      // System.out.println("data received from frontend: " + startChord + " " + chordDiversity + " " + numBars);
      //TODO how are we planning to get the roots and qualities from the data passed from the frontend?
      // (see below)
      String progRoot = "C";
      String progQuality = "MAJOR7";
      String command = "generate-chords " + progRoot + " " + progQuality + " " + numBars;
      List<String> results = new ArrayList<>();
      // TODO get proper results
      results.add("E-7");
      results.add("A7");
      results.add("C-7");
      results.add("F7");
      return GSON.toJson(results);

    }
  }

}
