const InputField = ({ label, type, value, onChange, placeholder, errors }) => (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors && <p className="text-red-500 text-sm mt-2">{errors}</p>}

    </div>
  );
  
  export default InputField;
  