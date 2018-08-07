/* Inspired and Original Idea By Madeline Shelton
Adapted by Anmol Modur */

#ifndef DONT
#define DONT
#endif

#include "whatElonSays.h"
#include "whatsGoingOn.h"

whatsGoingOn whatIThinkIsGoingOn = whatsGoingOn(whatElonSays);

bool goingtocrash() {
    return whatIThinkIsGoingOn.amIGoingToCrashQuestionMark();
}

bool carIsOn() {
    return whatIThinkIsGoingOn.isTheCarOnQuestionMark();
}

void main() {
    while (carIsOn()){
        if (goingtocrash()){
            DONT;
        }
    }
}