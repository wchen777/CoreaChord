package edu.brown.cs.student.coreachord;

import edu.brown.cs.student.coreachord.CoreaApp.CoreaApplication;
import edu.brown.cs.student.coreachord.REPL.Executable;
import edu.brown.cs.student.coreachord.REPL.REPL;
import joptsimple.OptionParser;
import joptsimple.OptionSet;
import spark.Spark;

import java.util.HashMap;

public final class Main {

  private static final int DEFAULT_PORT = 4567;
  private String[] args;

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
    // TODO: CORS STUFF
//    Spark.exception(Exception.class, new ExceptionPrinter());

//    FreeMarkerEngine freeMarker = createEngine();

    // Setup Spark Routes
  }

}
