import { useState, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import Card from "./components/Card";

const normalCards = [
  {
    id: 1,
    isQuestion: false,
    type: "normal",
    text: "Hey, beautiful! 💖 Just wanted to remind you how amazing you are.",
    buttons: [{ label: "Next", action: "next" }],
  },
  {
    id: 2,
    isQuestion: false,
    type: "normal",
    text: "You make my world brighter, my heart lighter, and my life sweeter. 🌟",
    buttons: [{ label: "Next", action: "next" }],
  },
  {
    id: 3,
    isQuestion: false,
    type: "normal",
    text: "Every little moment with you is special. I’m so lucky to have you. ❤️",
    buttons: [{ label: "Next", action: "next" }],
  },
  {
    id: 4,
    isQuestion: false,
    type: "normal",
    text: "Life is an adventure, and I can’t imagine going through it without you. 🚀",
    buttons: [{ label: "Next", action: "next" }],
  },
  {
    id: 5,
    isQuestion: false,
    type: "normal",
    text: "I have a question for you… 💌",
    buttons: [{ label: "Next", action: "next" }],
  },
  {
    id: 6,
    text: "Will you be my Valentine? 💕",
    isQuestion: true,
    type: "normal",
    buttons: [
      { label: "Yes", action: "yes" },
      { label: "No", action: "no" },
    ],
  },
  {
    id: 7,
    text: "❤️ I can't wait to make this Valentine’s special for you! Before you go I've a message for you🥰",
    buttons: [
      { label: "Finish", action: "finish"}
    ],
  },
];

const areYouSureCards = [
  {
    id: 7,
    type: "special",
    text: "Wait… are you sure? 😢",
    buttons: [
      { label: "Yes", action: "yes" },
      { label: "No", action: "no" },
    ],
  },
  {
    id: 8,
    type: "special",
    text: "Come on… think about it! 😜",
    buttons: [
      { label: "Yes", action: "yes" },
      { label: "No", action: "no" },
    ],
  },
  {
    id: 9,
    type: "special",
    text: "Last chance! Extra hugs & chocolates! 🍫💖",
    buttons: [
      { label: "Yes", action: "yes" },
      { label: "No", action: "no" }, // This makes it loop back to this card
    ],
  },
];

function App() {
  const [cards, setCards] = useState(normalCards);
  const videoRef = useRef(null);
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
  }))

  function addCard() {
    if (areYouSureCards.length === 0) {
      return null;
    } else {
      const newCard = areYouSureCards.shift();
      console.log("removed card", newCard);
      setCards((prev) => [...prev, newCard]);
      return true;
    }
  }

  function runFinalAnimation() {
    api.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
    })
    videoRef.current.play();
  }

  return (
    <div className="relative w-full h-dvh max-h-dvh flex justify-center items-center overflow-hidden bg-slate-950 z-[100]">
      {cards.map((card, index) => (
        <Card
          key={index.toString()}
          index={index}
          length={cards.length}
          runFinalAnimation={runFinalAnimation}
          card={card}
          addCard={addCard}
        />
      ))}
      <animated.video src="/test.webm" ref={videoRef} style={{ ...springs }} width="800px" height="800px" controls />
    </div>
  );
}

export default App;
