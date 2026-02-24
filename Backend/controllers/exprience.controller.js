import InterviewExperience from "../models/interviewExprience.model.js"

export const createExperience = async (req, res) => {
  try {
    const post = await InterviewExperience.create({
      user: req.user,
      company: req.body.company,
      role: req.body.role,
      experience: req.body.experience,
      difficulty: req.body.difficulty
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const toggleUpvote = async (req, res) => {
  const post = await InterviewExperience.findById(req.params.id);

  const hasVoted = post.voters.includes(req.user);

  if (hasVoted) {
    post.upvotes -= 1;
    post.voters.pull(req.user);
  } else {
    post.upvotes += 1;
    post.voters.push(req.user);
  }

  await post.save();
  res.json(post);
};


export const getFeed = async (req, res) => {
  try {
    const posts = await InterviewExperience.find()
      .populate("user", "name")
      .lean();

    const rankedPosts = posts.map(post => {
      const hoursSincePost =
        (Date.now() - new Date(post.createdAt)) / 3600000;

      const rankingScore =
        post.upvotes / Math.pow(hoursSincePost + 2, 1.5);

      return {
        ...post,
        rankingScore
      };
    });

    rankedPosts.sort((a, b) => b.rankingScore - a.rankingScore);

    res.json(rankedPosts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};