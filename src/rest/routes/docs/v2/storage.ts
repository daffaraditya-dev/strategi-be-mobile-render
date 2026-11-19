/**
 * @openapi
 * /v2/storage/uploads:
 *   post:
 *     tags:
 *       - v2 Upload
 *     summary: Upload one or multiple files
 *     description: Upload files to the server. Returns file metadata and URL for each uploaded file.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File(s) to upload
 *     responses:
 *       "201":
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       filename:
 *                         type: string
 *                         example: "abc123.png"
 *                       originalname:
 *                         type: string
 *                         example: "profile.png"
 *                       size:
 *                         type: integer
 *                         example: 24567
 *                       mimetype:
 *                         type: string
 *                         example: "image/png"
 *                       destination:
 *                         type: string
 *                         example: "uploads/"
 *                       fileURL:
 *                         type: string
 *                         example: "http://localhost:3000/v1/mob/api/uploads/abc123.png"
 *       "400":
 *         description: Invalid request (e.g., validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["file is required"]
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to upload file"
 */
