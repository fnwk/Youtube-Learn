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
  OnBufferData,
  VideoRef,
} from "react-native-video";
import {
  showRoutePicker,
  useExternalPlaybackAvailability,
} from "react-airplay";
import { useRef, useState } from "react";
import VideoControls from "./VideoControls";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useT } from "@/i18n/useTranslation";

interface VideoPlayerProps {
  setCurrentTime: (time: number) => void;
}

const { width } = Dimensions.get("window");
const height = (width * 9) / 16;

const VideoPlayer = ({ setCurrentTime: sendCurrentTime }: VideoPlayerProps) => {
  const { t } = useT("video");
  const videoRef = useRef<VideoRef>(null);
  const isExternalPlaybackAvailable = useExternalPlaybackAvailability();

  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(false);

  const togglePlayPause = () => setPaused((prev) => !prev);
  const toggleMute = () => setMuted((prev) => !prev);
  const seekBy = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    videoRef.current?.seek(newTime);
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

  const handleBuffer = (data: OnBufferData) => {
    setBuffering(data.isBuffering);
    if (!data.isBuffering) {
      if (paused) {
        setPaused(false);
      }
    }
  };

  const handleSeekComplete = (value: number) => {
    videoRef.current?.seek(value);
    setCurrentTime(value);
    sendCurrentTime(value);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    videoRef.current?.presentFullscreenPlayer();
  };

  const toggleAirplay = () => {
    if (!isExternalPlaybackAvailable) {
      Toast.show({
        type: "error",
        text1: t("airplayNotAvailable"),
        position: "bottom",
      });
      return;
    }
    showRoutePicker({ prioritizesVideoDevices: true });
  };

  const showSpinner = loading || buffering;

  return (
    <View className="relative bg-black" style={{ width, height }}>
      <TouchableWithoutFeedback onPress={handleVideoFocus}>
        <View className="absolute top-0 left-0 right-0 bottom-0">
          <Video
            ref={videoRef}
            source={require("@/assets/video/broadchurch.mp4")}
            style={{ width: "100%", height, backgroundColor: "black" }}
            resizeMode="contain"
            paused={paused}
            muted={muted}
            controls={false}
            onLoad={handleLoad}
            onProgress={handleProgress}
            onBuffer={handleBuffer}
            onEnd={() => setPaused(true)}
            showNotificationControls={true}
          />
        </View>
      </TouchableWithoutFeedback>

      {showSpinner && (
        <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-[#00000088]">
          <ActivityIndicator size="large" color="#fff" />
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
          onToggleAirplay={toggleAirplay}
          onToggleFullScreen={toggleFullscreen}
          onPlayPause={togglePlayPause}
          onMute={toggleMute}
          onSeekForward={() => seekBy(10)}
          onSeekBackward={() => seekBy(-10)}
          onBack={() => router.back()}
          currentTime={currentTime}
          duration={duration}
          onSeekComplete={handleSeekComplete}
          loading={showSpinner}
        />
      )}
    </View>
  );
};

export default VideoPlayer;
