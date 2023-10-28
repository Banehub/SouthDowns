import React, { useState, useEffect } from "react";
import styles from "./SpinAndWin.module.css";
import { Modal, Button } from "react-bootstrap";
export default function RandomNumberCard() {
  const [state, setState] = useState({
    winningNumbers: [],
    countdown: 0,
    spinsRemaining: 100,
    isCounting: false,
    prizes: [],
    showPrizePopup: false,
  });

  const generateRandomNumber = () => {
    if (state.spinsRemaining > 0 && !state.isCounting) {
      setState((prevState) => ({
        ...prevState,
        isCounting: true,
        countdown: 5, // Set the initial countdown value to 5
      }));
    }
  };

  useEffect(() => {
    if (state.isCounting) {
      const countdownInterval = setInterval(() => {
        setState((prevState) => {
          const currentCountdown = prevState.countdown - 1;
          if (currentCountdown >= 1) {
            return { ...prevState, countdown: currentCountdown };
          } else {
            clearInterval(countdownInterval);
            // Perform the action you want when the countdown reaches 1
            handleCountdownCompletion();
            return {
              ...prevState,
              isCounting: false,
            };
          }
        });
      }, 1000);
    }
  }, [state.isCounting]);

  const handleCountdownCompletion = () => {
    // Add the logic to generate the random number, update state, and show the prize popup.
    const min = 1;
    const max = 1000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    const updatedWinningNumbers = [...state.winningNumbers, randomNumber];

    setState((prevState) => ({
      ...prevState,
      winningNumbers: updatedWinningNumbers,
      spinsRemaining: prevState.spinsRemaining - 1,
      showPrizePopup: true,
    }));
  };

  const closePrizePopup = () => {
    setState((prevState) => ({ ...prevState, showPrizePopup: false }));
  };

  const currentPrize = state.prizes[state.prizes.length - state.spinsRemaining];
  const currentWinningNumber =
    state.winningNumbers[state.winningNumbers.length - 1];

  function getCountdownNumberColor(countdown) {
    if (countdown === 5) {
      return "red";
    } else if (countdown === 4) {
      return "yellow";
    } else if (countdown === 3) {
      return "pink";
    } else if (countdown === 2) {
      return "green";
    }
    return "black"; // Default color for 1
  }

  return (
    <div style={{height: "100%"}} className={styles.containerCustom} onClick={generateRandomNumber}>
      <div className={styles.cardbody}>
        {state.isCounting && (
          <p
            className={styles.countdowntimer}
            style={{ color: getCountdownNumberColor(state.countdown) }}
          >
            {state.countdown}
          </p>
        )}
        <p className={styles.cardtext}>
          {state.spinsRemaining === 0 ? "All spins completed!" : null}
        </p>
      </div>

      {state.showPrizePopup && (
        <Modal show={state.showPrizePopup} onHide={closePrizePopup} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{fontSize: "340px", textAlign: "center"}}>{currentWinningNumber}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closePrizePopup}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
