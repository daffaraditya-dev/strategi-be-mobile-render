/**
 * @openapi
 * '/summary/seasonal':
 *   get:
 *     tags:
 *       - Summary
 *     summary: Retrieve seasonal routine monitoring data
 *     security:
 *       - bearerAuth: []
 *     description: Fetches seasonal routine data based on given date ranges and optional filters.
 *     parameters:
 *       - in: query
 *         name: event
 *         required: true
 *         schema:
 *           type: string
 *         description: The event for which routine data is being fetched.
 *       - in: query
 *         name: provinsi
 *         required: false
 *         schema:
 *           type: string
 *         description: The province to filter the data (optional).
 *       - in: query
 *         name: moda
 *         required: false
 *         schema:
 *           type: string
 *         description: The mode of transportation to filter the data (optional).
 *     responses:
 *       200:
 *         description: Successfully retrieved routine data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     graph:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Jalan"
 *                           count:
 *                             type: integer
 *                             example: 1000
 *                     vehicle:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: "udara"
 *                           name:
 *                             type: string
 *                             example: "Pesawat"
 *                           count:
 *                             type: integer
 *                             example: 500
 *                           percent:
 *                             type: number
 *                             format: float
 *                             example: 75.5
 *                     network:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                             example: "toll"
 *                           name:
 *                             type: string
 *                             example: "Lalu Lintas Jalan Tol"
 *                           count:
 *                             type: integer
 *                             example: 2000
 *                           point:
 *                             type: integer
 *                             example: 150
 *                     flight:
 *                       type: object
 *                       properties:
 *                         passengers:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                               example: 10000
 *                             outbound:
 *                               type: integer
 *                               example: 5000
 *                             inbound:
 *                               type: integer
 *                               example: 5000
 *                         aircraft:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                               example: 100
 *                             outbound:
 *                               type: integer
 *                               example: 50
 *                             inbound:
 *                               type: integer
 *                               example: 50
 *                     sailing:
 *                       type: object
 *                       properties:
 *                         passengers:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                               example: 10000
 *                             outbound:
 *                               type: integer
 *                               example: 5000
 *                             inbound:
 *                               type: integer
 *                               example: 5000
 *                         ship:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                               example: 100
 *                             outbound:
 *                               type: integer
 *                               example: 50
 *                             inbound:
 *                               type: integer
 *                               example: 50
 *                     filter:
 *                       type: object
 *                       properties:
 *                         event:
 *                           type: string
 *                           example: "Event Name"
 *                         provinsi:
 *                           type: string
 *                           example: "Jawa Timur"
 *                         moda:
 *                           type: string
 *                           example: "Bus"
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid value for event"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * @swagger
 * /summary/routine:
 *   get:
 *     tags:
 *       - Summary
 *     summary: Get seasonal production data
 *     security:
 *       - bearerAuth: []
 *     description: Fetches data related to seasonal production and returns the summarized data.
 *     parameters:
 *       - in: query
 *         name: tanggalAwal1
 *         required: true
 *         schema:
 *           type: string
 *         description: Start date of the first period
 *       - in: query
 *         name: tanggalAkhir1
 *         required: true
 *         schema:
 *           type: string
 *         description: End date of the first period
 *       - in: query
 *         name: provinsi
 *         required: false
 *         schema:
 *           type: string
 *         description: Province filter (optional)
 *       - in: query
 *         name: moda
 *         required: false
 *         schema:
 *           type: string
 *         description: Mode of transport filter (optional)
 *     responses:
 *       200:
 *         description: Successfully fetched data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     graph:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           count:
 *                             type: number
 *                     vehicle:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                           name:
 *                             type: string
 *                           count:
 *                             type: number
 *                           percent:
 *                             type: number
 *                     network:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                           name:
 *                             type: string
 *                           count:
 *                             type: number
 *                           point:
 *                             type: number
 *                     flight:
 *                       type: object
 *                       properties:
 *                         passengers:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: number
 *                             outbound:
 *                               type: number
 *                             inbound:
 *                               type: number
 *                         aircraft:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: number
 *                             outbound:
 *                               type: number
 *                             inbound:
 *                               type: number
 *                 filter:
 *                   type: object
 *                   additionalProperties: true
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
