import React, { useState } from "react";
import "../style/UserProfile.css";
import { FaUserCircle, FaPen } from "react-icons/fa";
import ProfilePictureForm from "../popups-screens/ProfilePictureForm.jsx";
import EditUserDetailsForm from "../popups-screens/EditUserDetailsForm.jsx";
import EditExecutorForm from "../popups-screens/EditExecutorForm.jsx";

const UserProfile = () => {
    const [showPictureForm, setShowPictureForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showExecutorForm, setShowExecutorForm] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [userData, setUserData] = useState({
        name: "Shey Silva",
        gender: "Female",
        nic: "200072348138",
        dob: "17/08/2000",
        address: "761, Park Street, Colombo 08.",
        email: "Siva@gmail.com",
        mobile: "077 8564632",
        executorName: "Damian Smith",
        executorDob: "17/08/2010",
        executorNic: "200072348138",
        executorEmail: "Siva@gmail.com",
        executorMobile: "077 8564632"
    });

    const handlePictureUpdate = (file) => {
        setProfilePicture(URL.createObjectURL(file));
        setShowPictureForm(false);
    };

    const handleUserDataUpdate = (updatedData) => {
        setUserData(updatedData);
        setShowEditForm(false);
    };

    const handleExecutorUpdate = (updatedExecutor) => {
        setUserData(prev => ({
            ...prev,
            ...updatedExecutor
        }));
        setShowExecutorForm(false);
    };

    const handleRemoveExecutor = () => {
        setUserData(prev => ({
            ...prev,
            executorName: "",
            executorDob: "",
            executorNic: "",
            executorEmail: "",
            executorMobile: ""
        }));
        setShowExecutorForm(false);
    };

    return (
        <div className="profile-container">
            {showPictureForm && (
                <ProfilePictureForm
                    onClose={() => setShowPictureForm(false)}
                    onSave={handlePictureUpdate}
                />
            )}

            {showEditForm && (
                <EditUserDetailsForm
                    userData={userData}
                    onClose={() => setShowEditForm(false)}
                    onSave={handleUserDataUpdate}
                />
            )}

            {showExecutorForm && (
                <EditExecutorForm
                    executorData={{
                        name: userData.executorName,
                        dob: userData.executorDob,
                        nic: userData.executorNic,
                        email: userData.executorEmail,
                        mobile: userData.executorMobile
                    }}
                    onClose={() => setShowExecutorForm(false)}
                    onSave={handleExecutorUpdate}
                    onRemove={handleRemoveExecutor}
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
                        <h1>{userData.name}</h1>
                        <button
                            className="edit-icon"
                            onClick={() => setShowEditForm(true)}
                        >
                            <FaPen size={12} />
                        </button>
                    </div>
                    <div className="profile-subheader">
                        {userData.gender} - {userData.age} years <span className="nic">{userData.nic}</span>
                    </div>
                </div>
            </div>

            <div className="details-container">
                <div className="user-details">
                    <div className="editable-field">
                        <h2>Date Of Birth</h2>
                        <div className="field-value">
                            <p>{userData.dob}</p>
                        </div>
                    </div>

                    <div className="editable-field">
                        <h2>Address</h2>
                        <div className="field-value">
                            <p>{userData.address}</p>
                        </div>
                    </div>

                    <div className="editable-field">
                        <h2>Contacts</h2>
                        <div className="field-value">
                            <p>
                                Email : {userData.email}<br />
                                Mobile : {userData.mobile}
                            </p>
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
                            </div>
                        </div>

                        <div className="editable-field">
                            <h2>Date Of Birth</h2>
                            <div className="field-value">
                                <p>17/08/2010</p>
                            </div>
                        </div>

                        <div className="editable-field">
                            <h2>NIC</h2>
                            <div className="field-value">
                                <p>200072348138</p>
                            </div>
                        </div>

                        <div className="editable-field">
                            <h2>Contact</h2>
                            <div className="field-value">
                                <p>
                                    Email : Siva@gmail.com<br />
                                    Mobile : 077 8564632
                                </p>
                                <button
                                    className="executor-edit-icon"
                                    onClick={() => setShowExecutorForm(true)}
                                >
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