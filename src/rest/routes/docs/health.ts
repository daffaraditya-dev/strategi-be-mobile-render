/**
 * @openapi
 * '/health':
 *  get:
 *     tags:
 *     - Health
 *     summary: check server is up
 *     responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: A message indicating the health status
 *                     memoryUsage:
 *                       type: object
 *                       properties:
 *                         rss:
 *                           type: number
 *                         heapTotal:
 *                           type: number
 *                         heapUsed:
 *                           type: number
 *                         external:
 *                           type: number
 *                         arrayBuffers:
 *                           type: number
 *                     cpuUsage:
 *                       type: object
 *                       properties:
 *                         user:
 *                           type: number
 *                         system:
 *                           type: number
 *                     totalMemory:
 *                       type: string
 *                       description: Total memory available
 *                     freeMemory:
 *                       type: string
 *                       description: Free memory available
 *      500:
 *        description: Server Error
 */
