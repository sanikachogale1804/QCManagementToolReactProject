import React, { useEffect, useState } from 'react';
import { createTicket, uploadAdditionalImage, uploadApnConfigImage, uploadFtpConfigImage, uploadLiveViewImage, uploadNetworkImage, uploadNtpConfigImage, uploadPlaybackScreenshotImage, uploadVideoConfigImage } from '../Services/ticketService';
import '../CSS/TicketCreationForm.css';
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
        apnConfigImage: '',
        apnConfigStatus: '',
        liveViewImage: '',
        liveViewQuality: '',
        videoConfigImage: '',
        resolution: '',
        sdCardStoragePercentage: '',
        finalStatus: ''
    });

    const [networkImage, setNetworkImage] = useState(null);
    const [apnConfigImageFile, setApnConfigImageFile] = useState(null);
    const [liveViewImageFile, setliveViewImageFile] = useState(null);
    const [videoConfigImageFile, setvideoConfigImageFile] = useState(null);
    const [ftpSettingsImageFile, setftpSettingsImageFile] = useState(null);
    const [ntpSettingsImageFile, setntpSettingsImageFile] = useState(null);
    const [playbackScreenshotImageFile, setplaybackScreenshotImageFile] = useState(null);
    const [additionalImageFile, setadditionalImageFile] = useState(null);

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
            return;
        }

        try {
            // Step 1: Create ticket
            const createdTicket = await createTicket(formData);

            // Step 2: Upload network image if selected
            if (networkImage) {
                const imageFormData = new FormData();
                imageFormData.append("networkImage", networkImage);
                await uploadNetworkImage(createdTicket.id, imageFormData);
            }

            // Step 3: Upload APN config image if selected
            if (apnConfigImageFile) {
                const apnFormData = new FormData();
                apnFormData.append("apnConfigImage", apnConfigImageFile);
                await uploadApnConfigImage(createdTicket.id, apnFormData);
            }

            if (liveViewImageFile) {
                const apnFormData = new FormData();
                apnFormData.append("liveViewImage", liveViewImageFile);
                await uploadLiveViewImage(createdTicket.id, apnFormData);
            }

            if (videoConfigImageFile) {
                const apnFormData = new FormData();
                apnFormData.append("videoConfigImage", videoConfigImageFile);
                await uploadVideoConfigImage(createdTicket.id, apnFormData);
            }

            if (ftpSettingsImageFile) {
                const apnFormData = new FormData();
                apnFormData.append("ftpSettingsImage", ftpSettingsImageFile);
                await uploadFtpConfigImage(createdTicket.id, apnFormData);
            }

            if (ntpSettingsImageFile) {
                const apnFormData = new FormData();
                apnFormData.append("ntpSettingsImage", ntpSettingsImageFile);
                await uploadNtpConfigImage(createdTicket.id, apnFormData);
            }

            if (playbackScreenshotImageFile) {
                const apnFormData = new FormData();
                apnFormData.append("playbackScreenshotImage", playbackScreenshotImageFile);
                await uploadPlaybackScreenshotImage(createdTicket.id, apnFormData);
            }

            if (additionalImageFile) {
                const apnFormData = new FormData();
                apnFormData.append("additionalImage", additionalImageFile);
                await uploadAdditionalImage(createdTicket.id, apnFormData);
            }

            alert("Ticket submitted successfully!");

            // Reset form and images
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
                apnConfigImage: '',
                apnConfigStatus: '',
                liveViewImage: '',
                liveViewQuality: '',
                videoConfigImage: '',
                resolution: '',
                sdCardStoragePercentage: '',
                finalStatus: ''
            });
            setNetworkImage(null);
            setApnConfigImageFile(null);
            setvideoConfigImageFile(null);
            setErrors({});
        } catch (error) {
            console.error("Ticket submission error:", error);
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
                <label htmlFor="networkImage">Network Image</label>
                <input
                    type="file"
                    id="networkImage"
                    name="networkImage"
                    accept="image/*"
                    onChange={(e) => setNetworkImage(e.target.files[0])}
                />
            </div>

            <div>
                <label htmlFor="apnConfigImage">APN Config Image</label>
                <input
                    type="file"
                    id="apnConfigImage"
                    name="apnConfigImage"
                    accept="image/*"
                    onChange={(e) => setApnConfigImageFile(e.target.files[0])}
                />
            </div>

            <div>
                <label htmlFor="apnConfigStatus">APN Config Status</label>
                <select
                    id="apnConfigStatus"
                    name="apnConfigStatus"
                    value={formData.apnConfigStatus}
                    onChange={handleChange}
                >
                    <option value="">-- Select Status --</option>
                    <option value="Correct">Correct</option>
                    <option value="Incorrect">Incorrect</option>
                </select>
            </div>


            <div>
                <label htmlFor="liveViewImage">Live View Image</label>
                <input
                    type="file"
                    id="liveViewImage"
                    name="liveViewImage"
                    accept="image/*"
                    onChange={(e) => setliveViewImageFile(e.target.files[0])}
                />
            </div>

            <div>
                <label htmlFor="">Live View Quality</label>
                <input
                    type="text"
                    id="liveViewQuality"
                    name="liveViewQuality"
                    value={formData.liveViewQuality}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="videoConfigImage">Video Config Image</label>
                <input
                    type="file"
                    id="videoConfigImage"
                    name="videoConfigImage"
                    accept="image/*"
                    onChange={(e) => setvideoConfigImageFile(e.target.files[0])}
                />
            </div>

            <div>
                <label htmlFor="resolution">Resolution</label>
                <input
                    type="text"
                    id="resolution"
                    name="resolution"
                    value={formData.resolution}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="ftpSettingsImage">FTP Setting Image</label>
                <input
                    type="file"
                    id="ftpSettingsImage"
                    name="ftpSettingsImage"
                    accept="image/*"
                    onChange={(e) => setftpSettingsImageFile(e.target.files[0])}
                />
            </div>

            <div>
                <label htmlFor="ntpSettingsImage">NTP Setting Image</label>
                <input
                    type="file"
                    id="ntpSettingsImage"
                    name="ntpSettingsImage"
                    accept="image/*"
                    onChange={(e) => setntpSettingsImageFile(e.target.files[0])}
                />
            </div>

            <div>
                <label htmlFor="playbackScreenshotImage">SD Card Playback Screenshot</label>
                <input
                    type="file"
                    id="playbackScreenshotImage"
                    name="playbackScreenshotImage"
                    accept="image/*"
                    onChange={(e) => setplaybackScreenshotImageFile(e.target.files[0])}
                />
            </div>

            <div>
                <label htmlFor="sdCardStoragePercentage">SD Card Storage Capacity</label>
                <input
                    type="text"
                    id="sdCardStoragePercentage"
                    name="sdCardStoragePercentage"
                    value={formData.sdCardStoragePercentage}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="finalStatus">Final Status</label>
                <select
                    id="finalStatus"
                    name="finalStatus"
                    value={formData.finalStatus}
                    onChange={handleChange}
                >
                    <option value="">-- Select Final Status --</option>
                    <option value="QC completed">QC completed</option>
                    <option value="SIM issue">SIM issue</option>
                    <option value="Hardware issue">Hardware issue</option>
                    <option value="Tower not ready">Tower not ready</option>
                    <option value="Engineer not on site">Engineer not on site</option>
                </select>
            </div>

            <div>
                <label htmlFor="additionalImage">Additional Image</label>
                <input
                    type="file"
                    id="additionalImage"
                    name="additionalImage"
                    accept="image/*"
                    onChange={(e) => setadditionalImageFile(e.target.files[0])}
                />
            </div>

            <div>
                <button type="submit">Submit Ticket</button>
            </div>
        </form>
    );
};

export default TicketCreationForm;
