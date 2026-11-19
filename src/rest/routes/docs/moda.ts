/**
 * @openapi
 * '/moda/aggregate/{moda}/routine':
 *  get:
 *    tags:
 *      - Moda
 *    summary: Aggregate routine data by date range
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: moda
 *        schema:
 *          type: string
 *        required: true
 *        description: "Moda transportation option : jalan, laut, asdp, arteri, udara, stasiun & toll"
 *      - in: query
 *        name: tanggalAwal1
 *        required: true
 *        schema:
 *          type: string
 *          example: "2024-01-01"
 *        description: "The start date for the range (format: YYYY-MM-DD)"
 *      - in: query
 *        name: tanggalAkhir1
 *        required: true
 *        schema:
 *          type: string
 *          example: "2024-01-07"
 *        description: "The end date for the range (format: YYYY-MM-DD)"
 *      - in: query
 *        name: provinsi
 *        required: false
 *        schema:
 *          type: string
 *          example: "Jawa Timur"
 *        description: "The province for the data filtering (optional)"
 *    responses:
 *      200:
 *        description: Successfully aggregated routine data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Success"
 *                data:
 *                  type: object
 *                  properties:
 *                    graph:
 *                      type: object
 *                      properties:
 *                        weekly:
 *                          type: object
 *                          additionalProperties:
 *                            type: object
 *                            properties:
 *                              arrival:
 *                                type: integer
 *                                example: 1507
 *                              departure:
 *                                type: integer
 *                                example: 1866
 *                              vehicleArrival:
 *                                type: integer
 *                                example: 277
 *                              vehicleDeparture:
 *                                type: integer
 *                                example: 286
 *                        monthly:
 *                          type: object
 *                          additionalProperties:
 *                            type: object
 *                            properties:
 *                              arrival:
 *                                type: integer
 *                                example: 3023
 *                              departure:
 *                                type: integer
 *                                example: 3921
 *                              vehicleArrival:
 *                                type: integer
 *                                example: 584
 *                              vehicleDeparture:
 *                                type: integer
 *                                example: 619
 *                        yearly:
 *                          type: object
 *                          additionalProperties:
 *                            type: object
 *                            properties:
 *                              arrival:
 *                                type: integer
 *                                example: 3023
 *                              departure:
 *                                type: integer
 *                                example: 3921
 *                              vehicleArrival:
 *                                type: integer
 *                                example: 584
 *                              vehicleDeparture:
 *                                type: integer
 *                                example: 619
 *                    list:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          idLocation:
 *                            type: integer
 *                            example: 298
 *                          name:
 *                            type: string
 *                            example: "Sigli"
 *                          city:
 *                            type: string
 *                            example: "Pidie"
 *                          type:
 *                            type: string
 *                            example: "B"
 *                          departure:
 *                            type: integer
 *                            example: 76
 *                          arrival:
 *                            type: integer
 *                            example: 0
 *                          vehicleDeparture:
 *                            type: integer
 *                            example: 3
 *                          vehicleArrival:
 *                            type: integer
 *                            example: 0
 *                          longitude:
 *                            type: string
 *                            example: "95.9619444444"
 *                          latitude:
 *                            type: string
 *                            example: "5.38361111091"
 *                          coordinate:
 *                            type: string
 *                            example: "5° 23' 1,000\" N  95° 57' 43,000\" E"
 *                          timezone:
 *                            type: string
 *                            example: ""
 *                    chartFlight:
 *                       type: object
 *                       properties:
 *                         passengers:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                             outbound:
 *                               type: integer
 *                             inbound:
 *                               type: integer
 *                         aircraft:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                             outbound:
 *                               type: integer
 *                             inbound:
 *                               type: integer
 *                    chartSailing:
 *                       type: object
 *                       properties:
 *                         passengers:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                             outbound:
 *                               type: integer
 *                             inbound:
 *                               type: integer
 *                         ship:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                             outbound:
 *                               type: integer
 *                             inbound:
 *                               type: integer
 *      400:
 *        description: Invalid request parameters
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Invalid parameters"
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Internal server error"
 * '/moda/aggregate/{moda}/seasonal':
 *  get:
 *    tags:
 *      - Moda
 *    summary: Aggregate seasonal data for events
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: moda
 *        schema:
 *          type: string
 *        required: true
 *        description: "Moda transportation option : jalan, laut, asdp, arteri, udara, stasiun & toll"
 *      - in: query
 *        name: event
 *        required: true
 *        schema:
 *          type: string
 *          example: "Holiday"
 *        description: "The event to aggregate seasonal data for"
 *      - in: query
 *        name: provinsi
 *        required: false
 *        schema:
 *          type: string
 *          example: "Jawa Timur"
 *        description: "The province for the data filtering (optional)"
 *    responses:
 *      200:
 *        description: Successfully aggregated seasonal data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: "Success"
 *                data:
 *                  type: object
 *                  properties:
 *                    graph:
 *                      type: object
 *                      properties:
 *                        seasonal:
 *                          type: object
 *                          additionalProperties:
 *                            type: object
 *                            properties:
 *                              arrival:
 *                                type: integer
 *                                example: 1026
 *                              departure:
 *                                type: integer
 *                                example: 1628
 *                              vehicleArrival:
 *                                type: integer
 *                                example: 296
 *                              vehicleDeparture:
 *                                type: integer
 *                                example: 298
 *                    list:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          idLocation:
 *                            type: integer
 *                            example: 298
 *                          name:
 *                            type: string
 *                            example: "Sigli"
 *                          city:
 *                            type: string
 *                            example: "Pidie"
 *                          type:
 *                            type: string
 *                            example: "B"
 *                          departure:
 *                            type: integer
 *                            example: 0
 *                          arrival:
 *                            type: integer
 *                            example: 0
 *                          vehicleDeparture:
 *                            type: integer
 *                            example: 0
 *                          vehicleArrival:
 *                            type: integer
 *                            example: 0
 *                          longitude:
 *                            type: string
 *                            example: "95.9619444444"
 *                          latitude:
 *                            type: string
 *                            example: "5.38361111091"
 *                          coordinate:
 *                            type: string
 *                            example: "5° 23' 1,000\" N  95° 57' 43,000\" E"
 *                          timezone:
 *                            type: string
 *                            example: ""
 *                    chartFlight:
 *                       type: object
 *                       properties:
 *                         passengers:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                             outbound:
 *                               type: integer
 *                             inbound:
 *                               type: integer
 *                         aircraft:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                             outbound:
 *                               type: integer
 *                             inbound:
 *                               type: integer
 *                    chartSailing:
 *                       type: object
 *                       properties:
 *                         passengers:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                             outbound:
 *                               type: integer
 *                             inbound:
 *                               type: integer
 *                         ship:
 *                           type: object
 *                           properties:
 *                             domestic:
 *                               type: integer
 *                             outbound:
 *                               type: integer
 *                             inbound:
 *                               type: integer
 *      400:
 *        description: Invalid request parameters
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Invalid parameters"
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  example: "Internal server error"
 * '/moda/regional/routine':
 *  get:
 *     tags:
 *     - Moda
 *     summary: Get regional routine data for specified date range and province
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         name: provinsi
 *         required: true
 *         schema:
 *           type: string
 *         description: Province name to filter the data
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional type parameter for filtering (domestik or internasional)
 *       - in: query
 *         name: moda
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional type parameter for determine which moda to use
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
 *                     graph:
 *                       type: object
 *                       properties:
 *                         weekly:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               date:
 *                                 type: string
 *                                 format: date
 *                               value:
 *                                 type: number
 *                         monthly:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               date:
 *                                 type: string
 *                                 format: date
 *                               value:
 *                                 type: number
 *                         yearly:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               date:
 *                                 type: string
 *                                 format: date
 *                               value:
 *                                 type: number
 *                     list:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           type:
 *                             type: string
 *                           region:
 *                             type: string
 *                           value:
 *                             type: number
 *                           latitude:
 *                             type: number
 *                             format: float
 *                           longitude:
 *                             type: number
 *                             format: float
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
 * '/moda/regional/{idLocation}/routine':
 *  get:
 *     tags:
 *     - Moda
 *     summary: Get detail regional routine data for specified date range and id location
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLocation
 *         schema:
 *           type: string
 *         required: true
 *         description: "Id location"
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
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional type parameter for filtering (domestik or internasional)
 *       - in: query
 *         name: moda
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional type parameter for determine which moda to use
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
 *                     weekly:
 *                       type: object
 *                       additionalProperties:
 *                         type: object
 *                         properties:
 *                           arrival:
 *                             type: integer
 *                             example: 1026
 *                           departure:
 *                             type: integer
 *                             example: 1628
 *                           vehicleArrival:
 *                             type: integer
 *                             example: 296
 *                           vehicleDeparture:
 *                             type: integer
 *                             example: 298
 *                     monthly:
 *                       type: object
 *                       additionalProperties:
 *                         type: object
 *                         properties:
 *                           arrival:
 *                             type: integer
 *                             example: 1026
 *                           departure:
 *                             type: integer
 *                             example: 1628
 *                           vehicleArrival:
 *                             type: integer
 *                             example: 296
 *                           vehicleDeparture:
 *                             type: integer
 *                             example: 298
 *                     yearly:
 *                       type: object
 *                       additionalProperties:
 *                         type: object
 *                         properties:
 *                           arrival:
 *                             type: integer
 *                             example: 1026
 *                           departure:
 *                             type: integer
 *                             example: 1628
 *                           vehicleArrival:
 *                             type: integer
 *                             example: 296
 *                           vehicleDeparture:
 *                             type: integer
 *                             example: 298
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
 * '/moda/regional/seasonal':
 *  get:
 *     tags:
 *     - Moda
 *     summary: Get seasonal regional data for specified event and province
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: event
 *         required: true
 *         schema:
 *           type: string
 *         description: The seasonal event id to query data for (e.g., "Christmas", "New Year", "Eid")
 *       - in: query
 *         name: provinsi
 *         required: true
 *         schema:
 *           type: string
 *         description: Province name to filter the data
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional type parameter for filtering (domestik or internasional)
 *       - in: query
 *         name: moda
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional type parameter for determine which moda to use
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
 *                   type: object
 *                   properties:
 *                     graph:
 *                       type: object
 *                       properties:
 *                         weekly:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               date:
 *                                 type: string
 *                                 format: date
 *                               value:
 *                                 type: number
 *                         monthly:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               date:
 *                                 type: string
 *                                 format: date
 *                               value:
 *                                 type: number
 *                         yearly:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               date:
 *                                 type: string
 *                                 format: date
 *                               value:
 *                                 type: number
 *                     list:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           type:
 *                             type: string
 *                           region:
 *                             type: string
 *                           value:
 *                             type: number
 *                           latitude:
 *                             type: number
 *                             format: float
 *                           longitude:
 *                             type: number
 *                             format: float
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
 * '/moda/regional/{idLocation}/seasonal':
 *  get:
 *     tags:
 *     - Moda
 *     summary: Get detail seasonal regional data for specified event and id location
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLocation
 *         schema:
 *           type: string
 *         required: true
 *         description: "Id location"
 *       - in: query
 *         name: event
 *         required: true
 *         schema:
 *           type: string
 *         description: The seasonal event id to query data for (e.g., "Christmas", "New Year", "Eid")
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional type parameter for filtering (domestik or internasional)
 *       - in: query
 *         name: moda
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional type parameter for determine which moda to use
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
 *                   type: object
 *                   properties:
 *                     weekly:
 *                       type: object
 *                       additionalProperties:
 *                         type: object
 *                         properties:
 *                           arrival:
 *                             type: integer
 *                             example: 1026
 *                           departure:
 *                             type: integer
 *                             example: 1628
 *                           vehicleArrival:
 *                             type: integer
 *                             example: 296
 *                           vehicleDeparture:
 *                             type: integer
 *                             example: 298
 *                     monthly:
 *                       type: object
 *                       additionalProperties:
 *                         type: object
 *                         properties:
 *                           arrival:
 *                             type: integer
 *                             example: 1026
 *                           departure:
 *                             type: integer
 *                             example: 1628
 *                           vehicleArrival:
 *                             type: integer
 *                             example: 296
 *                           vehicleDeparture:
 *                             type: integer
 *                             example: 298
 *                     yearly:
 *                       type: object
 *                       additionalProperties:
 *                         type: object
 *                         properties:
 *                           arrival:
 *                             type: integer
 *                             example: 1026
 *                           departure:
 *                             type: integer
 *                             example: 1628
 *                           vehicleArrival:
 *                             type: integer
 *                             example: 296
 *                           vehicleDeparture:
 *                             type: integer
 *                             example: 298
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
 */
