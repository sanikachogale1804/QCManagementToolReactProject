import React, { useState } from 'react';
import { createTicket } from '../Services/ticketService';

const TicketCreationForm = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        iasspName: '',
        siteId: '',
        cameraId: '',
        ipAddress: '',
        simIccid: '',
        simCarrier: '',
        simStatus: '',
    });

    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        if (!formData.iasspName) newErrors.iasspName = 'IASSP Name is required.';
        if (!formData.siteId) newErrors.siteId = 'Site ID is required.';
        if (!formData.cameraId) newErrors.cameraId = 'Camera ID is required.';
        if (!formData.ipAddress || !/\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(formData.ipAddress)) {
            newErrors.ipAddress = 'Valid IP Address is required.';
        }
        if (!formData.simIccid) newErrors.simIccid = 'SIM ICCID is required.';
        if (!formData.simCarrier) newErrors.simCarrier = 'SIM Carrier is required.';
        if (!formData.simStatus) newErrors.simStatus = 'SIM Status is required.';
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                await createTicket(formData);
                alert('Ticket submitted successfully!');
                setFormData({
                    iasspName: '',
                    siteId: '',
                    cameraId: '',
                    ipAddress: '',
                    simIccid: '',
                    simCarrier: '',
                    simStatus: '',
                });
                setErrors({});
            } catch (error) {
                alert('Failed to submit ticket. Please check the console for details.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="iasspName">IASSP Name</label>
                <select
                    id="iasspName"
                    name="iasspName"
                    value={formData.iasspName}
                    onChange={handleChange}
                >
                    <option value="">Select IASSP</option>
                    <option value="IASSP 1">IASSP 1</option>
                    <option value="IASSP 2">IASSP 2</option>
                    <option value="IASSP 3">IASSP 3</option>
                </select>
                {errors.iasspName && <p>{errors.iasspName}</p>}
            </div>

            <div>
                <label htmlFor="siteId">Site ID</label>
                <input
                    type="text"
                    id="siteId"
                    name="siteId"
                    value={formData.siteId}
                    onChange={handleChange}
                />
                {errors.siteId && <p>{errors.siteId}</p>}
            </div>

            <div>
                <label htmlFor="cameraId">Camera ID</label>
                <input
                    type="text"
                    id="cameraId"
                    name="cameraId"
                    value={formData.cameraId}
                    onChange={handleChange}
                />
                {errors.cameraId && <p>{errors.cameraId}</p>}
            </div>

            <div>
                <label htmlFor="ipAddress">IP Address</label>
                <input
                    type="text"
                    id="ipAddress"
                    name="ipAddress"
                    value={formData.ipAddress}
                    onChange={handleChange}
                />
                {errors.ipAddress && <p>{errors.ipAddress}</p>}
            </div>

            <div>
                <label htmlFor="simIccid">SIM ICCID</label>
                <input
                    type="text"
                    id="simIccid"
                    name="simIccid"
                    value={formData.simIccid}
                    onChange={handleChange}
                />
                {errors.simIccid && <p>{errors.simIccid}</p>}
            </div>

            <div>
                <label htmlFor="simCarrier">SIM Carrier</label>
                <input
                    type="text"
                    id="simCarrier"
                    name="simCarrier"
                    value={formData.simCarrier}
                    onChange={handleChange}
                />
                {errors.simCarrier && <p>{errors.simCarrier}</p>}
            </div>

            <div>
                <label htmlFor="simStatus">SIM Status</label>
                <input
                    type="text"
                    id="simStatus"
                    name="simStatus"
                    value={formData.simStatus}
                    onChange={handleChange}
                />
                {errors.simStatus && <p>{errors.simStatus}</p>}
            </div>

            <div>
                <button type="submit">Submit Ticket</button>
            </div>
        </form>
    );
};

export default TicketCreationForm;
