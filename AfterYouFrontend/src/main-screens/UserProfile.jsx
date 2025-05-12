import React, { useState, useEffect } from "react";
import "../style/UserProfile.css";
import { FaUserCircle, FaPen } from "react-icons/fa";
import ProfilePictureForm from "../popups-screens/ProfilePictureForm.jsx";
import EditUserDetailsForm from "../popups-screens/EditUserDetailsForm.jsx";
import EditExecutorForm from "../popups-screens/EditExecutorForm.jsx";
import { getUserProfile } from "../Services/userService.js";

const UserProfile = () => {
    const [showPictureForm, setShowPictureForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showExecutorForm, setShowExecutorForm] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [profile, setProfile] = useState(null);

    const [executorProfile, setExecutorProfile] = useState({
        name: "Damian Smith",
        dob: "2010-08-17",
        nic: "200072348138",
        email: "Siva@gmail.com",
        mobile: "077 8564632"
    });

    const handlePictureUpdate = (file) => {
        setProfilePicture(URL.createObjectURL(file));
        setShowPictureForm(false);
    };

    const handleUserDataUpdate = (updatedData) => {
        setProfile(updatedData);
        setShowEditForm(false);
    };

    const handleExecutorUpdate = (updatedExecutor) => {
        setExecutorProfile(updatedExecutor);
        setShowExecutorForm(false);
    };

    const handleRemoveExecutor = () => {
        setExecutorProfile({
            name: "",
            dob: "",
            nic: "",
            email: "",
            mobile: ""
        });
        setShowExecutorForm(false);
    };

    const calculateAge = (dob) => {
        if (!dob) return "";
        const birthDate = new Date(dob);
        const ageDiff = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('jwtToken');
        if (userId && token) {
            getUserProfile(parseInt(userId), token)
                .then(res => {
                    setProfile(res.data);
                })
                .catch(err => {
                    console.error("Failed to load profile", err);
                });
        }
    }, []);

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
                    userData={profile}
                    onClose={() => setShowEditForm(false)}
                    onSave={handleUserDataUpdate}
                />
            )}

            {showExecutorForm && (
                <EditExecutorForm
                    executorData={executorProfile}
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
                        <h1>{profile?.firstName} {profile?.lastName}</h1>
                        <button
                            className="edit-icon"
                            onClick={() => setShowEditForm(true)}
                        >
                            <FaPen size={12} />
                        </button>
                    </div>
                    <div className="profile-subheader">
                        {profile?.gender} - {calculateAge(profile?.dob)} years old <span className="nic">{profile?.NIC}</span>
                    </div>
                </div>
            </div>

            <div className="details-container" style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                {/* USER DETAILS */}
                <div className="user-details" style={{ flex: "1", minWidth: "300px" }}>
                    <div className="editable-field">
                        <h2>Date Of Birth</h2>
                        <div className="field-value">
                            <p>{profile?.dob}</p>
                        </div>
                    </div>

                    <div className="editable-field">
                        <h2>Address</h2>
                        <div className="field-value">
                            <p>{profile?.address}</p>
                        </div>
                    </div>

                    <div className="editable-field">
                        <h2>Contacts</h2>
                        <div className="field-value">
                            <p>
                                Email : {profile?.email}<br />
                                Mobile : {profile?.phoneNumber}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="vertical-divider" style={{ borderLeft: "1px solid #ccc", height: "100%" }}></div>

                {/* EXECUTOR DETAILS */}
                <div className="executor-details" style={{ flex: "1", minWidth: "300px" }}>
                    <div className="executor-topic">
                        <h1>Executor Details</h1>
                    </div>
                    <div className="horizontal-divider" style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}></div>

                    <div className="executor-details-container">
                        <div className="editable-field">
                            <h2>Name</h2>
                            <div className="field-value">
                                <p>{executorProfile.name}</p>
                            </div>
                        </div>

                        <div className="editable-field">
                            <h2>Date Of Birth</h2>
                            <div className="field-value">
                                <p>{executorProfile.dob}</p>
                            </div>
                        </div>

                        <div className="editable-field">
                            <h2>NIC</h2>
                            <div className="field-value">
                                <p>{executorProfile.nic}</p>
                            </div>
                        </div>

                        <div className="editable-field">
                            <h2>Contact</h2>
                            <div className="field-value">
                                <p>
                                    Email : {executorProfile.email}<br />
                                    Mobile : {executorProfile.mobile}
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
