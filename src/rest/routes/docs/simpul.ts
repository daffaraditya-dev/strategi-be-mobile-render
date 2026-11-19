/**
 * @swagger
 * components:
 *   schemas:
 *     EventPayload:
 *       type: object
 *       required:
 *         - template
 *         - event
 *         - moda
 *         - reportType
 *         - page
 *         - pageSize
 *       properties:
 *         template:
 *           type: array
 *           items:
 *             type: string
 *           example: ["raw", "chart"]
 *         event:
 *           type: integer
 *           example: 22
 *         moda:
 *           type: string
 *           example: "JALAN"
 *         namaProvinsi:
 *           type: string
 *           example: "Riau"
 *         reportType:
 *           type: string
 *           example: "yearly"
 *         idLocation:
 *           type: string
 *           example: ""
 *         search:
 *           type: string
 *           example: ""
 *         page:
 *           type: string
 *           example: "1"
 *         pageSize:
 *           type: string
 *           example: "1"
 *         sort:
 *           type: string
 *           example: desc

 *     RutinPayload:
 *       type: object
 *       required:
 *         - template
 *         - tanggalAwal1
 *         - tanggalAkhir1
 *         - moda
 *         - reportType
 *         - page
 *         - pageSize
 *       properties:
 *         template:
 *           type: array
 *           items:
 *             type: string
 *           example: ["raw", "chart"]
 *         tanggalAwal1:
 *           type: string
 *           format: date
 *           example: "2025-05-01"
 *         tanggalAkhir1:
 *           type: string
 *           format: date
 *           example: "2025-05-31"
 *         moda:
 *           type: string
 *           example: "JALAN"
 *         namaProvinsi:
 *           type: string
 *           example: "Riau"
 *         reportType:
 *           type: string
 *           example: "yearly"
 *         idLocation:
 *           type: string
 *           example: ""
 *         search:
 *           type: string
 *           example: ""
 *         page:
 *           type: string
 *           example: "1"
 *         pageSize:
 *           type: string
 *           example: "1"
 *         sort:
 *           type: string
 *           example: desc

 * /simpul:
 *   post:
 *     summary: Get report data using event or date range
 *     tags:
 *       - Simpul
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/EventPayload'
 *               - $ref: '#/components/schemas/RutinPayload'
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid request
 */
