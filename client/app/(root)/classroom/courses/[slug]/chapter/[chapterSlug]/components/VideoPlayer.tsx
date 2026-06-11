"use client";

import { LionPlayer } from "lion-player";

const VideoPlayer = ({ video }: { video: string }) => {
  return (
    <div className="z-20">
      <LionPlayer
        sources={[
          {
            src: video,
            type: "video/mp4",
          },
        ]}
        autoplay={false}
      />
    </div>
  );
};

export default VideoPlayer;
