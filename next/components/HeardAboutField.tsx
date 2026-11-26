// "How did you hear about ai.moms™?" — asked on every registration form before Stripe.
// The answer posts with the rest of the form (field name: heard_about).
// The brand name stays lowercase even though .field-label is uppercase.
export const HEARD_OPTIONS = [
  'Instagram',
  'LinkedIn',
  'A friend told me',
  'Google search',
  'An ai.moms™ experience or workshop',
  'The AIM newsletter',
  'Other',
];

export default function HeardAboutField() {
  return (
    <div className="field">
      <label className="field-label" htmlFor="heard_about">
        How did you hear about <span style={{ textTransform: 'none', letterSpacing: '0.04em' }}>ai.moms™</span>?
      </label>
      <select
        id="heard_about"
        name="heard_about"
        required
        defaultValue=""
        style={{
          width: '100%', background: 'transparent', border: 'none', borderBottom: '1.5px solid var(--gray-300)',
          padding: '10px 0', fontFamily: "'Be Vietnam Pro', sans-serif", fontSize: '1em', color: 'var(--navy)',
          fontWeight: 500, borderRadius: 0,
        }}
      >
        <option value="" disabled>Choose one</option>
        {HEARD_OPTIONS.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
