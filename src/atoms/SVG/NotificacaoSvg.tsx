// NotificacaoSvg.tsx
import React from "react";
import Svg, { Path } from "react-native-svg";

interface NotificacaoSvgProps {
  width?: number;
  height?: number;
  color?: string;
}

const NotificacaoSvg: React.FC<NotificacaoSvgProps> = ({
  width = 18,
  height = 24,
  color = "#0054AF",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 24" fill="none">
      <Path
        d="M0.600098 19.7V17.6H2.0001V10.6C2.0001 8.90838 2.52024 7.42088 3.56051 6.13755C4.60079 4.85422 5.94732 4.05699 7.6001 3.74588V2.20005C7.6001 1.81116 7.73621 1.4806 8.00843 1.20838C8.28065 0.93616 8.61121 0.800049 9.0001 0.800049C9.38899 0.800049 9.71954 0.93616 9.99176 1.20838C10.264 1.4806 10.4001 1.81116 10.4001 2.20005V3.74588C12.0529 4.05699 13.3994 4.85422 14.4397 6.13755C15.48 7.42088 16.0001 8.90838 16.0001 10.6V17.6H17.4001V19.7H0.600098ZM8.99391 23.2C8.4147 23.2 7.92093 22.9944 7.5126 22.5832C7.10426 22.1719 6.9001 21.6775 6.9001 21.1H11.1001C11.1001 21.6834 10.8939 22.1792 10.4814 22.5875C10.0689 22.9959 9.57311 23.2 8.99391 23.2ZM4.1001 17.6H13.9001V10.6C13.9001 9.23894 13.4237 8.08199 12.4709 7.12922C11.5182 6.17644 10.3612 5.70005 9.0001 5.70005C7.63899 5.70005 6.48204 6.17644 5.52926 7.12922C4.57649 8.08199 4.1001 9.23894 4.1001 10.6V17.6Z"
        fill={color}
      />
    </Svg>
  );
};

export default NotificacaoSvg;
