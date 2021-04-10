package edu.brown.cs.student.coreachord.UtilityObjects;

/**
 * class to represent a tuple of any two object types.
 * @param <P> type 1
 * @param <Q> type 2
 */
public class Tuple<P, Q> {
  private final P field1;
  private final Q field2;

  /**
   * constructor for tuple.
   * @param field1 - first object
   * @param field2 - second object
   */
  public Tuple(P field1, Q field2) {
    this.field1 = field1;
    this.field2 = field2;
  }

  /**
   * get first object.
   * @return - first object
   */
  public P getField1() {
    return this.field1;
  }

  /**
   * get second object.
   * @return - second object
   */
  public Q getField2() {
    return this.field2;
  }
}

