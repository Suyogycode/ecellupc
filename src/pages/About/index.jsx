import AboutHero from './AboutHero';
import Timeline from './Timeline';
import TeamGrid from './TeamGrid';

const About = () => {
  return (
    <div className="bg-primary-dark min-h-screen">
      <AboutHero />
      <Timeline />
      <TeamGrid />
      <div className="h-20 bg-primary-dark"></div>
    </div>
  );
};

export default About;