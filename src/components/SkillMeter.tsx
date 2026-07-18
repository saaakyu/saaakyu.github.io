interface SkillMeterProps {
  label: string;
  value: number;
  max: number;
  text: string;
  tone?: 'blue' | 'green' | 'orange' | 'purple';
}

export default function SkillMeter({ label, value, max, text, tone = 'blue' }: SkillMeterProps) {
  const safeValue = Math.max(0, Math.min(value, max));
  return (
    <div className={`skill-meter ${tone}`}>
      <div className="skill-meter-heading">
        <span>{label}</span>
        <strong>{text}</strong>
      </div>
      <div className="skill-meter-track" aria-hidden="true">
        {Array.from({ length: max }, (_, index) => (
          <span className={index < safeValue ? 'filled' : ''} key={index} />
        ))}
      </div>
    </div>
  );
}
