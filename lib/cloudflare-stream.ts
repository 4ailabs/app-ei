/**
 * Cloudflare Stream API Client
 * 
 * Documentación: https://developers.cloudflare.com/stream/
 */

export interface CloudflareStreamUploadResponse {
  result: {
    uid: string
    thumbnail: string
    readyToStream: boolean
    status: {
      state: string
      pctComplete: string
    }
    meta: {
      name?: string
    }
    created: string
    modified: string
    size: number
    duration: number
    input: {
      width: number
      height: number
      duration: number
    }
    playback: {
      hls: string
      dash: string
    }
    watermark?: string
  }
  success: boolean
  errors: any[]
  messages: any[]
}

export interface CloudflareStreamVideo {
  uid: string
  thumbnail: string
  readyToStream: boolean
  status: {
    state: string
    pctComplete: string
  }
  meta: {
    name?: string
  }
  created: string
  modified: string
  size: number
  duration: number
  input: {
    width: number
    height: number
    duration: number
  }
  playback: {
    hls: string
    dash: string
  }
}

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN
const CLOUDFLARE_STREAM_BASE_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream`

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
  console.warn(
    "⚠️  Cloudflare Stream credentials not configured. Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN environment variables."
  )
}

/**
 * Upload a video file to Cloudflare Stream
 */
export async function uploadVideoToStream(
  file: File | Buffer,
  filename: string,
  metadata?: { name?: string; [key: string]: any }
): Promise<CloudflareStreamUploadResponse> {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error("Cloudflare Stream credentials not configured")
  }

  const formData = new FormData()
  
  // If file is a Buffer, convert to Blob
  if (Buffer.isBuffer(file)) {
    const blob = new Blob([file])
    formData.append("file", blob, filename)
  } else {
    formData.append("file", file)
  }

  if (metadata) {
    formData.append("meta", JSON.stringify(metadata))
  }

  const response = await fetch(CLOUDFLARE_STREAM_BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Cloudflare Stream upload failed: ${error}`)
  }

  return response.json()
}

/**
 * Upload a video from URL to Cloudflare Stream
 */
export async function uploadVideoFromUrl(
  url: string,
  metadata?: { name?: string; [key: string]: any }
): Promise<CloudflareStreamUploadResponse> {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error("Cloudflare Stream credentials not configured")
  }

  const response = await fetch(`${CLOUDFLARE_STREAM_BASE_URL}/copy`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      meta: metadata || {},
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Cloudflare Stream upload from URL failed: ${error}`)
  }

  return response.json()
}

/**
 * Get video details by UID
 */
export async function getVideoDetails(uid: string): Promise<CloudflareStreamVideo> {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error("Cloudflare Stream credentials not configured")
  }

  const response = await fetch(`${CLOUDFLARE_STREAM_BASE_URL}/${uid}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to fetch video: ${error}`)
  }

  const data = await response.json()
  return data.result
}

/**
 * List all videos in the account
 */
export async function listVideos(options?: {
  search?: string
  limit?: number
  before?: string
  after?: string
}): Promise<CloudflareStreamVideo[]> {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error("Cloudflare Stream credentials not configured")
  }

  const params = new URLSearchParams()
  if (options?.search) params.append("search", options.search)
  if (options?.limit) params.append("limit", options.limit.toString())
  if (options?.before) params.append("before", options.before)
  if (options?.after) params.append("after", options.after)

  const queryString = params.toString()
  const url = queryString
    ? `${CLOUDFLARE_STREAM_BASE_URL}?${queryString}`
    : CLOUDFLARE_STREAM_BASE_URL

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to list videos: ${error}`)
  }

  const data = await response.json()
  return data.result || []
}

/**
 * Delete a video by UID
 */
export async function deleteVideo(uid: string): Promise<void> {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error("Cloudflare Stream credentials not configured")
  }

  const response = await fetch(`${CLOUDFLARE_STREAM_BASE_URL}/${uid}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to delete video: ${error}`)
  }
}

/**
 * Get the embed URL for a video (for iframe embedding)
 * Can be used both on server and client
 */
export function getStreamEmbedUrl(uid: string, accountId?: string, options?: {
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  preload?: "auto" | "metadata" | "none"
  poster?: string
}): string {
  const account = accountId || CLOUDFLARE_ACCOUNT_ID || process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID
  if (!account) {
    throw new Error("Cloudflare Account ID is required")
  }

  const params = new URLSearchParams()
  if (options?.autoplay) params.append("autoplay", "true")
  if (options?.controls !== undefined) params.append("controls", options.controls.toString())
  if (options?.loop) params.append("loop", "true")
  if (options?.muted) params.append("muted", "true")
  if (options?.preload) params.append("preload", options.preload)
  if (options?.poster) params.append("poster", options.poster)

  const queryString = params.toString()
  return `https://customer-${account}.cloudflarestream.com/${uid}/iframe${queryString ? `?${queryString}` : ""}`
}

/**
 * Get the direct playback URL (HLS or DASH)
 */
export async function getPlaybackUrl(uid: string, format: "hls" | "dash" = "hls"): Promise<string> {
  const video = await getVideoDetails(uid)
  return format === "hls" ? video.playback.hls : video.playback.dash
}

