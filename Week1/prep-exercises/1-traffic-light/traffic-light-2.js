"use strict";

const trafficLight = {
  possibleStates: ["green", "orange", "red"],
  stateIndex: 0,
};

let cycle = 0;
while (cycle < 2) {
  const currentState = trafficLight.possibleStates[trafficLight.stateIndex];
  console.log("The traffic light is on", currentState);

  if (trafficLight.stateIndex === trafficLight.possibleStates.length - 1) {
    cycle += 1;
    trafficLight.stateIndex = 0;
  } else {
    trafficLight.stateIndex += 1;
  }
}
