/**
 * @openapi
 * '/v2/app-settings/value':
 *   get:
 *     tags:
 *       - v2 App Settings
 *     summary: Get application setting value and optionally compare with client value
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: platform
 *         required: true
 *         schema:
 *           type: string
 *         description: Platform name (web, mobile, admin, etc)
 *       - in: query
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Setting key name
 *       - in: query
 *         name: compare
 *         required: false
 *         schema:
 *           type: string
 *         description: |
 *           Optional value sent by client to compare with stored value.
 *           Response will include `isMatch` (true/false).
 *     responses:
 *       200:
 *         description: Successfully retrieved setting value
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 value:
 *                   description: Value stored in app settings
 *                   example: "1.1.1"
 *                 isMatch:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request - Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "platform and key are required"
 *       404:
 *         description: Setting not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 value:
 *                   nullable: true
 *                   example: null
 *                 isMatch:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal Server Error
 */
