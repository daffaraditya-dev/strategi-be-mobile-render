/**
 * @openapi
 * '/v2/od':
 *  get:
 *     tags:
 *     - v2 OD
 *     summary: Get routine OD data for specified date range
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         description: Event to aggregate seasonal data for (optional)
 *       - in: query
 *         name: moda
 *         schema:
 *           type: string
 *         required: true
 *         description: "Moda transportation option : jalan, laut, asdp, arteri, udara, stasiun & toll"
 *       - in: query
 *         name: tanggalAwal1
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the data query (format YYYY-MM-DD)
 *       - in: query
 *         name: tanggalAkhir1
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
*         description: Filter multiple types like domestik and internasional
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: current page
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: data per page
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
 *                       passenger:
 *                         type: integer
 *                         example: 0
 *                       vehicle:
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
 * '/v2/od/detail':
 *  get:
 *     tags:
 *     - v2 OD
 *     summary: Get detail OD data for specified date range
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: moda
 *         schema:
 *           type: string
 *         required: true
 *         description: "Moda transportation option : jalan, laut, asdp, arteri, udara, stasiun & toll"
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         description: Event to aggregate seasonal data for (optional)
 *       - in: query
 *         name: tanggalAwal1
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the data query (format YYYY-MM-DD)
 *       - in: query
 *         name: tanggalAkhir1
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
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter multiple types like domestik and internasional
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
 *                 data:
 *                   type: object
 *                   properties:
 *                       daily:
 *                         type: object
 *                         additionalProperties:
 *                           type: object
 *                           properties:
 *                             passengers:
 *                               type: integer
 *                             vehicle:
 *                               type: integer
 *                       weekly:
 *                         type: object
 *                         additionalProperties:
 *                           type: object
 *                           properties:
 *                             passengers:
 *                               type: integer
 *                             vehicle:
 *                               type: integer
 *                       monthly:
 *                         type: object
 *                         additionalProperties:
 *                           type: object
 *                           properties:
 *                             passengers:
 *                               type: integer
 *                             vehicle:
 *                               type: integer
 *                       yearly:
 *                         type: object
 *                         additionalProperties:
 *                           type: object
 *                           properties:
 *                             passengers:
 *                               type: integer
 *                             vehicle:
 *                               type: integer
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
