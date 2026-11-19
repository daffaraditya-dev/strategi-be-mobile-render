/**
 * @openapi
 * /cctv:
 *   get:
 *     tags:
 *     - CCTV
 *     summary: Get the list of CCTV streams
 *     description: Retrieves a list of CCTV stream data with details like location, stream URL, and more. You can filter the results based on specific fields.
 *     parameters:
 *       - in: query
 *         name: matra
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter CCTV streams by matra (e.g., "darat")
 *       - in: query
 *         name: namaProvinsi
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter CCTV streams by namaProvinsi (e.g., "Jakarta")
 *       - in: query
 *         name: namaKabupatenKota
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter CCTV streams by namaKabupatenKota (e.g., "Cimanggis")
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search CCTV streams by any relevant field (e.g., location name, CCTV name)
 *     responses:
 *       200:
 *         description: Successfully fetched CCTV streams
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
 *                         example: "Cimanggis-Cibitung"
 *                       namaCctv:
 *                         type: string
 *                         example: "KM 53+500"
 *                       streamUrl:
 *                         type: string
 *                         format: uri
 *                         example: "https://streaming-cct.co.id/LiveApp/streams/728033679170510237677933.m3u8"
 *                       status:
 *                         type: string
 *                         enum: [online, offline]
 *                         example: "online"
 *                       namaPengelola:
 *                         type: string
 *                         example: "PT Cimanggis Cibitung Tollways"
 *                       protocol:
 *                         type: string
 *                         example: "m3u8"
 *                       latitude:
 *                         type: string
 *                         example: "0"
 *                       longitude:
 *                         type: string
 *                         example: "0"
 *                       source:
 *                         type: string
 *                         example: "BUJT"
 *                       tagKategori:
 *                         type: string
 *                         example: "toll"
 *                       matra:
 *                         type: string
 *                         example: "darat"
 *                       namaKabupatenKota:
 *                         type: string
 *                         example: ""
 *                       namaProvinsi:
 *                         type: string
 *                         example: ""
 *       500:
 *         description: Internal server error
 */
