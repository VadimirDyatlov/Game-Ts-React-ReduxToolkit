import React, { } from 'react';
import { IEditProfile } from '../../models/types/propsTypes';

function EditProfile({
  name, error, formRef, handleSubmit,
}: IEditProfile) {
  return (
    <div className="edit-profile nes-container is-rounded is-dark">
      <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
        <h3>Edit name and pass</h3>
        <div className="nes-field">
          <input
            className="nes-input"
            name="name"
            type="text"
            placeholder="Name"
            defaultValue={name}
          />
        </div>
        <div className="nes-field">
          <input
            className="nes-input"
            name="password"
            type="password"
            placeholder="New password"
          />
        </div>
        <button type="submit" className="nes-btn">
          Edit
        </button>
      </form>
      { error !== false && <p className="error_message">{error}</p> }
    </div>
  );
}
export default EditProfile;
