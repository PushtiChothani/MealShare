import "../howItWorks.css";

const steps = [
  {
    number: "01",
    title: "Choose Your Plan",
    description:
      "Select a meal plan that fits your needs and discover available surplus food nearby.",
    icon: "◉",
  },
  {
    number: "02",
    title: "Discover & Reserve",
    description:
      "Browse nearby meals, check the details, and reserve what you would like to rescue.",
    icon: "⌕",
  },
  {
    number: "03",
    title: "Pick Up Your Meal",
    description:
      "Visit the local restaurant or store at the selected time and collect your rescued meal.",
    icon: "⌖",
  },
  {
    number: "04",
    title: "Enjoy & Make an Impact",
    description:
      "Enjoy good food while helping reduce waste and supporting your local community.",
    icon: "♥",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="how-it-works-heading">
          <span className="how-it-works-label">How It Works</span>

          <h2>
            From Surplus
            <br />
            to Someone’s Plate
          </h2>

          <p>
            A simple way to rescue good food, discover local meals,
            and make a meaningful difference.
          </p>
        </div>

        <div className="how-it-works-steps">
          {steps.map((step) => (
            <div className="how-it-works-step" key={step.number}>
              <div className="step-top">
                <span className="step-number">{step.number}</span>
                <span className="step-icon">{step.icon}</span>
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;