import { useSpring, animated } from "@react-spring/web";

export default function Card({
  card,
  addCard,
  runFinalAnimation,
  index,
  length,
  ...props
}) {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 1, x: 0, rotate: 0, zIndex: length - index },
    config: { tension: 200, friction: 30 },
  }));

  function handleClick(action, type) {
    switch (action) {
      case "next": {
        api.start({
          from: { opacity: 1, x: 0, rotate: 0 },
          to: { x: 100, rotate: 20, opacity: 0, zIndex: -index },
        });
        break;
      }
      case "finish": {
        api.start({
          from: { opacity: 1, x: 0, rotate: 0 },
          to: { x: 100, rotate: 20, opacity: 0, zIndex: -index },
        });
        runFinalAnimation();
      }
      case "yes": {
        api.start({
          from: { opacity: 1, x: 0, rotate: 0 },
          to: { x: 100, rotate: 20, opacity: 0, zIndex: -index },
        });
        break;
      }
      case "no": {
        const response = addCard();
        if (response) {
          api.start({
            from: { opacity: 1, x: 0, rotate: 0 },
            to: { x: -100, rotate: -20, opacity: 0, zIndex: -index },
          });
        } else {
          console.log('No more cards to add!');
        }
      }
    }
  }

  function hideCard() {
    api.start({
      from: { opacity: 1 },
      to: { opacity: 0 },
    })
  }

  return (
    <animated.div
      {...props}
      style={{ ...springs }}
      className={`absolute min-h-96 w-64 text-white py-3 px-3 flex flex-col justify-center items-center rounded-xl bg-red-400 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]`}
    >
      <div className="text-3xl font-semibold">{card.text}</div>
      <div className="flex gap-2 w-full py-3">
        {card.buttons.map((button, index) => (
          <button
            key={index.toString()}
            className="flex-1 bg-white text-red-400 px-3 py-1 rounded-lg"
            onClick={() => handleClick(button.action, card.type)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </animated.div>
  );
}
