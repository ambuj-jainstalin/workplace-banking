
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FaceVerificationProps {
  onCapture: (videoBlob: Blob) => void;
  onComplete: () => void;
  className?: string;
  otpToRepeat?: string;
}

const FaceVerification: React.FC<FaceVerificationProps> = ({
  onCapture,
  onComplete,
  className,
  otpToRepeat = '123456',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [recordingTime, setRecordingTime] = useState(0);
  const [status, setStatus] = useState<'initial' | 'countdown' | 'recording' | 'processing' | 'success' | 'error'>('initial');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize camera
  const initCamera = async () => {
    try {
      setStatus('initial');
      setErrorMessage(null);
      
      const constraints = {
        audio: false,
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = mediaRecorder;
      
      const recordedChunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
        onCapture(recordedBlob);
        setStatus('processing');
        
        // Simulate processing and success
        setTimeout(() => {
          setStatus('success');
          onComplete();
        }, 2000);
      };
      
    } catch (err) {
      console.error('Error accessing camera:', err);
      setErrorMessage('Unable to access camera. Please ensure you have given permission.');
      setStatus('error');
    }
  };

  // Start recording process
  const startRecording = () => {
    setStatus('countdown');
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          beginRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Begin actual recording
  const beginRecording = () => {
    if (mediaRecorderRef.current) {
      setStatus('recording');
      setIsRecording(true);
      setRecordingTime(0);
      mediaRecorderRef.current.start();
      
      const recordingInterval = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= 5) {
            clearInterval(recordingInterval);
            stopRecording();
            return 5;
          }
          return newTime;
        });
      }, 1000);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Clean up resources when component unmounts
  useEffect(() => {
    initCamera();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
        {status === 'error' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="text-center p-4">
              <p className="text-ncba-red font-medium mb-2">{errorMessage}</p>
              <Button onClick={initCamera} variant="outline" size="sm">
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {status === 'countdown' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-5xl font-bold text-white">{countdown}</div>
              </div>
            )}
            
            {status === 'recording' && (
              <div className="absolute top-4 right-4 flex items-center">
                <div className="w-3 h-3 rounded-full bg-ncba-red animate-pulse mr-2"></div>
                <span className="text-white text-sm">{recordingTime}s</span>
              </div>
            )}
            
            {status === 'processing' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center text-white">
                  <div className="h-8 w-8 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto mb-2"></div>
                  <p>Processing...</p>
                </div>
              </div>
            )}
            
            {status === 'success' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-center text-white">
                  <div className="h-12 w-12 rounded-full bg-ncba-green flex items-center justify-center mx-auto mb-2">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <p>Verification Complete!</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {status === 'initial' && (
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-ncba-lightBlue">
            <h4 className="font-medium mb-2">Please say the following OTP when recording:</h4>
            <div className="text-lg font-semibold tracking-widest text-center py-2 bg-white rounded">
              {otpToRepeat}
            </div>
          </div>
          
          <Button onClick={startRecording} className="w-full bg-ncba-blue">
            Start Recording
          </Button>
        </div>
      )}

      {status === 'recording' && (
        <div className="text-center text-sm text-gray-600">
          Please look directly at the camera and clearly say the OTP numbers
        </div>
      )}
    </div>
  );
};

export default FaceVerification;
