import { useEffect, useState } from "react";
import { getPracticeTopic, questionChecked } from "../../services/aptitudeService";

function TopicPractice({ category, goBack }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await getPracticeTopic(category)
    console.log(category);
    console.log(res);
    setQuestions(res.data);
  };

  const handleCheck = async () => {
    const id = questions[current]._id;
    const res = await questionChecked(id, selected);
    setFeedback(res.data);
  };

  if (!questions.length)
    return <div className="text-white">Loading...</div>;

  const question = questions[current];

  return (
    <div className="max-w-3xl mx-auto text-white">

      <button
        onClick={goBack}
        className="mb-6 text-purple-400"
      >
        ← Back
      </button>

      <h3 className="text-xl font-semibold mb-6">
        {question.question}
      </h3>
  
      <div className="space-y-4">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-5 py-4 rounded-xl border transition ${
              selected === i
                ? "bg-purple-600/20 border-purple-500"
                : "bg-white/5 border-white/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleCheck}
          className="px-6 py-2 rounded-xl bg-linear-to-r from-purple-600 to-blue-600"
        >
          Check Answer
        </button>

        <button
          onClick={() => {
            setSelected(null);
            setFeedback(null);
            setCurrent((prev) => prev + 1);
          }}
          className="px-6 py-2 rounded-xl bg-white/10"
        >
          Next
        </button>
      </div>

      {feedback && (
        <div
          className={`mt-6 p-4 rounded-xl ${
            feedback.correct
              ? "bg-green-600/20 text-green-400"
              : "bg-red-600/20 text-red-400"
          }`}
        >
          {feedback.correct
            ? "Correct Answer!"
            : `Wrong. Correct option is ${
                question.options[feedback.correctAnswer]
              }`}
        </div>
      )}

    </div>
  );
}

export default TopicPractice;