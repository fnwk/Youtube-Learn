import React from "react";
import { SvgProps } from "react-native-svg";
import search from "./icons/search.svg";
import likes from "./icons/likes.svg";
import leftarrow from "./icons/leftarrow.svg";
import airplay from "./icons/airplay.svg";
import fullscreen from "./icons/fullscreen.svg";
import person from "./icons/person.svg";
import home from "./icons/home.svg";
import views from "./icons/views.svg";
import settings from "./icons/settings.svg";
import app from "./icons/app.svg";
import volume from "./icons/volume.svg";
import play from "./icons/play.svg";
import backward from "./icons/backward.svg";
import notification from "./icons/notification.svg";
import clock from "./icons/clock.svg";
import logo from "./icons/logo.svg";
import pause from "./icons/pause.svg";
import forward from "./icons/forward.svg";

const ICONS = {
  search,
  likes,
  leftarrow,
  airplay,
  fullscreen,
  person,
  home,
  views,
  settings,
  app,
  volume,
  play,
  backward,
  notification,
  clock,
  logo,
  pause,
  forward,
};

export type IconType = keyof typeof ICONS;

interface IconProps extends SvgProps {
  name: IconType;
  className?: string;
}

const AppIcon = ({ name, ...props }: IconProps) => {
  const CurrentIcon = ICONS[name];
  return <CurrentIcon {...props} />;
};

export const Icon = React.memo(AppIcon);
