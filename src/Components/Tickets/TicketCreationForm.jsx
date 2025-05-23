import React, { useEffect, useState } from 'react';
import { createTicket, uploadNetworkImage } from '../Services/ticketService';
import '../CSS/TicketCreationForm.css'; // ✅ CSS import
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080';


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

        // Validate form
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            // Create ticket and get the created ticket object
            const createdTicket = await createTicket(formData);

            // Extract ticket ID from _links.self.href
            const selfLink = createdTicket?._links?.self?.href;
            let ticketId = null;
            if (selfLink) {
                const parts = selfLink.split('/');
                ticketId = parts[parts.length - 1];
            }

            if (!ticketId) {
                throw new Error("Ticket ID not returned from backend");
            }

            // Upload networkImage if present
            if (networkImage) {
                const data = new FormData();
                data.append('file', networkImage);
                await uploadNetworkImage(ticketId, data);
            }

            alert("Ticket submitted successfully!");

            // Reset form and states
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
            console.error("Error submitting ticket:", error);
            alert("Failed to submit ticket. Please try again.");
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
            {/* <label htmlFor="apnScreenshot">APN Settings Screenshot</label>
            <input
                type="file"
                id="apnScreenshot"
                accept="image/*"

            />

            <label htmlFor="apnStatus">APN Status</label>
            <select
                id="apnStatus"
                name="apnStatus"
                value={formData.apnStatus}
                onChange={handleChange}
            >
                <option value="">Select Status</option>
                <option value="Correct">Correct</option>
                <option value="Incorrect">Incorrect</option>
            </select>
            {errors.apnStatus && <p>{errors.apnStatus}</p>}

            <label htmlFor="liveViewImage">Upload Live Feed Image</label>
            <input
                type="file"
                id="liveViewImage"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, liveViewImage: e.target.files[0] })}
            />

            <label htmlFor="liveViewQuality">Quality Rating</label>
            <select
                id="liveViewQuality"
                name="liveViewQuality"
                value={formData.liveViewQuality || ''}
                onChange={handleChange}
            >
                <option value="">Select Quality</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
            </select>

            <label htmlFor="configScreenshot">Upload Config Screenshot</label>
            <input
                type="file"
                id="configScreenshot"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, configScreenshot: e.target.files[0] })}
            />

            <div>
                <button type="button" onClick={() => alert('Testing FTP...')}>Test FTP</button>
                <button type="button" onClick={() => alert('Testing NTP...')}>Test NTP</button>
            </div>

            <label htmlFor="sdCardStorage">Storage % Used</label>
            <input
                type="number"
                id="sdCardStorage"
                name="sdCardStorage"
                value={formData.sdCardStorage || ''}
                onChange={handleChange}
                placeholder="e.g. 75"
            />

            <label htmlFor="sdPlaybackImage">Upload Playback Screenshot</label>
            <input
                type="file"
                id="sdPlaybackImage"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, sdPlaybackImage: e.target.files[0] })}
            /> */}


            <div>
                <button type="submit">Submit Ticket</button>
            </div>
        </form>
    );
};

export default TicketCreationForm;
