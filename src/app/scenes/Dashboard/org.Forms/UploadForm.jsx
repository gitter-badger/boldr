import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
export const fields = ['file'];

class UploadForm extends Component {
  render() {
    const {
      fields: { file },
      handleSubmit,
      resetForm,
      submitting
    } = this.props;
    return (<form onSubmit={ handleSubmit }>
        <div>
          <label>File</label>
          <div>
            <input type="file" {...file} value={ null } />
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

UploadForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'upload',
  fields
})(UploadForm);
