import { useState } from 'react';

export default function Input({
  type,
  placeholder,
  initValue = '',
  name,
  checked = false,
  getValue,
}) {
  const [value, setValue] = useState(initValue);

  const handleChange = e => {
    e.preventDefault();
    getValue(e.target.value);
    setValue(e.target.value);
  };

  return (
    <input
      style={{ width: '100%' }}
      onChange={handleChange}
      name={name}
      type={type}
      checked={checked}
      placeholder={placeholder}
      value={value}
    />
  );
}
