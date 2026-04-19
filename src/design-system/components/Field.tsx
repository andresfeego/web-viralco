interface UIFieldProps {
  label: string;
  hint?: string;
  multiline?: boolean;
  placeholder?: string;
}

export default function UIField({
  label,
  hint,
  multiline = false,
  placeholder,
}: UIFieldProps) {
  return (
    <div className="ui-field">
      <label className="ui-field__label">{label}</label>
      {multiline ? (
        <textarea className="ui-textarea" placeholder={placeholder} />
      ) : (
        <input className="ui-input" placeholder={placeholder} />
      )}
      {hint ? <p className="ui-field__hint">{hint}</p> : null}
    </div>
  );
}
