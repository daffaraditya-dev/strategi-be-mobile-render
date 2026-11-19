/**
 * @openapi
 * components:
 *   schemas:
 *     TransportationMetrics:
 *       type: object
 *       properties:
 *         arrival:
 *           type: integer
 *           example: 1026
 *         departure:
 *           type: integer
 *           example: 1628
 *         vehicleArrival:
 *           type: integer
 *           example: 296
 *         vehicleDeparture:
 *           type: integer
 *           example: 298
 *
 *     TransportationData:
 *       type: object
 *       properties:
 *         idLocation:
 *           type: string
 *           example: 1
 *         location:
 *           type: string
 *         moda:
 *           type: string
 *         seasonal:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/TransportationMetrics'
 *         weekly:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/TransportationMetrics'
 *         monthly:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/TransportationMetrics'
 *         yearly:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/TransportationMetrics'
 *
 *     FocusCCTV:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "BUJT-2183"
 *         namaLokasi:
 *           type: string
 *           example: "Cimanggis-Cibitung"
 *         namaCctv:
 *           type: string
 *           example: "KM 53+500"
 *         streamUrl:
 *           type: string
 *           format: uri
 *           example: "https://streaming-cct.co.id/LiveApp/streams/728033679170510237677933.m3u8"
 *         status:
 *           type: string
 *           enum: [online, offline]
 *           example: "online"
 *         namaPengelola:
 *           type: string
 *           example: "PT Cimanggis Cibitung Tollways"
 *         protocol:
 *           type: string
 *           example: "m3u8"
 *         latitude:
 *           type: string
 *           example: "0"
 *         longitude:
 *           type: string
 *           example: "0"
 *         source:
 *           type: string
 *           example: "BUJT"
 *         tagKategori:
 *           type: string
 *           example: "toll"
 *         matra:
 *           type: string
 *           example: "darat"
 *         namaKabupatenKota:
 *           type: string
 *         namaProvinsi:
 *           type: string
 *
 *     FocusVideo:
 *       type: object
 *       properties:
 *         judul:
 *           type: string
 *           example: "Live Stream"
 *         deskripsi:
 *           type: string
 *           example: "Live deskripsi"
 *         link:
 *           type: string
 *           example: "http://example.com/liveStream"
 *         uptId:
 *           type: string
 *           example: "002000000000000"
 *         uptName:
 *           type: string
 *           example: "UPT Jakarta"
 *         channel:
 *           type: string
 *           example: "channel1"
 *         namaMatra:
 *           type: string
 *           example: "LAUT"
 *         liveStreamId:
 *           type: string
 *           example: "bc97f5b1-072c-42d5-b7cd-2ffd3a49eed6"
 *         publishedAt:
 *           type: string
 *           format: string
 *           nullable: true
 *         streamingSchedule:
 *           type: string
 *           format: string
 *           nullable: true
 *     Focus30sVideo:
 *       type: object
 *       properties:
 *         judul:
 *           type: string
 *           example: "Live Stream"
 *         deskripsi:
 *           type: string
 *           example: "Live deskripsi"
 *         link:
 *           type: string
 *           example: "http://example.com/liveStream"
 *         uptId:
 *           type: string
 *           example: "002000000000000"
 *         uptName:
 *           type: string
 *           example: "UPT Jakarta"
 *         channel:
 *           type: string
 *           example: "channel1"
 *         namaMatra:
 *           type: string
 *           example: "LAUT"
 *         liveStreamId:
 *           type: string
 *           example: "bc97f5b1-072c-42d5-b7cd-2ffd3a49eed6"
 *         publishedAt:
 *           type: string
 *           format: string
 *           nullable: true
 *         streamingSchedule:
 *           type: string
 *           format: string
 *           nullable: true
 *
 *     Weather:
 *       type: object
 *       properties:
 *         location:
 *           type: string
 *         province:
 *           type: string
 *         image:
 *           type: string
 *         temperature:
 *           type: integer
 *         description:
 *           type: string
 *
 *     Focus:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         idUser:
 *           type: string
 *           format: uuid
 *           example: "b9c72f9c-4b7d-4c47-98b1-bab5092a9205"
 *         judul:
 *           type: string
 *           example: "focus A"
 *         simpulTransportasi:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TransportationData'
 *         cctv:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FocusCCTV'
 *         video30s:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Focus30sVideo'
 *         videoLiveStreaming:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FocusVideo'
 *         createDate:
 *           type: string
 *           example: "2025-02-18T12:00:00Z"
 *         updateDate:
 *           type: string
 *           example: "2025-02-18T13:00:00Z"
 *         weather:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Weather'
 *
 *     FocusResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/Focus'
 *
 *     CreateFocusRequest:
 *       type: object
 *       properties:
 *         judul:
 *           type: string
 *           example: "focus B"
 *         isDefault:
 *           type: boolean
 *           example: true
 *         simpulTransportasi:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               matra:
 *                 type: string
 *                 example: "darat"
 *               moda:
 *                 type: string
 *                 example: "jalan"
 *               simpul:
 *                 type: string
 *                 example: "point C"
 *         cctv:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               matra:
 *                 type: string
 *                 example: "air"
 *               simpul:
 *                 type: string
 *                 example: "point D"
 *               titikCctv:
 *                 type: string
 *                 example: "21.3456, 65.9876"
 *         video30s:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FocusVideo'
 *         videoLiveStreaming:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FocusVideo'
 */

/**
 * @openapi
 * /focus:
 *   get:
 *     tags:
 *     - Focus
 *     summary: Get a paginated list of focus records with optional filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tanggalAwal1
 *         schema:
 *           type: string
 *           example: "2024-01-01"
 *         description: "The start date for the range (format: YYYY-MM-DD)"
 *       - in: query
 *         name: tanggalAkhir1
 *         schema:
 *           type: string
 *           example: "2024-01-07"
 *         description: "The end date for the range (format: YYYY-MM-DD)"
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *           example: "Holiday"
 *         description: "The event to aggregate seasonal data for"
 *       - in: query
 *         name: isDefault
 *         schema:
 *           type: boolean
 *           example: "true"
 *         description: "Whether to filter by default focus or custom focus by the user"
 *     responses:
 *       200:
 *         description: Successfully retrieved focus records
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FocusResponse'
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *     - Focus
 *     summary: Create a new focus record
 *     security:
 *       - bearerAuth: []
 *     description: Adds a new focus record to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFocusRequest'
 *     responses:
 *       201:
 *         description: Successfully created a new focus record
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
