/*              LedRGB       */
const byte PIN_LED_R = 4;
const byte PIN_LED_G = 3;
const byte PIN_LED_B = 2;
const byte COLOR_BLUE = 0b001;
const byte COLOR_WELLOW = 0b110;
const byte COLOR_MAGENTA = 0b101;

#define couvercle 5
#define boutonSecour 7
#define tempLaps 60000

/*              variables           */
boolean allumageRequis = false, couvercleOpen=false, btApp=false, etat=false, btnsecapp=false;
byte couleur=0;


void timeManager() {
  static unsigned long prevMillis = 0;
  unsigned long currMillis = millis();
  if (currMillis - prevMillis >= tempLaps) {
    prevMillis = currMillis;
    checkVPS();
  }
}
void checkVPS(){
  allumageRequis=false;// check via VPS
  couleur=0;
}
void upInfo(){
  // up dans VPS
  couvercleOpen=false;
}
void displayColor(byte couleurD) {
  // Assigne l'état des broches
  // Version cathode commune
  digitalWrite (PIN_LED_R, bitRead(couleurD, 2));
  digitalWrite (PIN_LED_G, bitRead(couleurD, 1));
  digitalWrite (PIN_LED_B, bitRead(couleurD, 0));
}
void boutonClicked()
{
  if(etat)
  {
    allumageRequis=false;
    couleur=0;
  }
  else
  {
    allumageRequis=true;
    couleur=COLOR_MAGENTA;
  }
  etat=!etat;
}
void setup() {
  /*              beauds+ pins        */
  Serial.begin(9600);
  pinMode(boutonSecour, INPUT_PULLUP);
  pinMode(PIN_LED_R, OUTPUT);
  pinMode(PIN_LED_G, OUTPUT);
  pinMode(PIN_LED_B, OUTPUT);
  pinMode(couvercle, INPUT_PULLUP);
  //0V pour led et btn
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  digitalWrite(5, 0);
  digitalWrite(6, 0);
  
  displayColor(0b100);
  delay(500);
  displayColor(0b010);
  delay(500);
  displayColor(0b001);
  delay(500);
  displayColor(0b111);
  delay(500);
  displayColor(0b000);
  
}

void loop() {
  timeManager();
  if(!digitalRead(boutonSecour) && btApp==false){boutonClicked();btApp=true;}
  if(btnsecapp=digitalRead(boutonSecour)){btApp=false;}
  couvercleOpen=digitalRead(couvercle);
  displayColor(0b000);
  if(allumageRequis)
  {
    displayColor(couleur);
    if(couvercleOpen)
    {
      displayColor(0b000);
      upInfo();
    }
  }
}
