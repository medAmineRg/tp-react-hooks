import React from "react";
import PropTypes from "prop-types";

const LanguageSelection = ({ language, setLanguage }) => {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="form-select">
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
};
LanguageSelection.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default LanguageSelection;
