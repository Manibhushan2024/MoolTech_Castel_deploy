"use client"

import { useRef, useState } from "react"

interface VoiceRecorderProps {
  onAudioCapture?: (blob: Blob) => void
}

export function VoiceRecorder({ onAudioCapture }: VoiceRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasRecording, setHasRecording] = useState(false)
  const [micPermissionDenied, setMicPermissionDenied] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = async () => {
    try {
      setMicPermissionDenied(false)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        if (audioRef.current) {
          audioRef.current.src = URL.createObjectURL(audioBlob)
        }
        setHasRecording(true)
        onAudioCapture?.(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 60) {
            stopRecording()
            return 60
          }
          return prev + 1
        })
      }, 1000)
    } catch (error) {
      if ((error as DOMException).name === "NotAllowedError") {
        setMicPermissionDenied(true)
      }
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const deleteRecording = () => {
    setHasRecording(false)
    setRecordingTime(0)
    audioChunksRef.current = []
    if (audioRef.current) {
      audioRef.current.src = ""
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-3">
      {micPermissionDenied && (
        <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded text-sm">
          Microphone access denied. You can upload an .mp3, .wav, or .webm file (max 10MB) instead.
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {!isRecording && !hasRecording && (
          <button
            onClick={startRecording}
            className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium transition"
          >
             Start Recording
          </button>
        )}

        {isRecording && (
          <>
            <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded">
              <span className="animate-pulse"></span>
              <span className="text-sm font-medium">{formatTime(recordingTime)} / 60s</span>
            </div>
            <button
              onClick={stopRecording}
              className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition"
            >
               Stop
            </button>
          </>
        )}

        {hasRecording && !isRecording && (
          <>
            <audio
              ref={audioRef}
              controls
              className="flex-1 min-w-[200px] dark:bg-gray-800"
            />
            <button
              onClick={deleteRecording}
              className="bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition"
            >
               Delete
            </button>
          </>
        )}
      </div>

      {micPermissionDenied && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Audio File (Optional)
          </label>
          <input
            type="file"
            accept=".mp3,.wav,.webm,audio/*"
            className="block w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:file:bg-blue-700 dark:hover:file:bg-blue-600"
          />
        </div>
      )}
    </div>
  )
}
