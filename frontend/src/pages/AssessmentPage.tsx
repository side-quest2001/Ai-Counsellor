import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { useFormState } from '../hooks/useFormState';
import { useAnalysis } from '../hooks/useAnalysis';
import ProgressBar from '../components/ui/ProgressBar';
import ParticleBackground from '../components/ui/ParticleBackground';
import StepWrapper from '../components/form/StepWrapper';
import Step1Class from '../components/form/Step1Class';
import ScoreStep from '../components/form/ScoreStep';
import Step5StudyHours from '../components/form/Step5StudyHours';
import Step6Target from '../components/form/Step6Target';
import Step7PrepMode from '../components/form/Step7PrepMode';
import Step8WeakAreas from '../components/form/Step8WeakAreas';
import Step9MockPercentile from '../components/form/Step9MockPercentile';
import Step10MonthsLeft from '../components/form/Step10MonthsLeft';
import type { StudentProfile } from '../types';

function isStepComplete(step: number, profile: Partial<StudentProfile>): boolean {
  switch (step) {
    case 1: return !!profile.currentClass;
    case 2: return !!profile.physicsScore;
    case 3: return !!profile.chemistryScore;
    case 4: return !!profile.mathsScore;
    case 5: return !!profile.dailyStudyHours;
    case 6: return !!profile.target;
    case 7: return !!profile.prepMode;
    case 8: return true; // weak areas optional
    case 9: return !!profile.mockPercentile;
    case 10: return !!profile.monthsRemaining;
    default: return false;
  }
}

export default function AssessmentPage() {
  const navigate = useNavigate();
  const { currentStep, direction, profile, totalSteps, updateProfile, advance, retreat } = useFormState();
  const { analyze } = useAnalysis();

  const canAdvance = isStepComplete(currentStep, profile);

  const handleSubmit = async () => {
    const fullProfile = profile as StudentProfile;
    if (!fullProfile.weakAreas) fullProfile.weakAreas = [];

    // Store result in sessionStorage for results page
    sessionStorage.setItem('analyzing', 'true');
    navigate('/loading');

    const result = await analyze(fullProfile);
    if (result) {
      sessionStorage.setItem('analysis_result', JSON.stringify(result));
      sessionStorage.setItem('student_profile', JSON.stringify(fullProfile));
      navigate('/results');
    } else {
      navigate('/assessment');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Class
            value={profile.currentClass}
            onChange={v => { updateProfile({ currentClass: v }); setTimeout(advance, 300); }}
          />
        );
      case 2:
        return (
          <ScoreStep
            subject="Physics"
            emoji="⚡"
            color="#4F46E5"
            value={profile.physicsScore ?? 5}
            onChange={v => updateProfile({ physicsScore: v })}
          />
        );
      case 3:
        return (
          <ScoreStep
            subject="Chemistry"
            emoji="🧪"
            color="#10B981"
            value={profile.chemistryScore ?? 5}
            onChange={v => updateProfile({ chemistryScore: v })}
          />
        );
      case 4:
        return (
          <ScoreStep
            subject="Mathematics"
            emoji="📐"
            color="#7C3AED"
            value={profile.mathsScore ?? 5}
            onChange={v => updateProfile({ mathsScore: v })}
          />
        );
      case 5:
        return (
          <Step5StudyHours
            value={profile.dailyStudyHours}
            onChange={v => { updateProfile({ dailyStudyHours: v }); setTimeout(advance, 300); }}
          />
        );
      case 6:
        return (
          <Step6Target
            value={profile.target}
            onChange={v => { updateProfile({ target: v }); setTimeout(advance, 300); }}
          />
        );
      case 7:
        return (
          <Step7PrepMode
            value={profile.prepMode}
            onChange={v => { updateProfile({ prepMode: v }); setTimeout(advance, 300); }}
          />
        );
      case 8:
        return (
          <Step8WeakAreas
            value={profile.weakAreas ?? []}
            onChange={v => updateProfile({ weakAreas: v })}
          />
        );
      case 9:
        return (
          <Step9MockPercentile
            value={profile.mockPercentile}
            onChange={v => { updateProfile({ mockPercentile: v }); setTimeout(advance, 300); }}
          />
        );
      case 10:
        return (
          <Step10MonthsLeft
            value={profile.monthsRemaining ?? 6}
            onChange={v => updateProfile({ monthsRemaining: v })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-deep-purple relative flex flex-col">
      <ParticleBackground />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #06B6D4)' }}
          >
            <Zap size={14} className="text-white" />
          </div>
          <span className="text-white font-bold">JEE Guru</span>
        </div>
        <span className="text-sm text-slate-400">Assessment</span>
      </motion.header>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col max-w-2xl w-full mx-auto px-6 py-8">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <ProgressBar current={currentStep} total={totalSteps} />
        </motion.div>

        {/* Step content */}
        <div className="flex-1">
          <AnimatePresence mode="wait" custom={direction}>
            <StepWrapper key={currentStep} direction={direction} stepKey={currentStep}>
              {renderStep()}
            </StepWrapper>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex gap-3"
        >
          {currentStep > 1 && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={retreat}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl glass text-slate-300 font-semibold"
            >
              <ChevronLeft size={18} /> Back
            </motion.button>
          )}

          <motion.button
            whileHover={canAdvance ? { scale: 1.03 } : {}}
            whileTap={canAdvance ? { scale: 0.97 } : {}}
            onClick={currentStep === totalSteps ? handleSubmit : advance}
            disabled={!canAdvance}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-white transition-all ${
              canAdvance
                ? 'cursor-pointer'
                : 'opacity-40 cursor-not-allowed'
            }`}
            style={canAdvance ? { background: 'linear-gradient(135deg, #4F46E5, #7C3AED, #06B6D4)' } : { background: 'rgba(255,255,255,0.1)' }}
          >
            {currentStep === totalSteps ? (
              <>Get My Plan <Zap size={18} /></>
            ) : (
              <>Next <ChevronRight size={18} /></>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
