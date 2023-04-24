import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.fromSubmissionHandler}>
        <input
        type='text'
        name='names'
        placeholder="Pair Names" />
        <input type='text'
        name="location"
        placeholder="Location" />
        <textarea
        name='issue'
        placeholder="Describe your issue."/>
        <button type='submit'>{props.bbuttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  fromSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;