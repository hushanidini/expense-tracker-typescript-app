
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LottieAnimationProps = {
  url: string;
  loop?: boolean;
  autoplay?: boolean;
  height?: number | string;
};

function LottieAnimation({
  url,
  loop = false,
  autoplay = true,
  height = 120,
}: LottieAnimationProps) {
  return (
    <DotLottieReact height={height} src={url} loop={loop} autoplay={autoplay} />
  );
}

export default LottieAnimation;
