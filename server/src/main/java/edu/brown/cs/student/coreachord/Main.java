package edu.brown.cs.student.coreachord;

import joptsimple.OptionParser;
import joptsimple.OptionSet;
import spark.Spark;

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

  }

  /*
   * Setting up spark server with GET requests
   */
  private void runSparkServer(int port) {
    Spark.port(port);
    Spark.externalStaticFileLocation("src/main/resources/static");
//    Spark.exception(Exception.class, new ExceptionPrinter());

//    FreeMarkerEngine freeMarker = createEngine();

    // Setup Spark Routes
  }

}
