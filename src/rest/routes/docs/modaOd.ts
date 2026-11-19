/**
 * @openapi
 * '/moda/od/{moda}/routine':
 *  get:
 *     tags:
 *     - Moda
 *     summary: Get routine OD data for specified date range
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moda
 *         schema:
 *           type: string
 *         required: true
 *         description: "Moda transportation option : jalan, laut, asdp, arteri, udara, stasiun & toll"
 *       - in: query
 *         name: tanggalAwal1
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the data query (format YYYY-MM-DD)
 *       - in: query
 *         name: tanggalAkhir1
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the data query (format YYYY-MM-DD)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search parameter for filtering
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Type parameter for filtering domestik or internasional
 *     responses:
 *       200:
 *         description: Successfully retrieved regional routine data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idOrigin:
 *                         type: string
 *                       origin:
 *                         type: string
 *                       originCity:
 *                         type: string
 *                       originType:
 *                         type: string
 *                       idDestination:
 *                         type: string
 *                       destination:
 *                         type: string
 *                       destinationCity:
 *                         type: string
 *                       destinationType:
 *                         type: string
 *                       departure:
 *                         type: integer
 *                         example: 0
 *                       arrival:
 *                         type: integer
 *                         example: 0
 *                       vehicleDeparture:
 *                         type: integer
 *                         example: 0
 *                       vehicleArrival:
 *                         type: integer
 *                         example: 0
 *       400:
 *         description: Bad Request - Missing or invalid parameters
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
 *                   example: "\"tanggalAwal1\" is required"
 *       500:
 *         description: Internal Server Error
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
 *                   example: Internal server error
 * '/moda/od/{moda}/routine/detail':
 *  get:
 *     tags:
 *     - Moda
 *     summary: Get detail routine OD data for specified date range
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moda
 *         schema:
 *           type: string
 *         required: true
 *         description: "Moda transportation option : jalan, laut, asdp, arteri, udara, stasiun & toll"
 *       - in: query
 *         name: tanggalAwal1
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the data query (format YYYY-MM-DD)
 *       - in: query
 *         name: tanggalAkhir1
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the data query (format YYYY-MM-DD)
 *       - in: query
 *         name: idOrigin
 *         schema:
 *           type: string
 *         description: Search parameter for filtering
 *       - in: query
 *         name: idDestination
 *         schema:
 *           type: string
 *         description: Search parameter for filtering
 *       - in: query
 *         name: reportType
 *         schema:
 *           type: string
 *         description: Type of report to generate (e.g., "daily", "weekly", "monthly", "yearly")
 *     responses:
 *       200:
 *         description: Successfully retrieved regional routine data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     origin:
 *                       type: object
 *                       properties:
 *                         daily:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         weekly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         monthly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         yearly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                     destination:
 *                       type: object
 *                       properties:
 *                         daily:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         weekly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         monthly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         yearly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *       400:
 *         description: Bad Request - Missing or invalid parameters
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
 *                   example: "\"tanggalAwal1\" is required"
 *       500:
 *         description: Internal Server Error
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
 *                   example: Internal server error
 * '/moda/od/{moda}/seasonal':
 *  get:
 *     tags:
 *     - Moda
 *     summary: Get seasonal OD data for specified event
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moda
 *         schema:
 *           type: string
 *         required: true
 *         description: "Moda transportation option : jalan, laut, asdp, arteri, udara, stasiun & toll"
 *       - in: query
 *         name: event
 *         required: true
 *         schema:
 *           type: string
 *         description: The seasonal event id to query data for (e.g., "Christmas", "New Year", "Eid")
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search parameter for filtering
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Type parameter for filtering domestik or internasional
 *     responses:
 *       200:
 *         description: Successfully retrieved regional seasonal data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idOrigin:
 *                         type: string
 *                       origin:
 *                         type: string
 *                       originCity:
 *                         type: string
 *                       originType:
 *                         type: string
 *                       idDestination:
 *                         type: string
 *                       destination:
 *                         type: string
 *                       destinationCity:
 *                         type: string
 *                       destinationType:
 *                         type: string
 *                       departure:
 *                         type: integer
 *                         example: 0
 *                       arrival:
 *                         type: integer
 *                         example: 0
 *                       vehicleDeparture:
 *                         type: integer
 *                         example: 0
 *                       vehicleArrival:
 *                         type: integer
 *                         example: 0
 *       400:
 *         description: Bad Request - Missing or invalid parameters
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
 *                   example: "\"event\" is required"
 *       500:
 *         description: Internal Server Error
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
 *                   example: Internal server error
 * '/moda/od/{moda}/seasonal/detail':
 *  get:
 *     tags:
 *     - Moda
 *     summary: Get detail seasonal OD data for specified date range
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: moda
 *         schema:
 *           type: string
 *         required: true
 *         description: "Moda transportation option : jalan, laut, asdp, arteri, udara, stasiun & toll"
 *       - in: query
 *         name: event
 *         required: true
 *         schema:
 *           type: string
 *         description: The seasonal event id to query data for (e.g., "Christmas", "New Year", "Eid")
 *       - in: query
 *         name: idOrigin
 *         schema:
 *           type: string
 *         description: Search parameter for filtering
 *       - in: query
 *         name: idDestination
 *         schema:
 *           type: string
 *         description: Search parameter for filtering
 *       - in: query
 *         name: reportType
 *         schema:
 *           type: string
 *         description: Type of report to generate (e.g., "daily", "weekly", "monthly", "yearly")
 *     responses:
 *       200:
 *         description: Successfully retrieved regional routine data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     origin:
 *                       type: object
 *                       properties:
 *                         daily:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         weekly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         monthly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         yearly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                     destination:
 *                       type: object
 *                       properties:
 *                         daily:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         weekly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         monthly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *                         yearly:
 *                           type: object
 *                           additionalProperties:
 *                             type: object
 *                             properties:
 *                               arrival:
 *                                 type: integer
 *                               departure:
 *                                 type: integer
 *                               vehicleArrival:
 *                                 type: integer
 *                               vehicleDeparture:
 *                                 type: integer
 *       400:
 *         description: Bad Request - Missing or invalid parameters
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
 *                   example: "\"tanggalAwal1\" is required"
 *       500:
 *         description: Internal Server Error
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
 *                   example: Internal server error
 */
