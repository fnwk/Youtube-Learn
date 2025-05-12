import { View } from "react-native";
import Slider from "@react-native-community/slider";
import { IconButton, StyledText } from "@/components/ui";
import { tailwindColors } from "@/utils/colors";
import formatTime from "@/utils/formatTime";
import { useExternalPlaybackAvailability } from "react-airplay";
import cn from "@/utils/cn";
import { useState, useEffect } from "react";

interface VideoControlsProps {
  paused: boolean;
  muted: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onMute: () => void;
  onSeekForward: () => void;
  onSeekBackward: () => void;
  onBack: () => void;
  /** Fires once when user releases the slider thumb */
  onSeekComplete: (value: number) => void;
  onToggleFullScreen: () => void;
  onToggleAirplay: () => void;
  /** True while loading initial or buffering mid-playback */
  loading: boolean;
}

const VideoControls = ({
  paused,
  muted,
  currentTime,
  duration,
  onPlayPause,
  onMute,
  onSeekForward,
  onSeekBackward,
  onBack,
  onSeekComplete,
  onToggleFullScreen,
  onToggleAirplay,
  loading,
}: VideoControlsProps) => {
  const isExternalPlaybackAvailable = useExternalPlaybackAvailability();

  const [sliderValue, setSliderValue] = useState(currentTime);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (!isSliding) setSliderValue(currentTime);
  }, [currentTime, isSliding]);

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 justify-between p-4 pb-0 w-full">
      <View className="flex-row justify-between">
        <IconButton
          iconName="leftarrow"
          color="white"
          onPress={onBack}
          withBackground
        />
        <View className="flex-row">
          <IconButton
            iconName="volume"
            onPress={onMute}
            withBackground
            className="mr-2"
          />
          <View className={cn(isExternalPlaybackAvailable ? "" : "opacity-30")}>
            <IconButton
              iconName="airplay"
              onPress={onToggleAirplay}
              withBackground
            />
          </View>
        </View>
      </View>

      <View className="absolute flex-row justify-center items-center top-1/2 self-center">
        <IconButton
          iconName="backward"
          onPress={onSeekBackward}
          withBackground
          disabled={loading}
        />
        <IconButton
          iconName={paused ? "play" : "pause"}
          onPress={onPlayPause}
          withBackground
          className="mx-4"
          disabled={loading}
        />
        <IconButton
          iconName="forward"
          onPress={onSeekForward}
          withBackground
          disabled={loading}
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0 pt-1">
        <View className="flex-row justify-between items-end px-2">
          <StyledText
            size="sm"
            weight="semibold"
            className="text-white -translate-y-[5]"
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </StyledText>
          <IconButton
            iconName="fullscreen"
            onPress={onToggleFullScreen}
            className="translate-y-[15]"
            disabled={loading}
          />
        </View>

        <Slider
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={duration}
          value={sliderValue}
          disabled={loading}
          onSlidingStart={() => {
            if (!loading) {
              setIsSliding(true);
            }
          }}
          onValueChange={(val) => {
            if (isSliding) setSliderValue(val);
          }}
          onSlidingComplete={(val) => {
            if (isSliding) {
              setIsSliding(false);
              onSeekComplete(val);
            }
          }}
          minimumTrackTintColor={tailwindColors.red}
          maximumTrackTintColor={tailwindColors.gray}
          thumbTintColor="#FFF"
          thumbImage={require("@/assets/images/thumb.png")}
        />
      </View>
    </View>
  );
};

export default VideoControls;
