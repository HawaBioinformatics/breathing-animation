/* =========================================
   ELEMENTS
========================================= */

const stage =
    document.getElementById("stage");

const phaseLabel =
    document.getElementById("phaseLabel");

const gasSymbol =
    document.getElementById("gasSymbol");

const gasDirection =
    document.getElementById("gasDirection");

const inhaleButton =
    document.getElementById("inhaleButton");

const exhaleButton =
    document.getElementById("exhaleButton");

const continuousButton =
    document.getElementById("continuousButton");


/* =========================================
   CONTINUOUS MODE
========================================= */

let continuousMode = false;

let breathingTimer = null;

let currentPhase = "exhale";


/* =========================================
   INHALE
========================================= */

function inhale(fromContinuous = false) {

    if (!fromContinuous) {
        stopContinuous();
    }

    currentPhase = "inhale";

    stage.classList.remove("exhaling");
    stage.classList.add("inhaling");


    phaseLabel.textContent =
        "INHALE";

    phaseLabel.style.background =
        "#d9f2fb";

    phaseLabel.style.color =
        "#207b9e";


    gasSymbol.textContent =
        "O₂";

    gasDirection.textContent =
        "↓";


    inhaleButton.classList.add(
        "active"
    );

    exhaleButton.classList.remove(
        "active"
    );
}


/* =========================================
   EXHALE
========================================= */

function exhale(fromContinuous = false) {

    if (!fromContinuous) {
        stopContinuous();
    }

    currentPhase = "exhale";

    stage.classList.remove("inhaling");
    stage.classList.add("exhaling");


    phaseLabel.textContent =
        "EXHALE";

    phaseLabel.style.background =
        "#fae0e2";

    phaseLabel.style.color =
        "#ad444d";


    gasSymbol.textContent =
        "CO₂";

    gasDirection.textContent =
        "↑";


    exhaleButton.classList.add(
        "active"
    );

    inhaleButton.classList.remove(
        "active"
    );
}


/* =========================================
   START CONTINUOUS BREATHING
========================================= */

function startContinuous() {

    continuousMode = true;

    continuousButton.textContent =
        "⏸ Pause Breathing";

    continuousButton.classList.add(
        "active"
    );


    /*
       Start with inhalation.
    */

    inhale(true);


    /*
       4.2 seconds per phase gives the
       anatomical movement enough time
       to reach its full position before
       reversing.

       This is intentionally slower than
       normal breathing for observation.
    */

    breathingTimer =
        setInterval(
            function () {

                if (
                    currentPhase === "inhale"
                ) {

                    exhale(true);

                } else {

                    inhale(true);

                }

            },
            4200
        );
}


/* =========================================
   STOP CONTINUOUS BREATHING
========================================= */

function stopContinuous() {

    continuousMode = false;


    if (breathingTimer) {

        clearInterval(
            breathingTimer
        );

        breathingTimer = null;
    }


    continuousButton.textContent =
        "▶ Continuous Breathing";


    continuousButton.classList.remove(
        "active"
    );
}


/* =========================================
   TOGGLE CONTINUOUS
========================================= */

function toggleContinuous() {

    if (continuousMode) {

        stopContinuous();

    } else {

        startContinuous();

    }
}


/* =========================================
   BUTTON EVENTS
========================================= */

inhaleButton.addEventListener(
    "click",
    function () {

        inhale(false);

    }
);


exhaleButton.addEventListener(
    "click",
    function () {

        exhale(false);

    }
);


continuousButton.addEventListener(
    "click",
    toggleContinuous
);