import Image from "next/image";
import { useReducer, SyntheticEvent } from "react";
import { Button, Badge, Modal } from "react-bootstrap";
import localData from "./../data/local-data";
import { gameInitialState } from "../data/initialStates";
import { gameReducer, CORRECT, WRONG, RESTART } from "../lib/reducers";
import confirmPick from "./../lib/confirmPick";

const theme =
  localData.game.themes[confirmPick(localData.game.themes.length) - 1];

const Home = () => {
  const [
    { score, chance, is1correct, is2correct, is3correct, is4correct, comment },
    gameDispatch,
  ] = useReducer(gameReducer, gameInitialState);
  const {
    name,
    instruction,
    optionLimit,
    chanceLimit,
    passLimit,
  } = localData.game;
  const { images } = theme;
  const cardImage = images[0];
  const targetImage = images[1];

  const handleClick = ({ currentTarget: { id } }: SyntheticEvent) => {
    document.getElementById(id)!.style.transition = "transform 200ms";
    document.getElementById(id)!.style.transform = "scale(1.1)";
    const correctPick = confirmPick(optionLimit);
    if (chance! > 0) {
      if (parseInt(id) !== correctPick) {
        gameDispatch({
          type: WRONG,
          payload: { chance: chance! - 1, comment: "Wrong!" },
        });
      } else {
        gameDispatch({
          type: CORRECT,
          payload: {
            score: score! + 1,
            chance: chance! - 1,
            [`is${id}correct`]: true,
            comment: "Correct!",
          },
        });
        setTimeout(() => {
          gameDispatch({
            type: CORRECT,
            payload: { [`is${id}correct`]: false },
          });
        }, 1000);
      }
    }
    setTimeout(
      () => (document.getElementById(id)!.style.transform = "scale(1)"),
      1000
    );
  };
  const restart = () =>
    gameDispatch({ type: RESTART, payload: gameInitialState });
  return (
    <div className="text-warning p-2" style={{ maxWidth: 400 }}>
      <div>
        <div
          className="rounded px-2 py-1"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.50)",
          }}
        >
          <h2>{name}</h2>
          <hr />
          <h3>{instruction.title}</h3>
          <div className="text-white">
            <p>{instruction.p1}</p>
            <p>{instruction.p2}</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between p-2 rounded mb-2">
        <div className="rounded bg-secondary p-2 my-2 h3">
          Score:{" "}
          <Badge variant={`${score! < passLimit ? "danger" : "success"}`} pill>
            {score}
          </Badge>
        </div>
        <div className="bg-secondary rounded p-2 my-2 h3">
          <Badge pill variant="primary">
            {chance}
          </Badge>{" "}
          Chances
        </div>
      </div>
      <div>
        <div className="d-flex justify-content-between">
          <h2 className="bg-dark text-white p-1 rounded">Pick a card</h2>
          {chance! > 0 ? (
            <h2
              className={`${
                comment === "Correct!" ? "text-success" : "text-danger"
              } bg-white p-1 rounded`}
            >
              {comment}
            </h2>
          ) : (
            <h2 className="bg-danger px-2 rounded">Game Over!</h2>
          )}
        </div>
        <div
          style={{
            maxWidth: 320,
            margin: "0 auto",
          }}
        >
          <div className="d-flex justify-content-around">
            {is1correct ? (
              <div>
                <Image
                  src={targetImage.src}
                  width={targetImage.width}
                  height={targetImage.height}
                  alt={targetImage.alt}
                />
              </div>
            ) : (
              <div
                style={{ backgroundColor: "red", margin: "1rem", height: 120 }}
              >
                <Image
                  src={cardImage.src}
                  width={cardImage.width}
                  height={cardImage.height}
                  alt={cardImage.alt}
                  id="1"
                  onClick={handleClick}
                />
              </div>
            )}
            {is2correct ? (
              <div>
                <Image
                  src={targetImage.src}
                  width={targetImage.width}
                  height={targetImage.height}
                  alt={targetImage.alt}
                />
              </div>
            ) : (
              <div
                style={{ backgroundColor: "red", margin: "1rem", height: 120 }}
              >
                <Image
                  src={cardImage.src}
                  width={cardImage.width}
                  height={cardImage.height}
                  alt={cardImage.alt}
                  id="2"
                  onClick={handleClick}
                />
              </div>
            )}
          </div>
          <div className="d-flex justify-content-around">
            {is3correct ? (
              <div>
                <Image
                  src={targetImage.src}
                  width={targetImage.width}
                  height={targetImage.height}
                  alt={targetImage.alt}
                />
              </div>
            ) : (
              <div
                style={{ backgroundColor: "red", margin: "1rem", height: 120 }}
              >
                <Image
                  src={cardImage.src}
                  width={cardImage.width}
                  height={cardImage.height}
                  alt={cardImage.alt}
                  id="3"
                  onClick={handleClick}
                />
              </div>
            )}
            {is4correct ? (
              <div>
                <Image
                  src={targetImage.src}
                  width={targetImage.width}
                  height={targetImage.height}
                  alt={targetImage.alt}
                />
              </div>
            ) : (
              <div
                style={{ backgroundColor: "red", margin: "1rem", height: 120 }}
              >
                <Image
                  src={cardImage.src}
                  width={cardImage.width}
                  height={cardImage.height}
                  alt={cardImage.alt}
                  id="4"
                  onClick={handleClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {chance! === 0 && (
        <Modal
          size="sm"
          show={true}
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <h4>Your result...</h4>
          </Modal.Header>
          <Modal.Body>
            <h5>Total Score: {score}</h5>
            <h5>Total Miss: {chanceLimit - score!}</h5>
            <hr />
            {score! >= passLimit ? (
              <h5>Congratulations! You passed!</h5>
            ) : (
              <h5>You did not pass; try again below.</h5>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button size="lg" onClick={restart} block className="my-3">
              <h3>Restart</h3>
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
