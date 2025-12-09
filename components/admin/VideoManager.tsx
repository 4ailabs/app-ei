"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Video, Upload, Trash2, Loader2, CheckCircle2, XCircle, RefreshCw } from "lucide-react"

interface CloudflareVideo {
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
  duration: number
  playback: {
    hls: string
    dash: string
  }
}

export function VideoManager() {
  const [videos, setVideos] = useState<CloudflareVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file")
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadUrl, setUploadUrl] = useState("")
  const [videoName, setVideoName] = useState("")
  const [showUploadForm, setShowUploadForm] = useState(false)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/videos")
      if (!response.ok) throw new Error("Error al cargar videos")

      const data = await response.json()
      setVideos(data.videos || [])
    } catch (error) {
      console.error("Error fetching videos:", error)
      alert("Error al cargar videos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadFile(file)
    }
  }

  const handleUpload = async () => {
    if (uploadMethod === "file" && !uploadFile) {
      alert("Por favor selecciona un archivo")
      return
    }

    if (uploadMethod === "url" && !uploadUrl) {
      alert("Por favor ingresa una URL")
      return
    }

    setUploading(true)

    try {
      let response: Response

      if (uploadMethod === "file") {
        const formData = new FormData()
        formData.append("file", uploadFile!)
        if (videoName) formData.append("name", videoName)

        response = await fetch("/api/videos/upload", {
          method: "POST",
          body: formData,
        })
      } else {
        response = await fetch("/api/videos/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: uploadUrl,
            name: videoName || undefined,
          }),
        })
      }

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error al subir video")
      }

      const data = await response.json()
      alert(`Video subido exitosamente! UID: ${data.video.uid}`)
      
      // Reset form
      setUploadFile(null)
      setUploadUrl("")
      setVideoName("")
      setShowUploadForm(false)
      
      // Refresh videos list
      fetchVideos()
    } catch (error: any) {
      alert(error.message || "Error al subir video")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (uid: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este video?")) {
      return
    }

    try {
      const response = await fetch(`/api/videos?uid=${uid}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error al eliminar video")
      }

      alert("Video eliminado exitosamente")
      fetchVideos()
    } catch (error: any) {
      alert(error.message || "Error al eliminar video")
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("UID copiado al portapapeles")
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-black">Gestión de Videos</h2>
          <p className="text-gray-600 mt-1">Sube y gestiona videos de Cloudflare Stream</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={fetchVideos}
            variant="outline"
            className="border-gray-300"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-black text-white hover:bg-gray-800"
          >
            <Upload className="h-4 w-4 mr-2" />
            Subir Video
          </Button>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-black mb-4">Subir Nuevo Video</h3>
          
          {/* Upload Method Toggle */}
          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => setUploadMethod("file")}
              variant={uploadMethod === "file" ? "default" : "outline"}
              className={uploadMethod === "file" ? "bg-black" : ""}
              size="sm"
            >
              Desde Archivo
            </Button>
            <Button
              onClick={() => setUploadMethod("url")}
              variant={uploadMethod === "url" ? "default" : "outline"}
              className={uploadMethod === "url" ? "bg-black" : ""}
              size="sm"
            >
              Desde URL
            </Button>
          </div>

          {/* File Upload */}
          {uploadMethod === "file" && (
            <div className="mb-4">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
              />
              {uploadFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Archivo seleccionado: {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          )}

          {/* URL Upload */}
          {uploadMethod === "url" && (
            <div className="mb-4">
              <input
                type="url"
                placeholder="https://ejemplo.com/video.mp4"
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          )}

          {/* Video Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre del video (opcional)"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleUpload}
              disabled={uploading || (uploadMethod === "file" && !uploadFile) || (uploadMethod === "url" && !uploadUrl)}
              className="bg-black text-white hover:bg-gray-800"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Subir
                </>
              )}
            </Button>
            <Button
              onClick={() => {
                setShowUploadForm(false)
                setUploadFile(null)
                setUploadUrl("")
                setVideoName("")
              }}
              variant="outline"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Videos List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Video className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No hay videos subidos aún</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {videos.map((video) => (
            <div
              key={video.uid}
              className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.meta.name || "Video thumbnail"}
                  className="w-32 h-20 object-cover rounded"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-black truncate">
                      {video.meta.name || "Sin nombre"}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>UID: {video.uid}</span>
                      <span>•</span>
                      <span>{formatDuration(video.duration)}</span>
                      <span>•</span>
                      <span>{formatDate(video.created)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {video.readyToStream ? (
                        <span className="inline-flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          Listo para reproducir
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-sm text-yellow-600">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Procesando ({video.status.pctComplete}%)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipboard(video.uid)}
                      variant="outline"
                      size="sm"
                      className="border-gray-300"
                    >
                      Copiar UID
                    </Button>
                    <Button
                      onClick={() => handleDelete(video.uid)}
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

