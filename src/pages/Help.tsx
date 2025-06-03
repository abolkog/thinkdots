import Button from "@components/ui/Button";
import { useNavigate } from "react-router";

function Help() {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto p-6 bg-black-300 rounded-lg text-gray-200 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">How to Play ThinkDots</h1>
      <ol className="list-decimal list-inside mb-6 space-y-2">
        <li>
          <strong>Objective:</strong> Guess the secret color code in as few
          attempts as possible.
          <strong>
            You have a limited number of guesses to find the correct sequence of
            colors.
          </strong>
        </li>
        <li>
          <strong>Game Setup:</strong> The computer randomly selects a sequence
          of colors (the secret code). The code is hidden from you.
        </li>
        <li>
          <strong>Making a Guess:</strong>
          <ul className="list-disc list-inside ml-6">
            <li>
              Click on each dot to cycle through the available colors and set
              your guess for each position.
            </li>
            <li>
              Once you have selected a color for every dot in the row, the
              "Submit Guess" button will be enabled.
            </li>
            <li>Click "Submit Guess" to lock in your guess.</li>
          </ul>
        </li>
        <li>
          <strong>Feedback:</strong>
          <ul className="list-disc list-inside ml-6">
            <li>After each guess, you will receive feedback:</li>
            <li>
              <span className="text-green-400 font-semibold">Green dot</span>:
              Correct color in the correct position.
            </li>
            <li>
              <span className="text-yellow-400 font-semibold">Yellow dot</span>:
              Correct color, but in the wrong position.
            </li>
            <li>
              <span className="text-gray-400 font-semibold">Gray dot</span>:
              Color not in the secret code.
            </li>
          </ul>
        </li>
        <li>
          <strong>Winning the Game:</strong>
          <ul className="list-disc list-inside ml-6">
            <li>If you guess the exact sequence, you win!</li>
            <li>
              If you run out of attempts, the game is over and the secret code
              is revealed.
            </li>
          </ul>
        </li>
        <li>
          <strong>Tips:</strong>
          <ul className="list-disc list-inside ml-6">
            <li>Use the feedback to refine your next guess.</li>
            <li>Each color can only be used once per guess (no duplicates).</li>
          </ul>
        </li>
      </ol>
      <p className="text-gray-400">Good luck and have fun cracking the code!</p>
      <div className="w-full rounded-2xl mt-6">
        <Button
          onClick={() => navigate("/game")}
          cssClass="rounded-2xl w-full font-bold text-lg"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
}

export default Help;
