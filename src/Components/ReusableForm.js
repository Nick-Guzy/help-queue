import React, { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import PropTypes from "prop-types";

function ReusableForm(props) {

  const theme = useContext(ThemeContext);

  const buttonStyles = { 
    backgroundColor: theme.buttonBackground, 
    color: theme.textColor, 
  }

  const inputStyles = { 
    backgroundColor: theme.inputBackground,
    color: theme.textColor, 
  }
  return (
    <React.Fragment>
      <form onSubmit={props.fromSubmissionHandler}>
        <label>Pair Names:
        <input
        style={inputStyles}
        type='text'
        name='names'/>
        </label>
        <br/>
        <label>Location:
        <input 
        style={inputStyles}
        type='text'
        name="location" />
        </label>
        <br/>
        <label>Describe you issue
        <textarea
        style={inputStyles}
        name='issue' />
        </label>
        <br/>
        <button style={buttonStyles} type='submit'>{props.buttonText}</button>
      </form>
      <hr />
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  fromSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;