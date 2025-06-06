import React, { useRef, useState } from "react";
import "../style/ProfilePictureForm.css";
import { updateUserProfile } from "../Services/userService";

const ProfilePictureForm = ({ onClose, onSave }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
    if (!selectedFile) return;

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwtToken");

    const formData = new FormData();
    formData.append("profilePic", selectedFile); // ✅ Match backend key name

    updateUserProfile(userId, formData, token)
        .then(() => {
            onSave(selectedFile);
        })
        .catch((error) => {
            console.error("Error uploading profile image:", error);
        });
    };


    const triggerFileInput = () => {
        fileInputRef.current.click();
    };


    return (
        <div className="picture-form-overlay">
            <div className="picture-form-container">
                <button className="picture-form-close-btn" onClick={onClose}>×</button>
                <div className="picture-form-header">
                    <h2>Update Profile Picture</h2>
                </div>

                <div className="picture-preview-container">
                    {preview ? (
                        <img src={preview} alt="Preview" className="picture-preview" />
                    ) : (
                        <div className="picture-placeholder">No image selected</div>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                <div className="profile-picture-form-actions">
                    <button className="select-btn" onClick={triggerFileInput}>
                        Select Image
                    </button>
                    <button className="save-btn" onClick={handleSave} disabled={!selectedFile}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );


};

export default ProfilePictureForm;
` `