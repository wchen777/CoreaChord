package edu.brown.cs.student.coreachord.CSV;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

public class CSVReader {


  public CSVReader() {

  }

//    public void invalidFilePathHandler() {
//        System.out.println("ERROR: invalid file.");
//    }

  /**.
   * convert a csv file to a list of list of strings
   * @return - list of list of strings of raw CSV data
   */
  public List<String[]> parseCSV(String filepath) {
    List<String[]> csvList = new ArrayList<>();

    try {
      BufferedReader csvReader = new BufferedReader(new FileReader(filepath));

      String line = csvReader.readLine();

      while (line != null) {
        // get string array from csv split
        String[] split = line.split(",");
        csvList.add(split);
        line = csvReader.readLine();
      }

      csvReader.close();

    } catch (Exception e) {
      System.err.println("Invalid CSV");
    }
    return csvList;
  }

}
