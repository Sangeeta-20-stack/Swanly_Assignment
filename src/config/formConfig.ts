export const formConfig = {
  chapters: [
    {
      title: "Personal Information",
      screens: [
        {
          title: "Basic Information",
          questions: [
            { id: "fullName", type: "text", label: "What’s your full name?", required: true },
            { id: "email", type: "text", label: "What’s your email address?", required: true },
          ],
        },
        {
          title: "About You",
          questions: [
            {
              id: "ageGroup",
              type: "radio",
              label: "What’s your age group?",
              required: true,
              options: ["Under 18", "19–24", "25–34", "35–44", "45–54", "55+"],
            },
            {
              id: "interests",
              type: "checkbox",
              label: "What are your interests?",
              options: [
                "Technology",
                "Science",
                "Arts & Design",
                "Business",
                "Health & Fitness",
                "Travel",
                "Cooking",
                "Music",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Your Motivation",
      screens: [
        {
          title: "Learning Goal",
          questions: [
            {
              id: "learningGoal",
              type: "radio",
              label: "What’s your primary learning goal?",
              required: true,
              options: [
                "Career advancement",
                "Personal growth",
                "Academic requirements",
                "Hobby development",
                "Skill maintenance",
              ],
            },
            {
              id: "motivationDetails",
              type: "text",
              label: "Tell us more about your motivation",
            },
          ],
        },
      ],
    },
    {
      title: "Personal Learning Journey",
      screens: [
        {
          title: "Learning Preferences",
          questions: [
            {
              id: "methods",
              type: "checkbox",
              label: "Which learning methods work best for you?",
              options: [
                "Visual content (videos, images)",
                "Reading articles and documents",
                "Interactive exercises",
                "Audio content (podcasts, lectures)",
                "Hands-on practice",
                "Group discussions",
              ],
            },
            {
              id: "dailyTime",
              type: "radio",
              label: "How much time can you dedicate to learning daily?",
              options: [
                "Less than 15 minutes",
                "15–30 minutes",
                "30–60 minutes",
                "1–2 hours",
                "More than 2 hours",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Experience Level",
      screens: [
        {
          title: "Current Knowledge",
          questions: [
            {
              id: "experienceLevel",
              type: "radio",
              label: "How would you describe your overall experience level?",
              required: true,
              options: [
                "Complete Beginner",
                "Some basic knowledge",
                "Intermediate",
                "Advanced",
                "Expert",
              ],
            },
            {
              id: "experienceDetails",
              type: "text",
              label: "Describe any relevant previous experience",
            },
          ],
        },
      ],
    },
    {
      title: "Final Setup",
      screens: [
        {
          title: "Final Setup",
          questions: [
            {
              id: "difficulty",
              type: "radio",
              label: "What difficulty level would you prefer to start with?",
              options: [
                "Easy - Build confidence with basics",
                "Medium - Balanced challenge",
                "Hard - Jump into advanced topics",
                "Adaptive - Let the system decide",
              ],
            },
            {
              id: "updates",
              type: "checkbox",
              label: "How would you like to receive updates?",
              options: [
                "Email notifications",
                "Push notifications",
                "Weekly progress reports",
                "Achievement celebrations",
              ],
            },
          ],
        },
      ],
    },
  ],
};
