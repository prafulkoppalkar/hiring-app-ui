import WorkExperience from "../components/WorkExperience";
import Education from "../components/Education";
import Projects from "../components/Projects";
import InterviewStatus from "../components/InterviewStatus";

export const renderTabContent = (activeTab, candidate) => {
  switch (activeTab) {
    case "Experience":
      return <WorkExperience workExperience={candidate.workExperience} />;
    case "Education":
      return <Education education={candidate.education} />;
    case "Projects":
      return <Projects />;
    case "Interview":
      return <InterviewStatus candidate={candidate} />;
    default:
      return null;
  }
};
