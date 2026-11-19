/**
 * @openapi
 * /news/rss:
 *   get:
 *     tags:
 *     - News
 *     summary: Fetch RSS Feed Data
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves and parses RSS feed data from the specified URL.
 *     responses:
 *       200:
 *         description: Successfully retrieved RSS feed data
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
 *                     title:
 *                       type: string
 *                       example: "Latest News"
 *                     link:
 *                       type: string
 *                       example: "https://example.com/rss"
 *                     description:
 *                       type: string
 *                       example: "Daily news updates"
 *                     image:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                           example: "https://example.com/image.jpg"
 *                     language:
 *                       type: string
 *                     pubDate:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                           link:
 *                             type: string
 *                           pubDate:
 *                             type: string
 *                           description:
 *                             type: string
 *                           author:
 *                             type: string
 *                           guid:
 *                             type: string
 *                           enclosure:
 *                             type: object
 *                             properties:
 *                               url:
 *                                 type: string
 *                               length:
 *                                 type: string
 *                               type:
 *                                 type: string
 *       500:
 *         description: Internal server error
 */
