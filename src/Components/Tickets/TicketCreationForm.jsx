import React, { useEffect, useState } from 'react';
import { createTicket, uploadNetworkImage } from '../Services/ticketService';
import '../CSS/TicketCreationForm.css'; // ✅ CSS import
import { useNavigate } from 'react-router-dom';


const TicketCreationForm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Please login first');
            navigate('/loginPage');
        }
    }, []);
    const [formData, setFormData] = useState({
        iasspName: '',
        siteId: '',
        cameraId1: '',
        cameraId2: '',
        ipAddress1: '',
        ipAddress2: '',
        simIccid: '',
        simCarrier: '',
        simStatus: '',
        pingResponseTime: '',
    });

    const [networkImage, setNetworkImage] = useState(null);


    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.iasspName) newErrors.iasspName = 'IASSP Name is required.';
        if (!formData.siteId) newErrors.siteId = 'Site ID is required.';
        if (!formData.cameraId1) newErrors.cameraId1 = 'Camera ID 1 is required.';
        if (!formData.cameraId2) newErrors.cameraId2 = 'Camera ID 2 is required.';

        const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
        if (!formData.ipAddress1 || !ipRegex.test(formData.ipAddress1)) {
            newErrors.ipAddress1 = 'Valid IP Address 1 is required.';
        }
        if (!formData.ipAddress2 || !ipRegex.test(formData.ipAddress2)) {
            newErrors.ipAddress2 = 'Valid IP Address 2 is required.';
        }

        if (!formData.simIccid) newErrors.simIccid = 'SIM ICCID is required.';
        if (!formData.simCarrier) newErrors.simCarrier = 'SIM Carrier is required.';
        if (!formData.simStatus) newErrors.simStatus = 'SIM Status is required.';
        if (!formData.pingResponseTime) {
            newErrors.pingResponseTime = 'Ping Response Time is required.';
        }


        return newErrors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                // Step 1: Create the ticket
                const createdTicket = await createTicket(formData); // contains `id` field

                // Step 2: If image is selected, upload it
                if (networkImage) {
                    const imageFormData = new FormData();
                    imageFormData.append("file", networkImage); // 👈 make sure this matches backend

                    // Use the correct ticket ID only (not full URL)
                    await uploadNetworkImage(createdTicket.id, imageFormData);
                }

                alert("Ticket submitted successfully!");

                // Step 3: Reset the form
                setFormData({
                    iasspName: '',
                    siteId: '',
                    cameraId1: '',
                    cameraId2: '',
                    ipAddress1: '',
                    ipAddress2: '',
                    simIccid: '',
                    simCarrier: '',
                    simStatus: '',
                    pingResponseTime: '',
                });
                setNetworkImage(null);
                setErrors({});
            } catch (error) {
                console.error("Ticket submission error:", error);
                alert("Failed to submit ticket. Please try again.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="ticket-form">
            <h2>Create Ticket</h2>

            <div>
                <label htmlFor="iasspName">IASSP Name</label>
                <select
                    id="iasspName"
                    name="iasspName"
                    value={formData.iasspName}
                    onChange={handleChange}
                >
                    <option value="">Select IASSP</option>
                    <option value="Skipper Limited">Skipper Limited</option>
                    <option value="Dinesh Engineers Limited">Dinesh Engineers Limited</option>
                    <option value="NexGen Digital Infrastructure">NexGen Digital Infrastructure</option>
                    <option value="Bondada Engineering Limited">Bondada Engineering Limited</option>
                    <option value="Pace Digitek">Pace Digitek</option>
                    <option value="Pratap Technocrats Pvt Ltd">Pratap Technocrats Pvt Ltd</option>
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
                <label htmlFor="cameraId1">Camera ID 1</label>
                <input
                    type="text"
                    id="cameraId1"
                    name="cameraId1"
                    value={formData.cameraId1}
                    onChange={handleChange}
                />
                {errors.cameraId1 && <p>{errors.cameraId1}</p>}
            </div>
            <div>
                <label htmlFor="cameraId2">Camera ID 2</label>
                <input
                    type="text"
                    id="cameraId2"
                    name="cameraId2"
                    value={formData.cameraId2}
                    onChange={handleChange}
                />
                {errors.cameraId2 && <p>{errors.cameraId2}</p>}
            </div>

            <div>
                <label htmlFor="ipAddress1">IP Address 1</label>
                <input
                    type="text"
                    id="ipAddress1"
                    name="ipAddress1"
                    value={formData.ipAddress1}
                    onChange={handleChange}
                />
                {errors.ipAddress1 && <p>{errors.ipAddress1}</p>}
            </div>

            <div>
                <label htmlFor="ipAddress2">IP Address 2</label>
                <input
                    type="text"
                    id="ipAddress2"
                    name="ipAddress2"
                    value={formData.ipAddress2}
                    onChange={handleChange}
                />
                {errors.ipAddress2 && <p>{errors.ipAddress2}</p>}
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
                <label htmlFor="pingResponseTime">Ping Response Time (ms)</label>
                <input
                    type="text"
                    id="pingResponseTime"
                    name="pingResponseTime"
                    value={formData.pingResponseTime}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="networkImage">Upload Network Image</label>
                <input
                    type="file"
                    id="networkImage"
                    accept="image/*"
                    onChange={(e) => setNetworkImage(e.target.files[0])}
                />
            </div>

            <div>
                <button type="submit">Submit Ticket</button>
            </div>
        </form>
    );
};

export default TicketCreationForm;
