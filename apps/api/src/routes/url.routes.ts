import { Router } from "express";
import { shortenUrl } from "../services/url.service";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (
      typeof originalUrl !== "string" ||
      originalUrl.trim().length === 0
    ) {
      return res.status(400).json({
        error: "originalUrl is required"
      });
    }

    const url = await shortenUrl(originalUrl);

    return res.status(201).json({
      id: url.id,
      slug: url.slug,
      shortUrl: `http://localhost:3000/${url.slug}`,
      originalUrl: url.original_url,
      createdAt: url.created_at
    });
  } catch (error) {
    console.error("Failed to create short URL:", error);

    if (error instanceof Error && error.message === "Invalid URL") {
      return res.status(400).json({
        error: "Invalid URL"
      });
    }

    if (
      error instanceof Error &&
      error.message === "Only HTTP and HTTPS URLs are allowed"
    ) {
      return res.status(400).json({
        error: error.message
      });
    }

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

export default router;
