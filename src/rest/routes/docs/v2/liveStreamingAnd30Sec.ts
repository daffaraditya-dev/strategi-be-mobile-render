/**
 * @openapi
 * /master/live-streaming:
 *   get:
 *     tags:
 *       - Master Data
 *     summary: Get the list of Live Streaming data
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a paginated list of live streaming data with optional filtering by date range and category.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-12-31"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: "1"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           default: ""
 *     responses:
 *       200:
 *         description: Successfully fetched live streaming data
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
 *                         example: "b5a5a440-91c3-4e7b-9a6f-9dcd76ac28d9"
 *                       tanggal:
 *                         type: string
 *                         format: date-time
 *                       jam:
 *                         type: string
 *                         example: "08:00:00"
 *                       unitKerja:
 *                         $ref: "#/components/schemas/UnitKerja"
 *                       matra:
 *                         $ref: "#/components/schemas/Matra"
 *                       channel:
 *                         $ref: "#/components/schemas/Channel"
 *                       linkLive:
 *                         type: string
 *                         example: "https://youtube.com/live/example"
 *                       lokasi:
 *                         type: string
 *                         example: "Pelabuhan Tanjung Priok"
 *                       description:
 *                         type: string
 *                         example: "Live streaming acara peresmian dermaga baru."
 *                       personInCharge:
 *                         type: string
 *                         example: "Budi Santoso"
 *                       category:
 *                         type: integer
 *                         example: 2
 *                       streamMetadata:
 *                         $ref: "#/components/schemas/StreamMetadata"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: string
 *                     limit:
 *                       type: string
 *                     totalPages:
 *                       type: integer
 *
 *
 * /master/30second:
 *   get:
 *     tags:
 *       - Master Data
 *     summary: Get the list of 30 Seconds video
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a paginated list of video 30 Second data.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-12-31"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: "1"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           default: ""
 *     responses:
 *       200:
 *         description: Successfully fetched 30s data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       tanggal:
 *                         type: string
 *                         format: date-time
 *                       jam:
 *                         type: string
 *                       unitKerja:
 *                         $ref: "#/components/schemas/UnitKerja"
 *                       namaMatra:
 *                         type: string
 *                         example: "LAUT"
 *                       eselon:
 *                         type: string
 *                         example: "ESELON-LAUT"
 *                       videoId:
 *                         type: string
 *                         nullable: true
 *                       videoTitle:
 *                         type: string
 *                         nullable: true
 *                       videoDescription:
 *                         type: string
 *                         nullable: true
 *                       videoChannelId:
 *                         type: string
 *                         nullable: true
 *                       videoPublishedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       videoStatusLive:
 *                         type: integer
 *                         nullable: true
 *                       videoStreamingSchedule:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       channel:
 *                         $ref: "#/components/schemas/Channel"
 *                       linkLive:
 *                         type: string
 *                       lokasi:
 *                         type: string
 *                       description:
 *                         type: string
 *                       personInCharge:
 *                         type: string
 *                       category:
 *                         type: integer
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: string
 *                     limit:
 *                       type: string
 *                     totalPages:
 *                       type: integer
 *
 *
 * components:
 *   schemas:
 *
 *     UnitKerja:
 *       type: object
 *       properties:
 *         unitKerjaId:
 *           type: string
 *           example: "003007006000000"
 *         namaUnitKerja:
 *           type: string
 *           example: "Balai Pengelola Transportasi Darat Kelas II Banten"
 *         namaUnitKerjaInduk:
 *           type: string
 *           example: "Direktorat Jenderal Perhubungan Darat"
 *
 *     Matra:
 *       type: object
 *       properties:
 *         namaMatra:
 *           type: string
 *           example: "LAUT"
 *         eselon:
 *           type: string
 *           example: "ESELON-LAUT"
 *
 *     Channel:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "hongdaelive"
 *         id:
 *           type: string
 *           example: "UC3UpyHYs2n0i5Z1IPJGJfOQ"
 *         urlYoutubeChannel:
 *           type: string
 *           example: "https://youtube.com/@hongdaelive"
 *
 *     StreamMetadata:
 *       type: object
 *       properties:
 *         videoId:
 *           type: string
 *           nullable: true
 *         videoTitle:
 *           type: string
 *           nullable: true
 *         videoDescription:
 *           type: string
 *           nullable: true
 *         videoChannelId:
 *           type: string
 *           nullable: true
 *         videoPublishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         videoStatusLive:
 *           type: integer
 *           nullable: true
 *         videoStreamingSchedule:
 *           type: string
 *           format: date-time
 *           nullable: true
 */
