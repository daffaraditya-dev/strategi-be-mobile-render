/**
 * @openapi
 * /30-seconds:
 *   get:
 *     tags:
 *     - 30 Seconds
 *     summary: Get the list of 30 seconds video
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of 30 seconds video data with details like location, stream URL, and more. You can filter the results based on specific fields.
 *     responses:
 *       200:
 *         description: Successfully fetched 30 seconds video
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "BUJT-2183"
 *                       namaLokasi:
 *                         type: string
 *                         example: "Angkutan Jalan"
 *                       namaCctv:
 *                         type: string
 *                         example: "Terminal KM 53+500"
 *                       streamUrl:
 *                         type: string
 *                         format: uri
 *                         example: "https://streaming-cct.co.id/LiveApp/streams/728033679170510237677933.m3u8"
 *                       status:
 *                         type: string
 *                         enum: [online, offline]
 *                         example: "online"
 *       500:
 *         description: Internal server error
 */
