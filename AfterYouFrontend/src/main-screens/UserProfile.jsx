import React, { useState } from "react";
import "../style/UserProfile.css";
import { FaUserCircle, FaPen } from "react-icons/fa";
import ProfilePictureForm from "../popups-screens/ProfilePictureForm.jsx";

const UserProfile = () => {
    const [showPictureForm, setShowPictureForm] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    const handlePictureUpdate = (file) => {
        setProfilePicture(URL.createObjectURL(file));
        setShowPictureForm(false);
    };

    return (
        <div className="profile-container">
            {showPictureForm && (
                <ProfilePictureForm
                    onClose={() => setShowPictureForm(false)}
                    onSave={handlePictureUpdate}
                />
            )}
            <div className="user-profile-header">
                <div className="profile-photo-container">
                    {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="profile-picture" />
                    ) : (
                        <FaUserCircle className="default-icon" />
                    )}
                    <button
                        className="edit-icon photo-edit"
                        onClick={() => setShowPictureForm(true)}
                    >
                        <FaPen size={12} />
                    </button>
                </div>
                <div className="profile-info">
                    <div className="name-edit-container">
                        <h1>Shey Silva</h1>
                        <button className="edit-icon">
                            <FaPen size={12} />
                        </button>
                    </div>
                    <div className="profile-subheader">
                        Female - 26 years <span className="nic">200072348138</span>
                    </div>
                </div>
            </div>

            {/* Rest of your existing JSX remains exactly the same */}
            <div className="details-container">
                <div className="user-details">
                    <div className="editable-field">
                        <h2>Date Of Birth</h2>
                        <div className="field-value">
                            <p>17/08/2000</p>
                            <button className="edit-icon">
                                <FaPen size={12} />
                            </button>
                        </div>
                    </div>

                    <div className="editable-field">
                        <h2>Address</h2>
                        <div className="field-value">
                            <p>761, Park Street, Colombo 08.</p>
                            <button className="edit-icon">
                                <FaPen size={12} />
                            </button>
                        </div>
                    </div>

                    <div className="editable-field">
                        <h2>Contacts</h2>
                        <div className="field-value">
                            <p>
                                Email : Siva@gmail.com<br />
                                Mobile : 077 8564632
                            </p>
                            <button className="edit-icon">
                                <FaPen size={12} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="vertical-divider"></div>

                <div className="executor-details">
                    <div className="executor-topic">
                        <h1>Executor Details</h1>
                    </div>
                    <div className="horizontal-divider"></div>

                    <div className="executor-details-container">
                        <div className="editable-field">
                            <h2>Name</h2>
                            <div className="field-value">
                                <p>Damian Smith</p>
                                <button className="edit-icon">
                                    <FaPen size={12} />
                                </button>
                            </div>
                        </div>

                        <div className="editable-field">
                            <h2>Date Of Birth</h2>
                            <div className="field-value">
                                <p>17/08/2010</p>
                                <button className="edit-icon">
                                    <FaPen size={12} />
                                </button>
                            </div>
                        </div>

                        <div className="editable-field">
                            <h2>NIC</h2>
                            <div className="field-value">
                                <p>200072348138</p>
                                <button className="edit-icon">
                                    <FaPen size={12} />
                                </button>
                            </div>
                        </div>

                        <div className="editable-field">
                            <h2>Contact</h2>
                            <div className="field-value">
                                <p>
                                    Email : Siva@gmail.com<br />
                                    Mobile : 077 8564632
                                </p>
                                <button className="edit-icon">
                                    <FaPen size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;