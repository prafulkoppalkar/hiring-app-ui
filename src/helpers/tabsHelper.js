import WorkExperience from "../components/organisms/WorkExperience";
import Education from "../components/organisms/Education";
import Projects from "../components/organisms/Projects";
import InterviewStatus from "../components/organisms/InterviewStatus";

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
