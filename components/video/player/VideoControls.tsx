import { View, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { IconButton, StyledText } from "@/components/ui";
import { tailwindColors } from "@/utils/colors";
import formatTime from "@/utils/formatTime";

type Props = {
  paused: boolean;
  muted: boolean;
  onPlayPause: () => void;
  onMute: () => void;
  onSeekForward: () => void;
  onSeekBackward: () => void;
  onBack: () => void;
  currentTime: number;
  duration: number;
  onSlide: (value: number) => void;
};

const VideoControls = ({
  paused,
  muted,
  onPlayPause,
  onMute,
  onSeekForward,
  onSeekBackward,
  onBack,
  currentTime,
  duration,
  onSlide,
}: Props) => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 justify-between p-4 pb-0 w-full">
      <View className="flex-row justify-between">
        <IconButton iconName="leftarrow" onPress={onBack} withBackground />
        <IconButton
          iconName={muted ? "volume" : "volume"}
          onPress={onMute}
          withBackground
        />
      </View>

      <View className="absolute flex-row justify-center items-center top-1/2 self-center">
        <IconButton
          iconName="backward"
          onPress={onSeekBackward}
          withBackground
        />
        <IconButton
          iconName={paused ? "play" : "pause"}
          onPress={onPlayPause}
          withBackground
          className="mx-4"
        />
        <IconButton iconName="forward" onPress={onSeekForward} withBackground />
      </View>

      <View className="absolute bottom-0 left-0 right-0  pt-1 translate-y-[18]">
        <View className="flex-row justify-between items-end px-2 translate-y-[10]">
          <StyledText
            size="sm"
            weight="semibold"
            className="text-white -translate-y-[5]"
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </StyledText>
          <IconButton
            iconName="fullscreen"
            onPress={() => {}}
            className="translate-y-[15]"
          />
        </View>

        <Slider
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onValueChange={onSlide}
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
