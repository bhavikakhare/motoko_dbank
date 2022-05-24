import Debug "mo:base/Debug" ;
import Time "mo:base/Time" ;
import Float "mo:base/Float" ;

actor DBank {

  stable var currentValue: Float = 300 ;
  stable var startTime = Time.now() ;
  stable var interest: Float = 0.001 ;
  // currentValue := 100 ;
  Debug.print(debug_show(currentValue)) ;
  
  public func reset_balance( amount: Float ) {
    startTime := Time.now() ;
    currentValue := amount ;
    Debug.print(debug_show("restart")) ;
  };

  public func reset_interest( new_interest: Float ) {
    interest := new_interest ;
  };

  public query func getInterestRate(): async Float {
    return interest ;
  };

  public func topUp( amount: Float ) {
    currentValue += amount ;
    Debug.print(debug_show(currentValue)) ;
  };

  public func withdraw( amount: Float ) {
    let temporaryvalue: Float = currentValue - amount ;
    if ( temporaryvalue>=0 ) {
      currentValue -= amount ;
      Debug.print(debug_show(currentValue)) ;
    } else {
      Debug.print("ERROR: amount too large") ;
    }
  };

  public query func checkBalance(): async Float {
    return currentValue ;
  };

  public func compound() {
    let currentTime = Time.now() ;
    let elapsedTime_ms = currentTime - startTime ;
    let elapsedTime_s = elapsedTime_ms/1000000000 ;
    currentValue := currentValue*((1+interest)**Float.fromInt(elapsedTime_s)) ;
    startTime := currentTime ;
  };

  // topUp() ;

};


