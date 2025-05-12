import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Video, {
  OnLoadData,
  OnProgressData,
  VideoRef,
} from "react-native-video";
import { useRef, useState } from "react";
import VideoControls from "./VideoControls";
import { router } from "expo-router";

interface VideoPlayerProps {
  setCurrentTime: (time: number) => void;
}

const { width } = Dimensions.get("window");
const height = (width * 9) / 16;

const VideoPlayer = ({ setCurrentTime: sendCurrentTime }: VideoPlayerProps) => {
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  const togglePlayPause = () => setPaused((prev) => !prev);
  const toggleMute = () => setMuted((prev) => !prev);
  const seekBy = (seconds: number) => {
    const newTime = currentTime + seconds;
    videoRef.current?.seek?.(newTime);
    setCurrentTime(newTime);
    sendCurrentTime(newTime);
  };

  const handleVideoFocus = () => {
    setOverlayVisible(true);
    setControlsVisible(true);
    setTimeout(() => {
      setControlsVisible(false);
      setOverlayVisible(false);
    }, 3000);
  };

  const handleLoad = (data: OnLoadData) => {
    setDuration(data.duration);
    setLoading(false);
  };

  const handleProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
    sendCurrentTime(data.currentTime);
  };

  const handleSlide = (value: number) => {
    videoRef.current?.seek(value);
    setCurrentTime(value);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
    }
  };

  return (
    <View className="relative bg-black" style={{ width, height }}>
      <TouchableWithoutFeedback onPress={handleVideoFocus}>
        <View className="absolute top-0 left-0 right-0 bottom-0">
          <Video
            ref={videoRef}
            source={{
              uri: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
            }}
            style={{ width: "100%", height, backgroundColor: "black" }}
            resizeMode="contain"
            paused={paused}
            muted={muted}
            controls={false}
            onLoad={handleLoad}
            onProgress={handleProgress}
          />
        </View>
      </TouchableWithoutFeedback>

      {loading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-[#00000025]">
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}

      {overlayVisible && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "white",
            opacity: 0.25,
          }}
        />
      )}

      {controlsVisible && (
        <VideoControls
          paused={paused}
          muted={muted}
          onToggleFullScreen={toggleFullscreen}
          onPlayPause={togglePlayPause}
          onMute={toggleMute}
          onSeekForward={() => seekBy(10)}
          onSeekBackward={() => seekBy(-10)}
          onBack={() => router.back()}
          currentTime={currentTime}
          duration={duration}
          onSlide={handleSlide}
        />
      )}
    </View>
  );
};

export default VideoPlayer;
