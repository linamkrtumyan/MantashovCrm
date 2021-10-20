import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { deleteImageFromStore, uploadImage } from "../../../store";
import "./imageUpload.css";

function UploadImages({
    deleteImageFromStore,
    uploadImage,
    label = "",
    className = "",
    containerClassName = "",
    imageUpload,
  }) {
    return (
        <div>
            
        </div>
    )
}

export default UploadImages
