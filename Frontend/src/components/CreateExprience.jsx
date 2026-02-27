import { useState } from "react";
import axios from "axios";

function CreateExperience({ onPost }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    experience: "",
    difficulty: "Medium"
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/interview/post",
        form,
        { withCredentials: true }
      );

      setForm({
        company: "",
        role: "",
        experience: "",
        difficulty: "Medium"
      });

      onPost();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">
          Share Your Interview Experience
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Help others by sharing your real interview journey.
        </p>
      </div>

      {/* Company + Role Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Company (e.g. TCS, Infosys)"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
          className="w-full bg-white/10 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-purple-500"
          required
        />

        <input
          type="text"
          placeholder="Role (e.g. Frontend Developer)"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          className="w-full bg-white/10 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Experience Textarea */}
      <div>
        <textarea
          placeholder="Describe the interview rounds, questions asked, difficulty, tips..."
          value={form.experience}
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
          className="w-full bg-white/10 border border-white/10 rounded-xl p-4 h-40 resize-none focus:outline-none focus:border-purple-500 whitespace-pre-wrap"
          required
        />

        <div className="text-right text-xs text-gray-500 mt-1">
          {form.experience.length} characters
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between sm:items-center">

        <select
          value={form.difficulty}
          onChange={(e) =>
            setForm({ ...form, difficulty: e.target.value })
          }
          className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-purple-500"
        >
          <option className="bg-black">Easy</option>
          <option className="bg-black">Medium</option>
          <option className="bg-black">Hard</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full sm:w-auto px-6 py-2 rounded-xl font-medium transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-600/70 hover:bg-purple-600"
          }`}
        >
          {loading ? "Posting..." : "Post Experience"}
        </button>

      </div>
    </form>
  );
}

export default CreateExperience;